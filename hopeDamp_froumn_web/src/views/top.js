import React, { Component } from "react";
import jwt from "jsonwebtoken";
// 引入菜单，下拉框和ICON组件
import { Menu, Dropdown, Icon, message } from "antd";
import axios from "axios";

export default class top extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
      web_title: "望潮论坛"
    };
  }

  componentDidMount() {
    // 页面挂载后判断：如果浏览器中存在token，则表明用户已登录，需要向服务器请求用户数据
    if (sessionStorage.getItem("token")) {
      axios.get("/userData").then(({ data: res }) => {
        if (res.ok === 1) {
          this.setState({
            userData: res.data
          });
        } else {
          message.error(res.msg);
        }
      });
    }
    // 页面挂载后请求网页标题数据
    axios.get("/web_style").then(({ data: res }) => {
      if (res.ok === 1) {
        this.setState({
          web_title: res.data.web_title
        });
      }
    });
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item
          onClick={() => {
            window.location.href = "/myPublish";
          }}
        >
          我发布的
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            window.location.href = "/myComment";
          }}
        >
          我参与的
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            window.location.href = "/myMessage";
          }}
        >
          我的消息
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            window.location.href = "/personalCenter";
          }}
        >
          个人中心
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            sessionStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="navTop">
        <div className="container">
          <a id="logo" href="/">
            <img alt="logo" src={require("../static/images/logo.png")} />
            <span>{this.state.web_title || "望潮论坛"}</span>
          </a>
          <div className="collapse">
            <ul>
              <li
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                推荐
              </li>
              <li
                onClick={() => {
                  window.location.href = "/" + 1;
                }}
              >
                前端
              </li>
              <li
                onClick={() => {
                  window.location.href = "/" + 2;
                }}
              >
                后端
              </li>
              <li
                onClick={() => {
                  window.location.href = "/" + 3;
                }}
              >
                Android
              </li>
              <li
                onClick={() => {
                  window.location.href = "/" + 4;
                }}
              >
                大数据
              </li>
              <li
                onClick={() => {
                  window.location.href = "/" + 5;
                }}
              >
                人工智能
              </li>
            </ul>
          </div>
          <div className="user-operation">
            <div
              onClick={() => {
                window.location.href = "/publish";
              }}
              className="publish-news apple-font"
            >
              发布新话题
            </div>
            <ul style={{ marginLeft: "10px" }}>
              {!sessionStorage.getItem("token") && (
                <>
                  <li>
                    <a href="/register">注册</a>
                  </li>
                  <li>
                    <a href="/login">登录</a>
                  </li>
                </>
              )}
              {sessionStorage.getItem("token") && (
                <>
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <li style={{ display: "flex", alignItems: "center" }}>
                      {!this.state.userData.avatar && (
                        <img
                          style={{ width: "30px", height: "30px" }}
                          className="user-avatar"
                          src={require("../static/images/empty-avatar.png")}
                          alt=""
                        />
                      )}
                      {this.state.userData.avatar && (
                        <img
                          className="user-avatar"
                          src={this.state.userData.avatar}
                          alt=""
                        />
                      )}
                      {jwt.decode(sessionStorage.getItem("token")).username}
                      <Icon style={{ marginLeft: "5px" }} type="caret-down" />
                    </li>
                  </Dropdown>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
