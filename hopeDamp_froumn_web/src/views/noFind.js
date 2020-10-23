/*
 * @Author: LF
 * @Description: 404页
 * @Date: 2020-10-21 08:38:38
 * @LastEditTime: 2020-10-23 09:40:40
 */
import React, { Component } from 'react'
import '../static/noFind.css'
import { Button } from 'antd'

export default class noFind extends Component {
    render() {
        return (
            <div className="no-find">
                <div class="error-page">
                    <div class="error-page-container">
                        <div class="error-page-main">
                            <h3>
                                <strong>404</strong>无法打开页面
                            </h3>
                            <div class="error-page-actions">
                                <div>
                                    <h4>可能原因：</h4>
                                    <ol>
                                        <li>网络信号差</li>
                                        <li>找不到请求的页面</li>
                                        <li>输入的网址不正确</li>
                                    </ol>
                                    <Button
                                        type="primary"
                                        style={{ marginTop: '1rem' }}
                                        onClick={() => {
                                            window.location.href = '/'
                                        }}
                                    >
                                        返回首页
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
