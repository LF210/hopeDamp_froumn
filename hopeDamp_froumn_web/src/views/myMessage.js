/*
 * @Author: LF
 * @Description: 我的消息页
 * @Date: 2020-10-21 08:38:38
 * @LastEditTime: 2020-10-24 17:10:51
 */
/* eslint-disable */
import React, { Component } from 'react'
import axios from 'axios'
import E from 'wangeditor'
import { emjImg } from '../config'
import { uploadImgURL } from '../config'
import jwt from 'jsonwebtoken'
import { Button, message } from 'antd'
import { timeFormat } from './publicFunc'
import socket from '../socketIo'

export default class myMessage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // 历史聊天用户数据
            historyChatUser: [],
            // 正在聊天的用户
            chatingUser: '',
            // 正在聊天的聊天数据
            chatMsg: [],
            // 发送消息的锁
            sendMsgLock: true
        }
    }

    componentDidMount() {
        // 获取新的消息内容
        socket.on('value', (data) => {
            // 如果正在聊天的这个人并不是发消息的人则返回
            if (JSON.parse(JSON.stringify(data)).user_id !== this.state.chatingUser.id) {
                return false
            }
            // 否则将新消息自动同步到页面中
            this.state.chatMsg.push(JSON.parse(JSON.stringify(data)))
            this.setState({
                chatMsg: this.state.chatMsg
            })
            // 将聊天框滚动到底部以显示最新消息
            this.chatViewScrollToBottom()
        })
        // 如果有聊天对象，则同步到页面中
        if (sessionStorage.getItem('chatingUser')) {
            this.setState(
                {
                    chatingUser: JSON.parse(sessionStorage.getItem('chatingUser'))
                },
                () => {
                    // 重新获取聊天历史数据
                    this.getChatHistoryMsg(this.state.chatingUser.room_id)
                    // 将发送消息的按钮解禁
                    this.setState({
                        sendMsgLock: false
                    })
                }
            )
            // 移除浏览器中的聊天对象
            sessionStorage.removeItem('chatingUser')
        }
        // 富文本编辑器相关
        const elemMenu = this.refs.editorElemMenu
        const elemBody = this.refs.editorElemBody
        const editor = new E(elemMenu, elemBody)
        // 富文本编辑器的配置项
        editor.customConfig.menus = [
            'emoticon', // 表情
            'image' // 插入图片
        ]
        // 富文本编辑器上传图片的地址
        editor.customConfig.uploadImgServer = uploadImgURL
        // 富文本编辑器上传图片的name
        editor.customConfig.uploadFileName = 'file'
        // 表情配置项
        editor.customConfig.emotions = [
            {
                title: '表情',
                type: 'image',
                content: emjImg
            }
        ]
        // 将token加到上传图片请求头中
        editor.customConfig.uploadImgHeaders = {
            token: sessionStorage.getItem('token')
        }
        // 实例化富文本编辑器
        editor.create()
        // 获取所有历史聊天用户
        axios.get('/room').then(({ data: res }) => {
            if (res.ok === 1) {
                console.log(res)
                // 同步数据
                this.setState({
                    historyChatUser: res.data
                })
            }
        })
    }

    // 页面更新时将聊天框滚动到底部以显示最新消息
    componentDidUpdate() {
        this.chatViewScrollToBottom()
    }

    // 将聊天框滚动到底部以显示最新消息
    chatViewScrollToBottom = () => {
        // 等待数据挂载完毕后再滚动
        setTimeout(() => {
            document.querySelector('.chat-view').scrollTop = document.querySelector('.chat-view').scrollHeight
        }, 30)
    }

    // 改变聊天对象
    changeChat = (data, index) => {
        // 将点击的用户设置为当前对话用户
        this.setState(
            {
                chatingUser: data
            },
            () => {
                // 重新获取聊天历史数据
                this.getChatHistoryMsg(this.state.chatingUser.room_id)
                // 将发送消息按钮解禁，并清空聊天框
                this.setState({
                    sendMsgLock: false
                })
                // 还原富文本编辑器
                document.querySelector('.w-e-text').innerHTML = `<p><br></p>`
            }
        )
    }

    // 获取聊天纪录,并将所有聊天记录设置为已查看
    getChatHistoryMsg = async (id) => {
        let { data: res } = await axios.get('/roomMsg', { params: { room_id: id } })
        if (res.ok === 1) {
            this.setState({
                chatMsg: res.data
            })
        }
    }

    // 发送消息
    sendMsg = async () => {
        // 不能发送空消息
        if (document.querySelector('.w-e-text').innerHTML === '<p><br></p>') {
            return message.error('不能发送空消息！')
        }
        // 如果发消息事件没有上锁，则允许发送消息
        if (!this.state.sendMsgLock) {
            // 发送消息时上锁，直到消息发送完毕（防止连点发送按钮造成多次发送消息）
            this.setState({
                sendMsgLock: true
            })
            let { data: res } = await axios.post('/roomMsg', {
                room_id: this.state.chatingUser.room_id,
                value: document.querySelector('.w-e-text').innerHTML,
                create_time: timeFormat(new Date()),
                collect_user_id: this.state.chatingUser.id
            })
            // 发送消息成功后
            if (res.ok === 1) {
                // 重新获取数据
                this.getChatHistoryMsg(this.state.chatingUser.room_id)
                // 解开发送消息的锁
                this.setState({
                    sendMsgLock: false
                })
                // 还原富文本编辑器
                document.querySelector('.w-e-text').innerHTML = `<p><br></p>`
            } else {
                message.error(res.msg)
            }
        }
    }

    render() {
        const chatUserData = []
        if (this.state.historyChatUser) {
            // 循环聊天用户历史数据，用于渲染页面
            this.state.historyChatUser.forEach((item, index) => {
                chatUserData.push(
                    <div key={index} className="chatUserBox" onClick={() => this.changeChat(item, index)}>
                        <div className="chatUserBox-avatar">
                            {item.avatar && <img src={item.avatar} className="user-avatar" />}
                            {!item.avatar && <img style={{ width: '30px', height: '30px' }} className="user-avatar" src={require('../static/images/empty-avatar.png')} alt="" />}
                        </div>
                        <div className="chatUserBox-username">{item.username}</div>
                    </div>
                )
            })
        }
        const chatMsg = []
        // 循环聊天数据，用于渲染页面
        if (this.state.chatMsg) {
            this.state.chatMsg.forEach((item, index) => {
                if (item.user_id === jwt.decode(sessionStorage.getItem('token')).id) {
                    chatMsg.push(
                        <div key={index} className="myMsg">
                            <div className="chatUserBox-avatar">
                                {item.avatar && <img src={item.avatar} className="user-avatar" />}
                                {!item.avatar && (
                                    <img style={{ width: '30px', height: '30px' }} className="user-avatar" src={require('../static/images/empty-avatar.png')} alt="" />
                                )}
                            </div>
                            <div className="chatUserBox-msg">
                                <div
                                    className="chat-value"
                                    dangerouslySetInnerHTML={{
                                        __html: item.value
                                    }}
                                ></div>
                            </div>
                        </div>
                    )
                } else {
                    chatMsg.push(
                        <div key={index} className="friendMsg">
                            <div className="chatUserBox-avatar">
                                {item.avatar && <img src={item.avatar} className="user-avatar" />}
                                {!item.avatar && (
                                    <img style={{ width: '30px', height: '30px' }} className="user-avatar" src={require('../static/images/empty-avatar.png')} alt="" />
                                )}
                            </div>
                            <div className="chatUserBox-msg">
                                <div
                                    className="chat-value"
                                    dangerouslySetInnerHTML={{
                                        __html: item.value
                                    }}
                                ></div>
                            </div>
                        </div>
                    )
                }
            })
        }
        return (
            <div className="chat-box">
                <div className="center-nav">
                    <div className="center-nav-left">
                        {this.state.chatingUser && (
                            <h2>
                                正在与<b>{this.state.chatingUser.username}</b>对话
                            </h2>
                        )}
                        {!this.state.chatingUser && <h2>聊天室</h2>}
                        <div className="chat-view">{chatMsg}</div>
                        <div className="chat-editor">
                            <div className="shop">
                                <div className="text-area">
                                    <div
                                        ref="editorElemMenu"
                                        style={{
                                            backgroundColor: '#f1f1f1',
                                            border: '1px solid #ccc'
                                        }}
                                        className="editorElem-menu"
                                    ></div>
                                    <div
                                        style={{
                                            overflowY: 'auto',
                                            height: 200,
                                            border: '1px solid #ccc',
                                            borderTop: 'none'
                                        }}
                                        ref="editorElemBody"
                                        className="editorElem-body"
                                    ></div>
                                </div>
                            </div>
                            <Button type="primary" style={{ width: '100%', marginTop: '.5rem' }} onClick={() => this.sendMsg()}>
                                发送
                            </Button>
                        </div>
                    </div>
                    <div className="center-nav-right">
                        <div className="chat-list">
                            <div className="chat-list-head">最近聊天</div>
                            <div className="chat-list-body">{chatUserData}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
