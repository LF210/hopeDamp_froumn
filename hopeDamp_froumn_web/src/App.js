import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
// 引入版头
import TopNav from "./views/top";
// 引入版尾
import BottomNav from "./views/bottom";
// 首页
import Home from "./views/home";
// 登录页
import Login from "./views/login";
// 话题页
import Topic from "./views/topic";
// 注册页
import Register from "./views/register";
// 发布话题页
import Publish from "./views/publish";
// 我的评论页
import MyComment from "./views/myComment";
// 我的发布页
import MyPublish from "./views/myPublish";
// 个人中心页
import PersonalCenter from "./views/personalCenter";
// 我的消息页
import MyMessage from "./views/myMessage";
// 404页面
import NoFind from "./views/noFind";
// 引入消息提示框
import { message } from "antd";
// 引入socket连接
import socket from "./socketIo";

export default class App extends Component {
  componentDidMount() {
    // 页面加载完毕后请求页面样式和标题数据
    axios.get("/web_style").then(({ data: res }) => {
      if (res.ok === 1) {
        document.title = res.data.web_title || "望潮论坛";
        document.body.style.backgroundColor = res.data.web_color || "#e2e2e2";
      }
    });
    // 连接socket.io服务器
    if (sessionStorage.getItem("token")) {
      // 接受到来自服务器的新消息提醒
      socket.on("message", data => {
        // 提醒用户收到新消息
        message.info(
          `收到了一条来自"${
            JSON.parse(JSON.stringify(data)).username
          }"的新消息！`
        );
        // 将发消息的聊天对象存储到浏览器中，用户进入我的消息页后自动连接到发消息的聊天对象
        sessionStorage.setItem("chatingUser", JSON.stringify(data));
      });
    }
  }

  render() {
    return (
      <div style={{height:'100%'}}>
        <TopNav />
        <div style={{minHeight:'calc(100% - 90px)'}}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/topic/:id" component={Topic} />
              <Route exact path="/publish" component={Publish} />
              <Route exact path="/myComment" component={MyComment} />
              <Route exact path="/myPublish" component={MyPublish} />
              <Route exact path="/personalCenter" component={PersonalCenter} />
              <Route exact path="/myMessage" component={MyMessage} />
              <Route exact path="/noFind" component={NoFind} />
              <Route exact path="/" component={Home} />
              <Route exact path="/:id" component={Home} />
            </Switch>
          </BrowserRouter>
        </div>
        <BottomNav />
      </div>
    );
  }
}
