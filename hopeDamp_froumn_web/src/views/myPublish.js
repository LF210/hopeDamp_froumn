import React, { Component } from 'react'
import axios from 'axios'
import { Pagination, Button, Modal, message } from 'antd'
import { timeFormat } from './publicFunc'
const { confirm } = Modal

export default class myPublish extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // 论坛帖子数据
            froumnData: [],
            // 论坛页码
            pageNum: 1,
            // 论坛每页数据条数
            pageSize: 10,
            // 数据总条数
            total: 0
        }
    }

    // 页面渲染后获取数据
    componentDidMount() {
        this.getFroumnData()
    }

    /**
     * 获取用户个人发布话题数据
     * @pageNum 查询页码
     * @pageSize 每页查询条数
     */
    getFroumnData = (pageNum = 1, pageSize = 10) => {
        axios
            .get('/topicUserMsg', {
                params: {
                    pageNum,
                    pageSize
                }
            })
            .then(({ data: res }) => {
                if (res.ok === 1) {
                    // 成功获取数据则更新页面
                    this.setState({
                        froumnData: res.data,
                        total: res.total
                    })
                }
            })
    }

    // 页码改变时重新获取数据
    changePage = (pageNum, pageSize) => {
        this.getFroumnData(pageNum, pageSize)
    }

    // 修改话题
    changeTopic = (id) => {
        axios.get('/topicNormalMsg', { params: { id } }).then(({ data: res }) => {
            if (res.ok === 1) {
                sessionStorage.setItem('edit-title', res.data.title)
                sessionStorage.setItem('edit-classify_id', res.data.classify_id)
                sessionStorage.setItem('edit-value', res.data.value)
                sessionStorage.setItem('edit-id', res.data.id)
                window.location.href = '/publish'
            }
        })
    }

    // 删除话题
    removeTopic = (id) => {
        // 弹框确认用户是否要删除话题
        confirm({
            okText: '确认',
            cancelText: '取消',
            title: '确认要删除话题吗，操作不可逆转！',
            onOk: () => {
                // 用户确认删除后发送请求，根据话题id删除话题
                axios.delete('/topic', { params: { id } }).then(({ data: res }) => {
                    if (res.ok === 1) {
                        // 成功后重新获取数据并提醒用户
                        this.getFroumnData()
                        message.success('删除成功!')
                    } else {
                        message.error('删除失败！')
                    }
                })
            }
        })
    }

    render() {
        const froumnData = []
        // 循环论坛数据，用于渲染页面
        this.state.froumnData.forEach((item, index) => {
            froumnData.push(
                <div className="froumn-PublishBox" key={index}>
                    <div key={index} className="froumn-box">
                        <div
                            className="froumn-title"
                            onClick={() => {
                                window.location.href = '/topic/' + item.id
                            }}
                        >
                            {item.title}
                        </div>
                        <div className="froumn-msg">
                            <span>{item.username}</span> · <span>{item.username}</span> · {timeFormat(item.create_time)}
                            &nbsp;&nbsp;回复：
                            {item.comment_num}
                        </div>
                    </div>
                    <div className="froumn-handle-area">
                        <Button type="primary" size="small" onClick={() => this.changeTopic(item.id)}>
                            修改
                        </Button>
                        <Button type="danger" size="small" onClick={() => this.removeTopic(item.id)}>
                            删除
                        </Button>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div className="center-nav">
                    <div className="center-nav-left">
                        <div className="myPublish-box">我发布的话题</div>
                        <ul className="froumn-ul-box">{froumnData}</ul>
                        {this.state.total !== 0 && (
                            <div className="pagination-box">
                                <Pagination total={this.state.total} pageSize={this.state.pageSize} defaultCurrent={this.state.pageNum} onChange={this.changePage} />
                            </div>
                        )}
                    </div>
                    <div className="center-nav-right"></div>
                </div>
            </div>
        )
    }
}
