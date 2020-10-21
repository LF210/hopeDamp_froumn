/*
 * @Author: LF
 * @Description: 登录页
 * @Date: 2020-10-21 08:38:38
 * @LastEditTime: 2020-10-21 15:01:02
 */
import React, { Component } from "react";
// 引入消息提示框
import { message } from "antd";
import axios from "axios";
import jwt from "jsonwebtoken";
import { timeFormat } from "./publicFunc";

export default class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }
  // 登录
  login = () => {
    // 表单校验
    if (
      this.state.username.trim() === "" ||
      this.state.password.trim() === ""
    ) {
      return message.error("用户名或密码不能为空！");
    }
    // 发送登录请求
    axios
      .post("/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(({ data: res }) => {
        if (res.ok === 1) {
          // 提示用户登录成功
          message.success(res.msg);
          // 将令牌存到浏览器
          sessionStorage.setItem("token", res.token);
          // 获取用户ip
          let user_ip = window.returnCitySN.cip;
          // 发送用户ip到服务器（记录用户登录信息）
          axios.post("/user_ip", {
            ip: user_ip,
            username: jwt.decode(res.token).username,
            login_time: timeFormat(new Date())
          });
          // 一秒后跳转到首页
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          message.error(res.msg);
        }
      });
  };
  render() {
    return (
      <div>
        <div className="center-nav">
          <div className="center-nav-left">
            <div className="user-handle-box">
              <h1>登录</h1>
              <hr />
              <input
                value={this.state.username}
                onChange={e => {
                  this.setState({
                    username: e.target.value
                  });
                }}
                placeholder="账号"
              />
              <br />
              <input
                value={this.state.password}
                onChange={e => {
                  this.setState({
                    password: e.target.value
                  });
                }}
                onKeyUp={e => {
                  e.preventDefault();
                  if (e.keyCode === 13) {
                    this.login();
                  }
                }}
                type="password"
                placeholder="密码"
              />
              <br />
              <button className="btn" onClick={this.login}>
                登录
              </button>
            </div>
          </div>
          <div className="center-nav-right"></div>
        </div>
      </div>
    );
  }
}
