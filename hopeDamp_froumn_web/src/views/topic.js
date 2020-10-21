/*
 * @Author: LF
 * @Description: 话题详情页
 * @Date: 2020-10-21 08:38:38
 * @LastEditTime: 2020-10-21 17:35:31
 */
/* eslint-disable */
import React, { Component } from 'react'
import axios from 'axios'
// 引入消息框，弹出框，气泡框和返回顶部组件
import { message, Modal, BackTop, Popover } from 'antd'
const { confirm } = Modal
import jwt from 'jsonwebtoken'
// 引入时间格式化的函数
import { timeFormat } from './publicFunc'
// 引入富文本编辑器
import E from 'wangeditor'
// 引入表情配置项
import { emjImg } from '../config'
// 引入富文本编辑器上传图片的地址
import { uploadImgURL } from '../config'

export default class topic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // 帖子信息
            topicData: {},
            // 评论区信息
            comment: [],
            // 个人评论数据
            comment_value: '',
            // 选择聊天的用户id
            collect_user_id: ''
        }
    }
    componentDidMount() {
        // 进入页面自动获取数据
        this.getTopicData()
        const elemMenu = this.refs.editorElemMenu
        const elemBody = this.refs.editorElemBody
        const editor = new E(elemMenu, elemBody)

        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = (html) => {
            if (!sessionStorage.getItem('token')) {
                message.error('登录后才能评论！')
                return editor.txt.html('')
            }
            this.setState({
                comment_value: editor.txt.html()
            })
        }
        editor.customConfig.menus = [
            'head', // 标题
            'bold', // 粗体
            'fontSize', // 字号
            'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            'emoticon', // 表情
            'image', // 插入图片
            'table', // 表格
            'video', // 插入视频
            'code' // 插入代码
        ]
        editor.customConfig.uploadImgServer = uploadImgURL
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
    }

    // 获取话题具体数据
    getTopicData = () => {
        axios
            .get('/topicMsg', {
                params: { id: this.props.match.params.id }
            })
            .then(({ data: res }) => {
                if (res.ok === 1) {
                    this.setState({
                        topicData: res.data,
                        comment: res.comment
                    })
                }
            })
    }

    // 提交评论
    commentSubmit = () => {
        if (this.state.comment_value.trim() === '') {
            return message.error('不能提交空评论！')
        }
        axios
            .post('/comment', {
                topic_id: this.props.match.params.id,
                value: this.state.comment_value,
                create_time: timeFormat(new Date())
            })
            .then(({ data: res }) => {
                if (res.ok === 1) {
                    // 提交评论成功后重新获取页面数据
                    // window.location.reload()
                    this.getTopicData()
                    document.querySelector('.w-e-text').innerHTML = ''
                    this.state.comment_value = ''
                } else {
                    message.error(res.msg)
                }
            })
    }

    // 删除评论
    delComment = (id) => {
        confirm({
            okText: '确认',
            cancelText: '取消',
            title: '确定要删除评论吗？',
            onOk: () => {
                axios.delete('/comment', { params: { id } }).then(({ data: res }) => {
                    console.log(res)
                    if (res.ok === 1) {
                        this.getTopicData()
                        message.success('删除成功')
                    }
                })
            }
        })
    }

    // 创建私聊房间
    createRoom = () => {
        axios.post('/room', { collect_user_id: this.state.collect_user_id }).then(({ data: res }) => {
            if (res.ok === 1) {
                if (res.data) {
                    sessionStorage.setItem('chatingUser', JSON.stringify(res.data))
                }
                window.location.href = '/myMessage'
            }
        })
    }

    render() {
        const author_content = (
            <div style={{ cursor: 'pointer' }} onClick={() => this.createRoom()}>
                发消息
            </div>
        )
        const content = (
            <div style={{ cursor: 'pointer' }} onClick={() => this.createRoom()}>
                发消息
            </div>
        )
        // 循环评论区评论数据
        let comment_arr = []
        this.state.comment.forEach((item, index) => {
            comment_arr.push(
                <div key={index} className="comment-realBox">
                    {!item.avatar && <img style={{ width: '30px', height: '30px' }} className="comment-user-avatar" src={require('../static/images/empty-avatar.png')} alt="" />}
                    {item.avatar && <img className="comment-user-avatar" src={item.avatar} />}
                    <div className="comment-head">
                        {!sessionStorage.getItem('token') && <span>{item.username}</span>}
                        {sessionStorage.getItem('token') && item.user_id === jwt.decode(sessionStorage.getItem('token')).id && <span>{item.username}</span>}
                        {sessionStorage.getItem('token') && item.user_id !== jwt.decode(sessionStorage.getItem('token')).id && (
                            <Popover content={content} trigger="click">
                                <span
                                    onClick={() => {
                                        this.setState({
                                            collect_user_id: item.user_id
                                        })
                                    }}
                                >
                                    {item.username}
                                </span>
                            </Popover>
                        )}

                        <span>{timeFormat(item.create_time)}</span>
                        <span>{index + 1}</span>
                    </div>
                    <div
                        className="comment-body"
                        dangerouslySetInnerHTML={{
                            __html: item.value
                        }}
                    />
                    {sessionStorage.getItem('token') !== null && item.user_id == jwt.decode(sessionStorage.getItem('token')).id && (
                        <a className="btn del-comment" onClick={() => this.delComment(item.id)}>
                            删除评论
                        </a>
                    )}
                </div>
            )
        })
        return (
            <div>
                <div className="center-nav">
                    <div className="center-nav-left">
                        <div className="card-head">
                            <h1>{this.state.topicData.title}</h1>
                            <div className="froumn-msg topic-msg">
                                <span>{this.state.topicData.name}</span> · {!sessionStorage.getItem('token') && <span>{this.state.topicData.username}</span>}
                                {sessionStorage.getItem('token') && this.state.topicData.author_id === jwt.decode(sessionStorage.getItem('token')).id && (
                                    <span>{this.state.topicData.username}</span>
                                )}
                                {/* {this.state.topicData.author_id ===
                  jwt.decode(sessionStorage.getItem("token")).id && (
                  <span>{this.state.topicData.username}</span>
                )} */}
                                {sessionStorage.getItem('token') && this.state.topicData.author_id !== jwt.decode(sessionStorage.getItem('token')).id && (
                                    <Popover content={author_content} trigger="click">
                                        <span
                                            onClick={() => {
                                                this.setState({
                                                    collect_user_id: this.state.topicData.author_id
                                                })
                                            }}
                                        >
                                            {this.state.topicData.username}
                                        </span>
                                    </Popover>
                                )}
                                · {timeFormat(this.state.topicData.create_time)}
                            </div>
                            <div className="share-box">
                                <a
                                    className="weibo"
                                    title="分享到微博"
                                    target="_blank"
                                    href={`http://service.weibo.com/share/share.php?url=${window.location.href}&sharesource=weibo&title=${this.state.topicData.title}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-labelledby="at-svg-sinaweibo-1" width="16" height="16">
                                        <g>
                                            <g></g>
                                            <path
                                                fill="#ffffff"
                                                d="M14.24 23.808c-3.64.367-6.785-1.307-7.022-3.734-.236-2.43 2.525-4.693 6.164-5.06 3.642-.367 6.786 1.307 7.02 3.734.24 2.43-2.522 4.696-6.16 5.06m7.28-8.063c-.31-.096-.523-.157-.362-.57.352-.898.39-1.672.006-2.227-.713-1.036-2.667-.98-4.907-.028 0 0-.705.312-.523-.253.343-1.125.29-2.065-.243-2.61-1.214-1.238-4.446.045-7.216 2.86C6.205 15.023 5 17.26 5 19.192c0 3.694 4.664 5.942 9.226 5.942 5.98 0 9.96-3.53 9.96-6.333.003-1.695-1.402-2.657-2.665-3.055M25.494 8.983a5.76 5.76 0 0 0-5.542-1.823.855.855 0 0 0-.646 1.015.84.84 0 0 0 1 .657c1.398-.303 2.912.138 3.938 1.295a4.254 4.254 0 0 1 .865 4.113c-.144.45.1.93.542 1.076a.84.84 0 0 0 1.06-.55v-.002a5.973 5.973 0 0 0-1.218-5.78"
                                            ></path>
                                            <path
                                                fill="#ffffff"
                                                d="M23.276 11.018a2.8 2.8 0 0 0-2.698-.885.74.74 0 0 0-.56.876c.086.396.472.65.86.563.467-.102.977.046 1.32.432.343.388.437.915.29 1.378a.742.742 0 0 0 .466.928.724.724 0 0 0 .913-.474c.3-.947.113-2.026-.59-2.818M14.44 19.41c-.126.223-.408.328-.627.235-.218-.09-.285-.34-.16-.555.127-.215.397-.32.612-.234.22.08.298.33.176.555m-1.16 1.512c-.353.57-1.11.82-1.676.558-.56-.26-.726-.922-.374-1.48.35-.555 1.078-.802 1.642-.56.57.25.753.905.407 1.482m1.322-4.04c-1.733-.46-3.69.42-4.443 1.97-.77 1.583-.025 3.34 1.723 3.914 1.815.595 3.95-.318 4.695-2.023.734-1.67-.182-3.39-1.976-3.86"
                                            ></path>
                                        </g>
                                    </svg>
                                </a>
                                <a
                                    className="qq"
                                    title="分享到qq空间"
                                    href={`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${window.location.href}&sharesource=qzone&title=${this.state.topicData.title}`}
                                    target="_blank"
                                >
                                    <svg t="1581062002536" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="1842" width="16" height="16">
                                        <path
                                            d="M656.548652 467.37464c-151.977343-33.011858-304.985156-12.455683-304.985156-12.455683 128.45665 11.553127 193.024202 36.154431 193.024202 36.154431L360.872512 631.521141c169.413458 35.894512 308.913629-6.703679 308.913629-6.703679C487.283574 608.880491 464.465892 594.922594 464.465892 594.922594L656.548652 467.37464 656.548652 467.37464zM947.061189 413.036058c-1.690502-5.179976-6.310729-8.859785-11.736299-9.315156l-295.426453-25.365714L524.475638 105.219413c-2.112104-5.0142-7.037277-8.283664-12.478196-8.283664-5.440919 0-10.361999 3.269463-12.473079 8.283664L384.10054 378.355187 88.673064 403.720901c-5.429663 0.455371-10.045797 4.13518-11.735275 9.315156-1.685385 5.179976-0.105401 10.865465 4.01136 14.439874L305.047066 621.630886 237.875201 910.469294c-1.235131 5.285377 0.819668 10.816347 5.223978 14.039761 4.422729 3.158946 10.30674 3.40761 14.983249 0.60989l253.91399-153.125493 253.908874 153.125493c2.177596 1.340531 4.592598 1.944282 7.008624 1.944282 2.809999 0 5.607718-0.848321 7.978718-2.549056 4.411473-3.225461 6.461155-8.754385 5.231141-14.041808L718.950887 621.630886l224.093824-194.154955C947.166589 423.901523 948.745551 418.222173 947.061189 413.036058L947.061189 413.036058zM865.615225 448.669626 681.932786 607.816253l55.053873 236.749052c1.014096 4.337795-0.671289 8.871041-4.282536 11.508102-1.940189 1.39579-4.234441 2.093684-6.538927 2.093684-1.983167 0-3.962242-0.49835-5.745864-1.595334L512.301364 731.058135 304.177256 856.571756c-3.834328 2.295276-8.661264 2.089591-12.283768-0.49835-3.613294-2.642177-5.29254-7.176446-4.28356-11.508102l55.061037-236.749052-183.683463-159.146627c-3.372817-2.926656-4.669346-7.585769-3.290953-11.830443 1.385557-4.249791 5.170766-7.264451 9.619078-7.635911l242.151086-20.794605 94.606705-223.876883c1.733481-4.110621 5.767354-6.792707 10.228969-6.792707 4.459568 0 8.493441 2.682086 10.228969 6.792707l94.605681 223.876883 242.151086 20.794605c4.450359 0.37146 8.232498 3.38612 9.619078 7.635911C870.286618 441.088974 868.989065 445.74297 865.615225 448.669626L865.615225 448.669626zM865.615225 448.669626"
                                            p-id="1843"
                                            fill="#ffffff"
                                        ></path>
                                    </svg>
                                </a>
                                <a
                                    className="douban"
                                    title="分享到豆瓣"
                                    target="_blank"
                                    href={`https://www.douban.com/share/service?name=${this.state.topicData.title}&text=${window.location.href}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-labelledby="at-svg-douban-3">
                                        <g>
                                            <path
                                                fill="#ffffff"
                                                d="M5.75 5.51H26.3V8.1H5.75zM20.74 23.98l1.93-4.29h2.21V9.72h-18v9.98h2.04l1.93 4.29H5.07v2.51h21.85v-2.51l-6.18-.01zM10 17.03v-4.88h11.68v4.88H10zm7.99 6.95h-4.37l-1.93-4.29h8.24l-1.94 4.29z"
                                            ></path>
                                        </g>
                                    </svg>
                                </a>
                                <a
                                    className="qq-friend"
                                    title="分享给qq好友"
                                    target="_blank"
                                    href={`http://connect.qq.com/widget/shareqq/index.html?url=${window.location.href}&sharesource=qzone&title=${this.state.topicData.title}`}
                                >
                                    <svg t="1583722444199" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                                        <path
                                            d="M512.268258 64.433103c-247.183323 0-447.569968 200.380501-447.569968 447.563825 0 247.189467 200.385621 447.570992 447.569968 447.570992s447.569968-200.380501 447.569968-447.569968c0-247.184347-200.386645-447.564849-447.569968-447.564849z m252.85872 584.692787c-18.997168 16.287968-43.668709-53.628042-47.2134-42.875198-8.642616 26.161294-12.695154 43.646184-38.148944 72.127602-1.35972 1.521494 29.43056 12.647032 38.148944 36.396051 8.346713 22.756875 24.596797 58.811973-81.725503 70.125906-62.389428 6.635801-107.471099-33.244533-111.964932-32.85648-8.325212 0.734126-4.618747 0-13.568528 0-7.321804 0-7.807126 0.534468-14.69685 0-1.899307-0.140272-22.632985 32.85648-115.364231 32.85648-71.878798 0-90.48177-45.243445-76.032701-70.125906 14.464428-24.877342 38.579999-32.122354 35.176604-36.06636-16.73643-19.39546-28.287904-40.1404-35.176604-58.882621-1.705793-4.666869-3.135137-9.209848-4.262434-13.574672-2.611931-10.008479-22.627866 58.76385-44.111028 42.875198-21.483162-15.883533-19.567472-56.309597-5.659014-95.003248 14.033372-39.006959 49.37687-76.562049 49.771065-84.854496 1.412962-30.849665-3.044011-35.975235 0-44.078263 6.780169-18.149391 15.034732-11.190043 15.034733-20.609788 0-118.64476 88.172909-214.829571 196.933079-214.829571 108.755051 0 196.928984 96.184811 196.928984 214.829571 0 4.554242 11.815637 0 17.474651 20.609788 1.165181 4.256291 1.968931 20.684531 0.58771 44.078263-0.658358 11.238165 29.954789 24.914202 45.777913 84.854496 15.845649 59.945414 0 88.215912-7.909514 95.003248z"
                                            fill="#ffffff"
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div
                            className="card-body"
                            dangerouslySetInnerHTML={{
                                __html: this.state.topicData.value
                            }}
                        />
                        {this.state.topicData.comment_num !== 0 && (
                            <div className="comment-msg-box">
                                <div className="comment-msg-box-head">{this.state.topicData.comment_num}条评论</div>
                                {comment_arr}
                            </div>
                        )}
                        <div className="comment-box">
                            <div className="comment-box-head">发表评论</div>
                            <div className="comment-box-body">
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
                                                height: 250,
                                                border: '1px solid #ccc',
                                                borderTop: 'none'
                                            }}
                                            ref="editorElemBody"
                                            className="editorElem-body"
                                        ></div>
                                    </div>
                                </div>
                                <a style={{ marginTop: '1rem' }} className="btn" onClick={this.commentSubmit}>
                                    评论
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="center-nav-right"></div>
                </div>
                <BackTop />
            </div>
        )
    }
}
