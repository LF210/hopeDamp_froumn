/* eslint-disable */
import React, { Component } from "react";
import { message, Modal } from "antd";
import axios from "axios";
import jwt from "jsonwebtoken";
import { timeFormat } from "./publicFunc";
import E from "wangeditor";
import { emjImg } from "../config";
import { uploadImgURL } from "../config";
const { confirm } = Modal;

export default class publish extends Component {
  constructor(props) {
    super(props);

    // 如果用户未登录状态进入发布话题页，阻止并跳转到登录页
    if (!sessionStorage.getItem("token")) {
      window.location.href = "/login";
      return alert("登陆后才能发布新话题！");
    }

    this.state = {
      // 话题标题
      title: "",
      // 话题分类
      classify: 0,
      // 话题内容
      value: "",
      // 修改或发布话题的类型（0为发布，1为修改）
      publishType: 0,
      // 发布话题按钮的禁用状态（0为未禁用，1为禁用）
      btnDisable: 0
    };
  }

  componentDidMount() {
    const elemMenu = this.refs.editorElemMenu;
    const elemBody = this.refs.editorElemBody;
    const editor = new E(elemMenu, elemBody);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        value: editor.txt.html()
      });
      // 保存草稿到浏览器
      if (this.state.publishType === 0) {
        localStorage.setItem("publish_value", this.state.value);
        localStorage.setItem(
          "publish_id",
          jwt.decode(sessionStorage.getItem("token")).id
        );
      }
    };
    // 富文本编辑器的配置项
    editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "video", // 插入视频
      "code" // 插入代码
    ];
    // 富文本编辑器上传图片的地址
    editor.customConfig.uploadImgServer = uploadImgURL;
    // 富文本编辑器上传图片的name
    editor.customConfig.uploadFileName = "file";
    // 表情配置项
    editor.customConfig.emotions = [
      {
        title: "表情",
        type: "image",
        content: emjImg
      }
    ];
    // 将token加到上传图片请求头中
    editor.customConfig.uploadImgHeaders = {
      token: sessionStorage.getItem("token")
    };
    // 实例化富文本编辑器
    editor.create();
    // 修改话题
    if (sessionStorage.getItem("edit-title") !== null) {
      // 将数据同步到state中
      this.setState({
        publishType: 1,
        title: sessionStorage.getItem("edit-title"),
        classify: sessionStorage.getItem("edit-classify_id"),
        value: sessionStorage.getItem("edit-value")
      });
      // 富文本编辑器同步页面数据
      editor.txt.html(sessionStorage.getItem("edit-value"));
      // 单选分类同步数据
      document.querySelector("select").value = sessionStorage.getItem(
        "edit-classify_id"
      );
      // 同步数据结束后清空缓存
      sessionStorage.removeItem("edit-title");
      sessionStorage.removeItem("edit-classify_id");
      sessionStorage.removeItem("edit-value");
    } else if (
      // 登录用户id等于草稿箱用户id并且草稿箱中标题，内容，分类任意一个不为空则为存在草稿
      localStorage.getItem("publish_id") ===
        jwt.decode(sessionStorage.getItem("token")).id &&
      (localStorage.getItem("publish_value") !== null ||
        localStorage.getItem("publish_classify") !== null ||
        localStorage.getItem("publish_title") !== null)
    ) {
      // 发布新话题（存在草稿）
      this.setState({
        publishType: 0
      });
      // 询问是否导入草稿
      confirm({
        okText: "确认",
        cancelText: "取消",
        title: "是否导入之前的草稿？",
        onOk: () => {
          // 将草稿数据导入到页面中
          editor.txt.html(localStorage.getItem("publish_value"));
          this.setState({
            title: localStorage.getItem("publish_title"),
            classify: localStorage.getItem("publish_classify"),
            value: localStorage.getItem("publish_value")
          });
          document.querySelector("select").value = localStorage.getItem(
            "publish_classify"
          );
        },
        oncancel: () => {
          // 不导入草稿箱则清空草稿箱
          localStorage.clear();
        }
      });
      // 发布新话题（没有草稿）
    } else if (
      localStorage.getItem("publish_id") !==
      jwt.decode(sessionStorage.getItem("token")).id
    ) {
      // 清空草稿箱内容
      localStorage.clear();
      // 将状态设为发布话题
      this.setState({
        publishType: 0
      });
    }
  }

  // 发布话题
  publishClick = () => {
    if (this.state.btnDisable === 1) {
      return false;
    }
    if (this.state.classify === 0 || this.state.classify === "default") {
      return message.error("必须选择一个分类！");
    } else if (this.state.title === "") {
      return message.error("话题标题不能为空！");
    } else if (this.state.value.trim() === "") {
      return message.error("话题内容不能为空！");
    }
    if (this.state.publishType === 0) {
      // 发布新话题
      axios
        .post("/topic", {
          title: this.state.title,
          classify_id: this.state.classify,
          create_time: timeFormat(new Date()),
          value: this.state.value
        })
        .then(({ data: res }) => {
          if (res.ok === 1) {
            message.success("发布话题成功！");
            localStorage.clear();
            // 禁用发布按钮，防止多次点击发布导致多次发布
            this.setState({
              btnDisable: 1
            });
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          } else {
            message.error(res.msg);
          }
        });
    } else {
      // 修改话题
      axios
        .put("/topic", {
          id: sessionStorage.getItem("edit-id"),
          title: this.state.title,
          classify_id: this.state.classify,
          value: this.state.value
        })
        .then(({ data: res }) => {
          if (res.ok === 1) {
            message.success("修改成功！");
            sessionStorage.removeItem("edit-title");
            sessionStorage.removeItem("edit-classify_id");
            sessionStorage.removeItem("edit-value");
            sessionStorage.removeItem("edit-id");
            // 禁用发布按钮，防止多次点击发布导致多次发布
            this.setState({
              btnDisable: 1
            });
            setTimeout(() => {
              window.location.href = "/myPublish";
            }, 1000);
          }
        });
    }
  };

  render() {
    return (
      <div>
        <div className="center-nav">
          <div className="center-nav-left">
            <div className="publish-card">
              <div className="publish-card-head">
                {(this.state.publishType === 0 && "发布新话题") || "修改话题"}
              </div>
              <div className="publish-card-body">
                <h3>标题</h3>
                <input
                  value={this.state.title}
                  onChange={e => {
                    this.setState({
                      title: e.target.value
                    });
                    if (this.state.publishType === 0) {
                      localStorage.setItem(
                        "publish_id",
                        jwt.decode(sessionStorage.getItem("token")).id
                      );
                      localStorage.setItem("publish_title", e.target.value);
                    }
                  }}
                />
                <h3>分类</h3>
                <select
                  defaultValue="default"
                  className="shortselect"
                  onChange={e => {
                    this.setState({
                      classify: e.target.value
                    });
                    if (this.state.publishType === 0) {
                      localStorage.setItem(
                        "publish_id",
                        jwt.decode(sessionStorage.getItem("token")).id
                      );
                      localStorage.setItem("publish_classify", e.target.value);
                    }
                  }}
                >
                  <option value="default">---请选择--</option>
                  <option value="1">前端</option>
                  <option value="2">后端</option>
                  <option value="3">Android</option>
                  <option value="4">大数据</option>
                  <option value="5">人工智能</option>
                </select>
                <h3>正文</h3>
                <div className="shop">
                  <div className="text-area">
                    <div
                      ref="editorElemMenu"
                      style={{
                        backgroundColor: "#f1f1f1",
                        border: "1px solid #ccc"
                      }}
                      className="editorElem-menu"
                    ></div>
                    <div
                      style={{
                        overflowY: "auto",
                        height: 250,
                        border: "1px solid #ccc",
                        borderTop: "none"
                      }}
                      ref="editorElemBody"
                      className="editorElem-body"
                    ></div>
                  </div>
                </div>
                <a
                  className="btn"
                  style={{ marginTop: "1rem" }}
                  onClick={this.publishClick}
                >
                  发布
                </a>
              </div>
            </div>
          </div>
          <div className="center-nav-right"></div>
        </div>
      </div>
    );
  }
}
