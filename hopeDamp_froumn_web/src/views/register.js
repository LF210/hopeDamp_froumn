/*
 * @Author: LF
 * @Description: 注册页
 * @Date: 2020-10-21 08:38:38
 * @LastEditTime: 2020-10-23 09:34:30
 */
import React, { Component } from 'react'
// 引入信息提示框
import { message } from 'antd'
import axios from 'axios'

export default class register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            comfirmPassword: ''
        }
    }
    // 表单校验
    verifyFormData = () => {
        if (this.state.username.trim() === '' || this.state.password.trim() === '' || this.state.comfirmPassword.trim() === '') {
            return '用户名、密码和确认密码栏不能为空！'
        } else if (this.state.password !== this.state.comfirmPassword) {
            return '两次输入的密码不一致！'
        } else if (/[ ]+/.test(this.state.username) || this.state.username.trim().length !== this.state.username.length) {
            return '用户名中不能有空格！'
        } else if (/[ ]+/.test(this.state.password) || this.state.password.trim().length !== this.state.password.length) {
            return '密码中不能有空格！'
        } else if (this.state.username.length >= 16) {
            return '用户名长度不能超过15位'
        } else if (this.state.password.length >= 21) {
            return '密码长度不能超过20位'
        } else if (/(?=[\x21-\x7e]+)[^A-Za-z0-9]/.test(this.state.username)) {
            return '用户名不能带有特殊符号!'
        }
        return true
    }
    // 注册
    register = async () => {
        // 获取表单校验的结果
        let verify_res = this.verifyFormData()
        // 如果表单校验不通过，则提示错误信息并返回
        if (verify_res !== true) {
            return message.error(verify_res)
        }
        // 校验通过则发送注册请求
        let { data: res } = await axios.post('/register', {
            username: this.state.username,
            password: this.state.password
        })
        if (res.ok !== 1) {
            // 否则提示用户注册失败
            return message.error('注册失败！')
        }
        // 提示用户注册成功
        message.success(res.msg)
        // 1秒后跳转到登录页
        setTimeout(() => {
            window.location.href = '/login'
        }, 1000)
    }

    render() {
        return (
            <div>
                <div className="center-nav">
                    <div className="center-nav-left">
                        <div className="user-handle-box">
                            <h1>注册</h1>
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
                                type="password"
                                value={this.state.password}
                                onChange={(e) => {
                                    this.setState({
                                        password: e.target.value
                                    })
                                }}
                                placeholder="密码"
                            />
                            <br />
                            <input
                                value={this.state.comfirmPassword}
                                onChange={(e) => {
                                    this.setState({
                                        comfirmPassword: e.target.value
                                    })
                                }}
                                onKeyUp={(e) => {
                                    e.preventDefault()
                                    if (e.keyCode === 13) {
                                        this.register()
                                    }
                                }}
                                type="password"
                                placeholder="确认密码"
                            />
                            <br />
                            <button className="btn" onClick={this.register}>
                                注册
                            </button>
                        </div>
                    </div>
                    <div className="center-nav-right"></div>
                </div>
            </div>
        )
    }
}
