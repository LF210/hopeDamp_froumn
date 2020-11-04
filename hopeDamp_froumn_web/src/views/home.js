/*
 * @Author: LF
 * @Description: 首页
 * @Date: 2020-10-21 08:38:38
 * @LastEditTime: 2020-10-23 09:04:29
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
    // 跳转到某个地址
    navigationTo = (url) => {
        window.location.href = url
    }

    // 页码改变时重新获取数据
    changePage = (pageNum, pageSize) => {
        this.getFroumnData(pageNum, pageSize)
    }

    // 请求论坛数据
    getFroumnData = async (pageNum = 1, pageSize = 10, classify_id) => {
        // 根据路由参数id来获取数据
        classify_id = this.props.match.params.id || ''
        // 发送请求，根据参数获取多条话题数据
        let { data: res } = await axios.get('/topic', {
            params: {
                pageNum,
                pageSize,
                classify_id
            }
        })
        if (res.ok === 1) {
            // 获取数据成功后更新页面
            this.setState({
                froumnData: res.data,
                total: res.total
            })
        } else {
            // 如果路由参数id非数字则跳转到404页面
            this.navigationTo('/nofind')
        }
    }

    componentDidMount() {
        // 页面挂载后请求首屏数据
        this.getFroumnData()
    }

    render() {
        const froumnData = []
        // 如果该分类下暂无话题数据
        if (this.state.froumnData.length === 0) {
            froumnData.push(
                <div className="froumn-empty" key="empty">
                    暂时没有数据哦
                </div>
            )
        } else {
            // 如果有话题数据，则循环论坛数据，用于渲染页面
            this.state.froumnData.forEach((item, index) => {
                froumnData.push(
                    <div className="froumn-HomeBox" key={index}>
                        <div key={index} className="froumn-box">
                            <div className="froumn-title" onClick={() => this.navigationTo('/topic/' + item.id)}>
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
                    <ul className="froumn-ul-box">{froumnData}</ul>
                    {this.state.total !== 0 && (
                        <div className="pagination-box">
                            <Pagination total={this.state.total} pageSize={this.state.pageSize} defaultCurrent={this.state.pageNum} onChange={this.changePage} />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
