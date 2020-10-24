const chatRouter = require('express').Router()
const db = require('../db')
const { tokenVerify } = require('../tokenVerify')
// 新建私聊房间
chatRouter.post('/room', (req, res) => {
    // 先查询数据库中是否已经有这两人私聊的房间，如果有则不作处理，没有则新建房间
    // 验证令牌
    if (!tokenVerify(req.headers.token)) {
        return res.json({
            ok: 0,
            msg: '令牌无效或过期，请重新登录！'
        })
    } else {
        // 获取发信息用户id
        var send_user_id = tokenVerify(req.headers.token)
    }
    // 获取收信息
    let collect_user_id = req.body.collect_user_id
    // 查询数据库中是否有记录
    db.query(
        `SELECT * FROM private_room WHERE (user_id_A = ${send_user_id} AND user_id_B = ${collect_user_id}) OR (user_id_A = ${collect_user_id} AND user_id_B = ${send_user_id})`,
        (err, result) => {
            if (err) console.log(err)
            // 如果聊过天，则直接返回
            if (result.length !== 0) {
                let room_id = result[0].id
                db.query(`SELECT id,username,avatar FROM user WHERE id = ${collect_user_id}`, (err, result) => {
                    if (err) console.log(err)
                    res.json({
                        ok: 1,
                        data: {
                            id: result[0].id,
                            username: result[0].username,
                            avatar: result[0].avatar,
                            room_id
                        }
                    })
                })
            } else {
                // 如果没聊过天，则新建一个聊天房间后再返回
                db.query(`INSERT INTO private_room(user_id_A,user_id_B) VALUES('${send_user_id}','${collect_user_id}');select last_insert_id()`, (err, result) => {
                    if (err) console.log(err)
                    let room_id = null
                    // 获取刚刚创建的聊天房间的房间id
                    for (let key in result[1][0]) {
                        room_id = result[1][0][key]
                    }
                    db.query(`SELECT id,username,avatar FROM user WHERE id = ${collect_user_id}`, (err, result) => {
                        if (err) console.log(err)
                        res.json({
                            ok: 1,
                            data: {
                                id: result[0].id,
                                username: result[0].username,
                                avatar: result[0].avatar,
                                room_id
                            }
                        })
                    })
                })
            }
        }
    )
})
// 根据用户ID查询聊过天的用户列表（请求所有聊天房间列表）
// * 获取用户在每个聊天房间的未读消息数量
chatRouter.get('/room', (req, res) => {
    // 验证令牌
    if (!tokenVerify(req.headers.token)) {
        return res.json({
            ok: 0,
            msg: '令牌无效或过期，请重新登录！'
        })
    } else {
        // 获取用户id
        var id = tokenVerify(req.headers.token)
    }
    let sql = 'SELECT id AS room_id,user_id_A,user_id_B FROM private_room WHERE user_id_A = ? OR user_id_B = ?'
    let data = [id, id]
    // 找出包含该用户的私聊房间
    db.query(sql, data, (err, result) => {
        if (err) console.log(err)
        if (result.length !== 0) {
            // 循环结果，让结果中只含聊天对象的id
            result.forEach((v) => {
                if (v.user_id_A == id) {
                    delete v.user_id_A
                    v.user_id = v.user_id_B
                    delete v.user_id_B
                } else {
                    delete v.user_id_B
                    v.user_id = v.user_id_A
                    delete v.user_id_A
                }
            })
            let userIdArr = []
            result.forEach((v) => {
                userIdArr.push(parseInt(v.user_id))
            })
            let data = {
                ok:1,
                data:[]
            }
            for (let value of userIdArr) {
                db.query(`SELECT id,username,avatar FROM user WHERE id = ${value};SELECT COUNT(*) AS zs FROM private_chat WHERE send_user_id = ${value} AND collect_user_id = ${id} AND is_seen = 0`,(err,result)=>{
                    if(err) console.log(err)
                    console.log(result[0][0])
                    
                })
            }
            // SELECT COUNT(*) FROM private_chat WHERE send_user_id in (${userIdArr}) AND collect_user_id = ${id} AND is_seen = 0
            // 批量获取所有与自己聊过天的用户信息
            // db.query(`SELECT id,username,avatar FROM user WHERE id in (${userIdArr});`, (err, data) => {
            //     if (err) console.log(err)
            //     // 将房间ID加到对应的用户数据上
            //     data.forEach((v) => {
            //         for (var key in result) {
            //             if (result[key].user_id === v.id) {
            //                 v.room_id = result[key].room_id
            //             }
            //         }
            //     })
            //     // 返回结果
            //     res.json({
            //         ok: 1,
            //         data
            //     })
            // })
        } else {
            // 没有任何聊天记录的情况
            res.json({
                ok: 1,
                data: []
            })
        }
    })
})
// 根据房间ID查询聊天历史
// 如果查看的人是消息接收方，则将查询到的聊天记录设置为已查看
chatRouter.get('/roomMsg', (req, res) => {
    // 获取要查看的私聊id
    let room_id = req.query.room_id
    // 获取查看聊天记录的人的id
    let user_id = tokenVerify(req.headers.token)
    let sql =
        'SELECT p.id,p.value,p.create_time,p.collect_user_id,u.username,u.avatar,u.id AS user_id FROM private_chat p,user u WHERE u.id = p.send_user_id AND p.room_id = ? ORDER BY p.create_time'
    db.query(sql, room_id, (err, result) => {
        if (err) console.log(err)
        res.json({
            ok: 1,
            data: result
        })
        // 数组用于存储 查看消息记录人id = 消息接收人id 这种情况的消息（消息接收人请求了消息，即说明相关未读消息都已读）
        let arr = []
        result.forEach((item) => {
            if (item.collect_user_id === user_id) {
                arr.push(item.id)
            }
        })
        if (arr.length !== 0) {
            // 发送请求，将所有消息设置为已读
            db.query(`UPDATE private_chat SET is_seen = 1 WHERE id in (${arr})`, (err) => {
                if (err) console.log(err)
            })
        }
    })
})

module.exports = chatRouter
