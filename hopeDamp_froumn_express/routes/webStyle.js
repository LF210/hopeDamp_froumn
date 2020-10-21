/*
 * @Author: LF
 * @Description: 网页样式路由
 * @Date: 2020-10-21 08:38:38
 * @LastEditTime: 2020-10-21 16:51:55
 */
const webStyleRouter = require('express').Router()
const db = require('../db')
// 查询网页样式（网页title，网页主色调）
webStyleRouter.get('/web_style', (req, res) => {
    db.query('SELECT * FROM web_style', (err, result) => {
        if (err) console.log(err)
        res.json({
            ok: 1,
            data: result[0]
        })
    })
})
module.exports = webStyleRouter
