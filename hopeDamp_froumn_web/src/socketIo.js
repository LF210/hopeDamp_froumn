/*
 * @Author: LF
 * @Description: 介绍
 * @Date: 2020-10-21 08:38:38
 * @LastEditTime: 2020-10-23 10:00:02
 */
// 引入socket连接的地址
import { socketIoURL } from './config'
// 引入socket.io客户端包
import io from 'socket.io-client'
// 引入jwt，用于解析令牌
import jwt from 'jsonwebtoken'
// 引入令牌的密钥
import { md5 } from './config'
import { message } from 'antd'
if (sessionStorage.getItem('token')) {
    // 验证令牌
    let id = null
    try {
        id = jwt.verify(sessionStorage.getItem('token'), md5).id
    } catch (error) {
        message.error('令牌无效或已过期，请重新登陆！')
    }
    // 令牌验证通过后，连接socket服务器
    var socket = io(socketIoURL, {
        query: { user_id: id }
    })
}
export default socket
