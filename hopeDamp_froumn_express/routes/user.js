/*
 * @Author: LF
 * @Description: 用户相关路由
 * @Date: 2020-10-21 08:38:38
 * @LastEditTime: 2020-10-24 09:51:01
 */
// 创建路由
const userRouter = require('express').Router()
// 引入数据库连接
const db = require('../db')
// 引入jwt包
const jwt = require('jsonwebtoken')
// 引入request包用于从代理服务器发送请求到百度（跨域问题只存在于浏览器）
const request = require('request')
// 引入用户验证函数
const { tokenVerify } = require('../tokenVerify')
// 引入jwt令牌所用的密码
const { md5 } = require('../config')
// 用户登录
userRouter.post('/login', (req, res) => {
    let sql = 'SELECT * FROM user WHERE username = ? AND password = ?'
    let data = [req.body.username, req.body.password]
    db.query(sql, data, (err, result) => {
        if (err) console.log(err)
        if (result.length !== 0) {
            // 生成令牌
            let token = jwt.sign({ id: result[0].id, username: result[0].username }, md5, { expiresIn: '6h' })
            // 登录成功后查询是否有未查看的聊天消息
            let sql = 'SELECT * FROM private_chat WHERE collect_user_id = ? AND is_seen = 0'
            let data = [result[0].id]
            db.query(sql, data, (err, result) => {
                if (err) console.log(err)
                // 如果发现离线期间有人发送消息过来，则提醒用户
                if (result.length !== 0) {
                    res.json({
                        ok: 1,
                        msg: '登录成功！',
                        token: token,
                        msgNum: result.length
                    })
                } else {
                    // 如果离线期间没有消息发过来
                    res.json({
                        ok: 1,
                        msg: '登录成功！',
                        token: token,
                        msgNum: 0
                    })
                }
            })
        } else {
            res.json({
                ok: 0,
                msg: '用户名或密码错误！'
            })
        }
    })
})
// 用户注册
userRouter.post('/register', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    // 用户名和密码不允许为空
    if (username.trim() == '' || password.trim() == '') {
        res.json({
            ok: 0,
            msg: '用户名或密码不能为空！'
        })
    }
    // 不允许重复用户名
    db.query('SELECT * FROM user WHERE username = ?', username, (err, result) => {
        if (err) console.log(err)
        if (result.length === 0) {
            // 用户名不存在的情况下允许注册
            let sql = 'INSERT INTO user(username, password) VALUES(?, ?)'
            let data = [[username, password]]
            db.query(sql, data, (err, result) => {
                if (err) console.log(err)
                if (result.affectedRows === 1) {
                    res.json({
                        ok: 1,
                        msg: '注册成功！'
                    })
                }
            })
        } else {
            res.json({
                ok: 0,
                msg: '用户名已存在！'
            })
        }
    })
})
// 获取用户信息
userRouter.get('/userData', (req, res) => {
    // 验证令牌
    if (!tokenVerify(req.headers.token)) {
        return res.json({
            ok: 0,
            msg: '令牌无效或过期，请重新登录！'
        })
    } else {
        var id = tokenVerify(req.headers.token)
    }
    db.query(`SELECT * FROM user WHERE id = ${id}`, (err, result) => {
        if (err) console.log(err)
        res.json({
            ok: 1,
            data: result[0]
        })
    })
})
// 修改用户信息（头像或密码）
userRouter.put('/userData', (req, res) => {
    // 验证令牌
    if (!tokenVerify(req.headers.token)) {
        return res.json({
            ok: 0,
            msg: '令牌无效或过期，请重新登录！'
        })
    } else {
        var id = tokenVerify(req.headers.token)
    }
    let avatar = req.body.avatar || ''
    let password = req.body.password || ''
    let oldPassword = req.body.oldPassword
    // 修改头像
    if (avatar) {
        db.query(`UPDATE user SET avatar = '${avatar}' WHERE id = ${id}`, (err, result) => {
            if (err) console.log(err)
            if (result.affectedRows === 1) {
                res.json({
                    ok: 1,
                    msg: '修改成功!'
                })
            }
        })
    } else if (password) {
        // 修改密码
        db.query(`SELECT * FROM user WHERE id = ${id} AND password = '${oldPassword}'`, (err, result) => {
            if (err) console.log(err)
            if (result.length === 0) {
                res.json({
                    ok: 0,
                    msg: '原密码错误！'
                })
            } else {
                db.query(`UPDATE user SET password = '${password}' WHERE id = ${id}`, (err, result) => {
                    if (err) console.log(err)
                    if (result.affectedRows === 1) {
                        res.json({
                            ok: 1,
                            msg: '修改密码成功!'
                        })
                    }
                })
            }
        })
    }
})
// 根据用户ip获取用户地理位置信息（登录时记录用户地理位置信息）
userRouter.post('/user_ip', (req, res) => {
    let ip = req.body.ip
    let username = req.body.username
    let login_time = req.body.login_time
    // 向百度地图api发起请求，根据ip获取定位
    request(`http://api.map.baidu.com/location/ip?ak=AaEFRWRRd5khBcbn9uBFcEe1CQvoUP8w&ip=${ip}&coor=bd09ll`, (err, response) => {
        if (err) console.log(err)
        let obj = JSON.parse(response.body)
        // 获取定位的省和市
        let [province, city] = [obj.content.address_detail.province, obj.content.address_detail.city]
        // 插入语句
        let sql = 'INSERT INTO record(ip,province,city,username,login_time) VALUES(?,?,?,?,?)'
        // 插入数据
        let data = [ip, province, city, username, login_time]
        // 将ip,省,市,登录用户和时间写入到访客记录中
        db.query(sql, data, (err, result) => {
            if (err) console.log(err)
            if (result.affectedRows === 1) {
                res.json({
                    ok: 1
                })
            }
        })
    })
})
module.exports = userRouter
