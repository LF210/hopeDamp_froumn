/*
 * @Author: LF
 * @Description: 评论相关路由
 * @Date: 2020-10-21 08:38:38
 * @LastEditTime: 2020-10-21 16:26:24
 */
const commentRouter = require('express').Router()
const db = require('../db')
const { tokenVerify } = require('../tokenVerify')
// 添加评论
commentRouter.post('/comment', (req, res) => {
    // 验证令牌
    if (!tokenVerify(req.headers.token)) {
        return res.json({
            ok: 0,
            msg: '令牌无效或过期，请重新登录！'
        })
    } else {
        var user_id = tokenVerify(req.headers.token)
    }
    // 获取相关数据
    let [topic_id, value, create_time] = [req.body.topic_id, req.body.value, req.body.create_time]
    // 插入语句
    let sql = 'INSERT INTO comment(topic_id, user_id, value, create_time) VALUES(?,?,?,?);UPDATE topic SET comment_num = comment_num + 1 WHERE id = ?'
    // 插入数据
    let data = [topic_id, user_id, value, create_time, topic_id]
    db.query(sql, data, (err, result) => {
        if (err) console.log(err)
        if (result[0].affectedRows == 1 && result[1].affectedRows == 1) {
            res.json({
                ok: 1
            })
        }
    })
})
// 查询自己发表的评论
commentRouter.get('/commentMsg', (req, res) => {
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
    let sql =
        'SELECT t.title, t.id, c.create_time, c.value FROM comment c,topic t WHERE c.topic_id = t.id AND c.user_id = ? LIMIT ?,?;SELECT COUNT(*) AS zs FROM comment WHERE user_id = ?'
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
// 删除评论
commentRouter.delete('/comment', (req, res) => {
    // 验证令牌
    if (!tokenVerify(req.headers.token)) {
        return res.json({
            ok: 0,
            msg: '令牌无效或过期，请重新登录！'
        })
    } else {
        var user_id = tokenVerify(req.headers.token)
    }
    let id = req.query.id
    if (!id) {
        return res.json({
            ok: 0,
            msg: '参数错误！'
        })
    }
    // 首先查询删除评论者ID是否等于发布评论者ID（只能删除自己的评论）
    db.query(`SELECT * FROM comment WHERE id = ${id} AND user_id = ${user_id}`, (err, result) => {
        if (err) console.log(err)
        if (result.length !== 0) {
            // 查询评论ID所属的话题ID
            db.query(`SELECT topic_id FROM comment WHERE id = ${id}`, (err, result) => {
                if (err) console.log(err)
                // 获取查询到的话题ID
                let topic_id = result[0].topic_id
                // 删除评论，并且将对应的话题评论数减一
                db.query(`DELETE FROM comment WHERE id = ${id};UPDATE topic SET comment_num = comment_num - 1 WHERE id = ${topic_id}`, (err, result) => {
                    if (err) console.log(err)
                    if (result[0].affectedRows === 1) {
                        res.json({
                            ok: 1
                        })
                    }
                })
            })
        } else {
            res.json({
                ok: 0,
                msg: '只能删除自己的评论！'
            })
        }
    })
})
module.exports = commentRouter
