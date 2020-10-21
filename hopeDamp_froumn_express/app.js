// 引入express包
const express = require('express')
// 创建服务器
const app = express()
// 引入文件模块
const fs = require('fs')
let http = require('http').createServer(app)
let io = require('socket.io')(http)
// 从配置文件引入express服务器和socket服务器的端口
const { express_port, socket_port } = require('./config')
// 引入用户验证的函数
const { tokenVerify } = require('./tokenVerify')
// 引入数据库连接
const db = require('./db')
// 托管静态资源（上传图片目录）
app.use('/uploads', express.static(__dirname + '/uploads'))
// 引入body-parser包，解决body参数传输和读取问题
const bodyParser = require('body-parser')
// 允许读取body参数
app.use(bodyParser.urlencoded({ extended: false }))
// 解决格式问题
app.use(bodyParser.json())
// 允许跨域
app.use(require('cors')())
// 循环routes文件，挂载所有路由文件
fs.readdir('./routes/', (err, res) => {
    if (err) console.log(err)
    for (let value of res) {
        if (value.endsWith('.js')) {
            app.use('/api/v1', require('./routes/' + value))
        }
    }
})
// 承载登录用户socket对象的数组
let userArr = []
// 监听socket连接
io.on('connection', (socket) => {
    // 用户连接时存储用户信息
    userArr[socket.handshake.query.user_id] = socket
    socket.on('disconnect', (data) => {
        // 用户离线时将用户信息剔除
        userArr[socket.handshake.query.user_id] = null
    })
})

// 添加聊天信息
app.post('/api/v1/roomMsg', (req, res) => {
    // 验证令牌
    if (!tokenVerify(req.headers.token)) {
        return res.json({
            ok: 0,
            msg: '令牌无效或过期，请重新登录！'
        })
    } else {
        // 获取发消息用户id
        var send_user_id = tokenVerify(req.headers.token)
    }
    let [room_id, value, create_time, collect_user_id] = [req.body.room_id, req.body.value, req.body.create_time, req.body.collect_user_id]
    // 如果用户未连接到socket服务器,则代表其未上线,则不能对其发消息
    if (!userArr[collect_user_id]) {
        return res.json({
            ok: 0,
            msg: '该用户不在线,不能发送信息!'
        })
    }
    // 执行sql语句,插入聊天数据,同时提醒接受消息用户,有新消息
    db.query(
        `INSERT INTO private_chat(room_id, value, create_time, send_user_id, collect_user_id) VALUES('${room_id}','${value}','${create_time}','${send_user_id}','${collect_user_id}');select last_insert_id()`,
        (err, result) => {
            if (err) console.log(err)
            let chat_id = null
            // 获取刚刚创建的聊天房间的房间id
            for (let key in result[1][0]) {
                chat_id = result[1][0][key]
            }
            res.json({
                ok: 1
            })
            // 查询发送者的信息,并返回给接受消息的人
            db.query(`SELECT id,username,avatar FROM user WHERE id = ${send_user_id}`, (err, result) => {
                if (err) console.log(err)
                // 发送消息用于进入我的消息页时自动打开与发消息的人对话
                userArr[collect_user_id].emit('message', {
                    id: result[0].id,
                    username: result[0].username,
                    avatar: result[0].avatar,
                    room_id
                })
                // 发送最新的消息
                userArr[collect_user_id].emit('value', {
                    id: chat_id,
                    value,
                    create_time,
                    username: result[0].username,
                    avatar: result[0].avatar,
                    user_id: send_user_id
                })
            })
        }
    )
})

// 开启socket服务器
http.listen(socket_port, function () {
    console.log('socket server is running...')
})
// 开启express服务器
app.listen(express_port, () => {
    console.log('express server is running...')
})
