import React, { Component } from "react";
import axios from "axios";
// 引入分页和回到顶部组件
import { Pagination, BackTop, message } from "antd";
// 引入格式化时间的函数
import { timeFormat } from "./publicFunc";

export default class myComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 回复数据
      commentData: [],
      // 查询页码
      pageNum: 1,
      // 查询每页数据条数
      pageSize: 10,
      // 数据总条数
      total: 0
    };
  }

  // 页面渲染后获取评论数据
  componentDidMount() {
    this.getCommentData();
  }

  /**
   * 获取用户个人回复数据
   * @pageNum 查询页码
   * @pageSize 每页查询条数
   */
  getCommentData = (pageNum = 1, pageSize = 10) => {
    axios
      .get("/commentMsg", {
        params: {
          pageNum,
          pageSize
        }
      })
      .then(({ data: res }) => {
        if (res.ok === 1) {
          // 成功获取数据则更新页面
          this.setState({
            commentData: res.data.reverse(),
            total: res.total
          });
        } else {
          message.error(res.msg);
        }
      });
  };

  render() {
    const commentData = [];
    // 循环评论数据，用于渲染页面
    this.state.commentData.forEach((item, index) => {
      commentData.push(
        <div className="myComment-froumn-box">
          <div key={index} className="froumn-box">
            <div className="comment-user-head">
              <div
                className="froumn-title"
                onClick={() => {
                  window.location.href = "/topic/" + item.id;
                }}
              >
                {item.title}
              </div>
              <div className="comment-time">{timeFormat(item.create_time)}</div>
            </div>
            <div
              className="comment-user-body"
              dangerouslySetInnerHTML={{
                __html: item.value
              }}
            />
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="center-nav">
          <div className="center-nav-left">
            <div className="myPublish-box">我回复的话题</div>
            <ul className="froumn-ul-box">{commentData}</ul>
            {this.state.total !== 0 && (
              <div className="pagination-box">
                <Pagination
                  total={this.state.total}
                  pageSize={this.state.pageSize}
                  defaultCurrent={this.state.pageNum}
                  onChange={this.changePage}
                />
              </div>
            )}
          </div>
          <div className="center-nav-right"></div>
        </div>
        <BackTop />
      </div>
    );
  }
}
