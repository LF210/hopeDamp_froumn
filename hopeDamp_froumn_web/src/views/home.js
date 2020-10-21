/*
 * @Author: LF
 * @Description: 首页
 * @Date: 2020-10-21 08:38:38
 * @LastEditTime: 2020-10-21 14:59:28
 */
import React, { Component } from 'react'
import axios from 'axios'
import { Pagination } from 'antd'
import { timeFormat } from './publicFunc'

export default class home extends Component {
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

    // 页码改变时重新获取数据
    changePage = (pageNum, pageSize) => {
        this.getFroumnData(pageNum, pageSize)
    }

    // 请求论坛数据
    getFroumnData = (pageNum = 1, pageSize = 10, classify_id) => {
        // 根据路由参数id来获取数据
        classify_id = this.props.match.params.id || ''
        // 发送请求，根据参数获取多条话题数据
        axios
            .get('/topic', {
                params: {
                    pageNum,
                    pageSize,
                    classify_id
                }
            })
            .then(({ data: res }) => {
                if (res.ok === 1) {
                    // 获取数据成功后更新页面
                    this.setState({
                        froumnData: res.data,
                        total: res.total
                    })
                } else {
                    // 如果路由参数id非数字则跳转到404页面
                    window.location.href = '/nofind'
                }
            })
    }

    componentDidMount() {
        // 请求首屏数据
        this.getFroumnData()
    }
    render() {
        const froumnData = []
        // 循环论坛数据，用于渲染页面
        if (this.state.froumnData.length === 0) {
            froumnData.push(
                <div className="froumn-empty" key="empty">
                    暂时没有数据哦
                </div>
            )
        } else {
            this.state.froumnData.forEach((item, index) => {
                froumnData.push(
                    <div className="froumn-HomeBox" key={index}>
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
                                <span>{item.name}</span> · <span>{item.username}</span> · {timeFormat(item.create_time)}
                                &nbsp;&nbsp;回复：
                                {item.comment_num}
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div>
                <div className="center-nav">
                    <div className="center-nav-left">
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
