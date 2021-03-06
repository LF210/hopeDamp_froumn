/*
 * @Author: LF
 * @Description: 话题相关路由
 * @Date: 2020-10-21 08:38:38
 * @LastEditTime: 2020-10-21 16:12:05
 */
const topicRouter = require('express').Router()
const db = require('../db')
const { tokenVerify } = require('../tokenVerify')
// 查询所有分类
topicRouter.get('/classify', (req, res) => {
    db.query(`SELECT * FROM classify`, (err, result) => {
        if (err) console.log(err)
        if (result.length > 0) {
            res.json({
                ok: 1,
                result
            })
        }
    })
})
// 查询分类下的话题
topicRouter.get('/topic', (req, res) => {
    let pageNum = parseInt(req.query.pageNum) || 1
    let pageSize = parseInt(req.query.pageSize) || 10
    let classify_id = req.query.classify_id || ''
    // 开始查询的位置
    let pageStart = (pageNum - 1) * pageSize
    // 查询某一分类
    if (classify_id !== '') {
        // 如果分类不是数字，或者分类超出范围则返回404
        if (parseInt(classify_id) != classify_id || classify_id < 0) {
            return res.json({
                ok: 0
            })
        }
        // 查询语句
        let sql =
            'SELECT t.id,t.title,u.username,f.name,t.create_time,t.comment_num FROM topic t,user u,classify f WHERE t.classify_id = f.id AND t.author_id = u.id AND classify_id = ? ORDER BY t.create_time DESC LIMIT ?,?;SELECT COUNT(*) AS zs FROM topic WHERE classify_id = ?'
        // 查询数据
        let data = [classify_id, pageStart, pageSize, classify_id]
        // 查询某一分类下的话题
        db.query(sql, data, (err, result) => {
            if (err) console.log(err)
            if (result[1][0].zs !== 0) {
                res.json({
                    ok: 1,
                    data: result[0],
                    total: result[1][0].zs
                })
            }
        })
    } else {
        // 查询语句
        let sql =
            'SELECT t.id,t.title,u.username,f.name,t.create_time,t.comment_num FROM topic t,user u,classify f WHERE t.classify_id = f.id AND t.author_id = u.id ORDER BY t.create_time DESC LIMIT ?,?;SELECT COUNT(*) AS zs FROM topic'
        // 查询数据
        let data = [pageStart, pageSize]
        // 查询所有分类下的话题
        db.query(sql, data, (err, result) => {
            if (err) console.log(err)
            if (result[1][0].zs !== 0) {
                res.json({
                    ok: 1,
                    data: result[0],
                    total: result[1][0].zs
                })
            }
        })
    }
})
// 根据话题id查询单个话题（话题页数据）
topicRouter.get('/topicMsg', (req, res) => {
    let id = req.query.id
    // 如果参数不合法则返回错误
    if (!id) {
        return res.json({
            ok: 0,
            msg: '话题不存在或者查询参数错误！'
        })
    }
    // 查询语句
    let sql =
        'SELECT t.id,t.title,u.id AS author_id,u.username,f.name,t.create_time,t.comment_num,t.value FROM topic t,user u,classify f WHERE t.classify_id = f.id AND t.author_id = u.id AND t.id = ?;SELECT u.username, u.avatar ,c.create_time, c.id, c.user_id, c.value FROM comment c, user u, topic t WHERE c.topic_id = ? AND c.topic_id = t.id AND u.id = c.user_id'
    // 查询数据
    let data = [id, id]
    db.query(sql, data, (err, result) => {
        if (err) console.log(err)
        // 查询到数据则返回
        if (result[0].length !== 0) {
            res.json({
                ok: 1,
                data: result[0][0],
                comment: result[1]
            })
        } else {
            // 没有查询到数据则返回错误
            res.json({
                ok: 0,
                msg: '话题不存在或者查询参数错误！'
            })
        }
    })
})
// 增加话题
topicRouter.post('/topic', (req, res) => {
    // 验证令牌
    if (!tokenVerify(req.headers.token)) {
        return res.json({
            ok: 0,
            msg: '令牌无效或过期，请重新登录！'
        })
    } else {
        var author_id = tokenVerify(req.headers.token)
    }
    // 获取增加表单中所有相关数据
    let [title, classify_id, create_time, value] = [req.body.title, req.body.classify_id, req.body.create_time, req.body.value]
    // 插入语句
    let sql = 'INSERT INTO topic(title,classify_id,author_id,create_time,value) VALUES(?,?,?,?,?)'
    // 插入数据
    let data = [title, classify_id, author_id, create_time, value]
    db.query(sql, data, (err, result) => {
        if (err) console.log(err)
        if (result.affectedRows === 1) {
            res.json({
                ok: 1,
                msg: '添加成功！'
            })
        }
    })
})
// 查询用户发布的话题
topicRouter.get('/topicUserMsg', (req, res) => {
    // 验证令牌
    if (!tokenVerify(req.headers.token)) {
        return res.json({
            ok: 0,
            msg: '令牌无效或过期，请重新登录！'
        })
    } else {
        var id = tokenVerify(req.headers.token)
    }
    let pageNum = parseInt(req.query.pageNum) || 1
    let pageSize = parseInt(req.query.pageSize) || 10
    // 开始查询的位置
    let pageStart = (pageNum - 1) * pageSize
    let sql = `SELECT t.id,t.title,u.username,f.name,t.create_time,t.comment_num FROM topic t,user u,classify f WHERE t.classify_id = f.id AND t.author_id = u.id AND t.author_id = ? ORDER BY t.create_time DESC LIMIT ?,?;SELECT COUNT(*) AS zs FROM topic WHERE author_id = ?`
    let data = [id, pageStart, pageSize, id]
    db.query(sql, data, (err, result) => {
        if (err) console.log(err)
        res.json({
            ok: 1,
            data: result[0],
            total: result[1][0].zs
        })
    })
})
// 删除话题
topicRouter.delete('/topic', (req, res) => {
    // 验证令牌
    if (!tokenVerify(req.headers.token)) {
        return res.json({
            ok: 0,
            msg: '令牌无效或过期，请重新登录！'
        })
    } else {
        var author_id = tokenVerify(req.headers.token)
    }
    let id = req.query.id
    // 如果参数错误则返回错误信息
    if (!id) {
        return res.json({
            ok: 0,
            msg: '参数错误！'
        })
    }
    // 首先查询删除者ID是否与作者ID一致，不一致则不能删除
    db.query(`SELECT * FROM topic WHERE id = ${id} AND author_id = ${author_id}`, (err, result) => {
        if (err) console.log(err)
        if (result.length !== 0) {
            // 执行删除话题的sql语句
            db.query(`DELETE FROM topic WHERE id = ${id}`, (err, result) => {
                if (err) console.log(err)
                if (result.affectedRows == 1) {
                    res.json({
                        ok: 1
                    })
                } else {
                    res.json({
                        ok: 0
                    })
                }
            })
        } else {
            res.json({
                ok: 0,
                msg: '只能删除自己的话题！'
            })
        }
    })
})
// 根据话题id查询话题（修改话题回显）
topicRouter.get('/topicNormalMsg', (req, res) => {
    // 验证令牌
    if (!tokenVerify(req.headers.token)) {
        return res.json({
            ok: 0,
            msg: '令牌无效或过期，请重新登录！'
        })
    } else {
        var author_id = tokenVerify(req.headers.token)
    }
    let id = req.query.id
    if (!id) {
        return res.json({
            ok: 0,
            msg: '参数错误！'
        })
    }
    // 首先查询修改者ID是否与作者ID一致，不一致则不能修改
    db.query(`SELECT * FROM topic WHERE id = ${id} AND author_id = ${author_id}`, (err, result) => {
        if (err) console.log(err)
        if (result.length !== 0) {
            // 执行回显的sql语句
            db.query(`SELECT * FROM topic WHERE id = ${id}`, (err, result) => {
                if (err) console.log(err)
                if (result.length !== 0) {
                    res.json({
                        ok: 1,
                        data: result[0]
                    })
                } else {
                    res.json({
                        ok: 0,
                        msg: '话题不存在！'
                    })
                }
            })
        } else {
            res.json({
                ok: 0,
                msg: '只能修改自己的话题！'
            })
        }
    })
})
// 修改话题
topicRouter.put('/topic', (req, res) => {
    // 验证令牌
    if (!tokenVerify(req.headers.token)) {
        return res.json({
            ok: 0,
            msg: '令牌无效或过期，请重新登录！'
        })
    } else {
        var author_id = tokenVerify(req.headers.token)
    }
    let [id, title, classify_id, value] = [req.body.id, req.body.title, req.body.classify_id, req.body.value]
    // 首先查询修改者ID是否与作者ID一致，不一致则不能修改
    db.query(`SELECT * FROM topic WHERE id = ${id} AND author_id = ${author_id}`, (err, result) => {
        if (err) console.log(err)
        if (result.length !== 0) {
            db.query(`UPDATE topic SET title = '${title}', classify_id = ${classify_id}, value = '${value}' WHERE id = ${id}`, (err, result) => {
                if (err) console.log(err)
                if (result.affectedRows === 1) {
                    res.json({
                        ok: 1
                    })
                }
            })
        } else {
            res.json({
                ok: 0,
                msg: '只能修改自己的话题！'
            })
        }
    })
})
module.exports = topicRouter
