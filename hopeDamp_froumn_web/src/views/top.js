/*
 * @Author: LF
 * @Description: 版头
 * @Date: 2020-10-21 08:38:38
 * @LastEditTime: 2020-10-24 10:28:42
 */
import React, { Component } from 'react'
import jwt from 'jsonwebtoken'
// 引入菜单，下拉框和ICON组件
import { Menu, Dropdown, Icon, message } from 'antd'
import axios from 'axios'

export default class top extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userData: {},
            web_title: '望潮论坛',
            classify: [],
            flag: false
        }
    }

    async componentDidMount() {
        // 页面挂载后判断：如果浏览器中存在token，则表明用户已登录，需要向服务器请求用户数据
        if (sessionStorage.getItem('token')) {
            let { data: res } = await axios.get('/userData')
            if (res.ok === 1) {
                this.setState({
                    userData: res.data
                })
            } else {
                message.error(res.msg)
            }
        }
        // 请求网页标题数据
        this.getWebTitle()
        // 请求所有频道
        this.getAllClassify()
    }
    // 请求所有频道
    getAllClassify = async () => {
        let { data: res } = await axios.get('/classify')
        if (res.ok === 1) {
            let arr = [
                {
                    id: '',
                    name: '推荐'
                }
            ]
            arr = arr.concat(res.result)
            this.setState({
                classify: arr
            })
        }
    }
    // 请求网页标题数据
    getWebTitle = async () => {
        let { data: res } = await axios.get('/web_style')
        if (res.ok === 1) {
            this.setState({
                web_title: res.data.web_title
            })
        }
    }

    // 展开/收起下拉列表
    changeStyle = () => {
        if (!this.state.flag) {
            this.unfoldList()
        } else {
            this.shrinkList()
        }
        this.setState({
            flag: !this.state.flag
        })
    }

    // 展开列表
    unfoldList = () => {
        let lines = document.querySelectorAll('.line')
        let list = document.querySelector('.list')
        lines[0].style.transform = 'rotate(45deg)'
        lines[0].style.top = '44%'
        lines[1].style.display = 'none'
        lines[2].style.transform = 'rotate(-45deg)'
        lines[2].style.top = '-48%'
        list.style.maxHeight = 1000 + 'px'
    }

    // 收起列表
    shrinkList = () => {
        let lines = document.querySelectorAll('.line')
        let list = document.querySelector('.list')
        lines[0].style.transform = lines[2].style.transform = 'none'
        lines[0].style.top = lines[2].style.top = 0
        lines[1].style.display = 'block'
        list.style.maxHeight = 0
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item
                    onClick={() => {
                        window.location.href = '/myPublish'
                    }}
                >
                    我发布的
                </Menu.Item>
                <Menu.Item
                    onClick={() => {
                        window.location.href = '/myComment'
                    }}
                >
                    我参与的
                </Menu.Item>
                <Menu.Item
                    onClick={() => {
                        window.location.href = '/myMessage'
                    }}
                >
                    我的消息
                </Menu.Item>
                <Menu.Item
                    onClick={() => {
                        window.location.href = '/personalCenter'
                    }}
                >
                    个人中心
                </Menu.Item>
                <Menu.Item
                    onClick={() => {
                        sessionStorage.clear()
                        window.location.href = '/'
                    }}
                >
                    退出登录
                </Menu.Item>
            </Menu>
        )
        const classify = []
        this.state.classify.forEach((item, index) => {
            classify.push(
                <li
                    key={index}
                    onClick={() => {
                        this.changeStyle()
                        window.location.href = '/' + item.id
                    }}
                >
                    {item.name}
                </li>
            )
        })
        return (
            <div className="navTop">
                <div className="container">
                    <a id="logo" href="/">
                        <img alt="logo" src={require('../static/images/logo.png')} />
                        <span>{this.state.web_title || '望潮论坛'}</span>
                    </a>
                    <div className="pc-area">
                        <div className="collapse">
                            <ul>{classify}</ul>
                        </div>
                        <div className="user-operation">
                            <div
                                onClick={() => {
                                    window.location.href = '/publish'
                                }}
                                className="publish-news apple-font"
                            >
                                发布新话题
                            </div>
                            <ul style={{ marginLeft: '10px' }}>
                                {!sessionStorage.getItem('token') && (
                                    <>
                                        <li>
                                            <a href="/register">注册</a>
                                        </li>
                                        <li>
                                            <a href="/login">登录</a>
                                        </li>
                                    </>
                                )}
                                {sessionStorage.getItem('token') && (
                                    <>
                                        <Dropdown overlay={menu} trigger={['click']}>
                                            <li style={{ display: 'flex', alignItems: 'center' }}>
                                                {!this.state.userData.avatar && (
                                                    <img
                                                        style={{ width: '30px', height: '30px' }}
                                                        className="user-avatar"
                                                        src={require('../static/images/empty-avatar.png')}
                                                        alt=""
                                                    />
                                                )}
                                                {this.state.userData.avatar && <img className="user-avatar" src={this.state.userData.avatar} alt="" />}
                                                {jwt.decode(sessionStorage.getItem('token')).username}
                                                <Icon style={{ marginLeft: '5px' }} type="caret-down" />
                                            </li>
                                        </Dropdown>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="mobile-area">
                        <div className="button" onClick={this.changeStyle}>
                            <div className="line line1"></div>
                            <div className="line line2"></div>
                            <div className="line line3"></div>
                        </div>
                        <div className="list">
                            <ul>{classify}</ul>
                            <div className="user-operation">
                                <div
                                    onClick={() => {
                                        window.location.href = '/publish'
                                    }}
                                    className="publish-news apple-font"
                                >
                                    发布新话题
                                </div>
                                <ul style={{ margin: '10px 0px' }}>
                                    {!sessionStorage.getItem('token') && (
                                        <>
                                            <li>
                                                <a href="/register">注册</a>
                                            </li>
                                            <li>
                                                <a href="/login">登录</a>
                                            </li>
                                        </>
                                    )}
                                    {sessionStorage.getItem('token') && (
                                        <>
                                            <Dropdown overlay={menu} trigger={['click']}>
                                                <li style={{ display: 'flex', alignItems: 'center' }}>
                                                    {!this.state.userData.avatar && (
                                                        <img
                                                            style={{ width: '30px', height: '30px' }}
                                                            className="user-avatar"
                                                            src={require('../static/images/empty-avatar.png')}
                                                            alt=""
                                                        />
                                                    )}
                                                    {this.state.userData.avatar && <img className="user-avatar" src={this.state.userData.avatar} alt="" />}
                                                    {jwt.decode(sessionStorage.getItem('token')).username}
                                                    <Icon style={{ marginLeft: '5px' }} type="caret-down" />
                                                </li>
                                            </Dropdown>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
