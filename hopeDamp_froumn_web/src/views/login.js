/*
 * @Author: LF
 * @Description: 登录页
 * @Date: 2020-10-21 08:38:38
 * @LastEditTime: 2020-10-24 09:52:04
 */
import React, { Component } from 'react'
// 引入消息提示框
import { message } from 'antd'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { timeFormat } from './publicFunc'

export default class login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }
    // 登录
    login = async () => {
        // 表单校验
        if (this.state.username.trim() === '' || this.state.password.trim() === '') {
            return message.error('用户名或密码不能为空！')
        }
        // 发送登录请求
        let { data: res } = await axios.post('/login', {
            username: this.state.username,
            password: this.state.password
        })
        // 如果登录失败，则提示错误信息
        if (res.ok !== 1) {
            return message.error(res.msg || '发生了一些错误')
        }
        // 如果发现有新消息
        else if (res.ok === 1 && res.msgNum !== 0) {
            message.info(`您有${res.msgNum}条新消息，请到我的消息页查看！`)
        }
        // 提示用户登录成功
        message.success(res.msg)
        // 将令牌存到浏览器
        sessionStorage.setItem('token', res.token)
        // 获取用户ip
        let user_ip = window.returnCitySN.cip
        // 发送用户ip到服务器（记录用户登录信息）
        axios.post('/user_ip', {
            ip: user_ip,
            username: jwt.decode(res.token).username,
            login_time: timeFormat(new Date())
        })
        // 一秒后跳转到首页
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
    }
    render() {
        return (
            <div>
                <div className="center-nav">
                    <div className="center-nav-left">
                        <div className="user-handle-box">
                            <h1>登录</h1>
                            <hr />
                            <input
                                value={this.state.username}
                                onChange={(e) => {
                                    this.setState({
                                        username: e.target.value
                                    })
                                }}
                                placeholder="账号"
                            />
                            <br />
                            <input
                                value={this.state.password}
                                onChange={(e) => {
                                    this.setState({
                                        password: e.target.value
                                    })
                                }}
                                onKeyUp={(e) => {
                                    e.preventDefault()
                                    if (e.keyCode === 13) {
                                        this.login()
                                    }
                                }}
                                type="password"
                                placeholder="密码"
                            />
                            <br />
                            <button className="btn" onClick={this.login}>
                                登录
                            </button>
                        </div>
                    </div>
                    <div className="center-nav-right"></div>
                </div>
            </div>
        )
    }
}
