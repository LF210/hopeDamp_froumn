import React, { Component } from "react";
import axios from "axios";
// 引入上传图片，ICON图标，提醒框，确认框组件
import { Upload, Icon, message, Modal } from "antd";
// 引入上传图片的地址
import { uploadAvatarURL } from "../config";
import jwt from "jsonwebtoken";

export default class personalCenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      imageUrl: "",
      visible: false,
      // 原密码
      oldPassword: "",
      // 新密码
      password: "",
      // 确认密码
      comfirmPassword: ""
    };
  }

  // 上传图片的函数
  uploadChange = file => {
    // 上传中
    if (file.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    // 上传完成
    if (file.file.status === "done") {
      // 发起修改头像请求，将图片地址存储到用户信息中
      axios
        .put("/userData", {
          avatar: file.file.response.path
        })
        .then(({ data: res }) => {
          if (res.ok === 1) {
            // 修改成功则提示用户
            message.success("头像修改成功!");
            this.setState({ loading: false });
            // 修改成功1秒后刷新页面
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            message.error(res.msg);
          }
        });
    }
  };

  // 修改密码
  handleOk = () => {
    // 修改密码表单校验
    if (this.state.password.trim() === "") {
      return message.error("密码不能为空");
    } else if (this.state.oldPassword.trim() === "") {
      return message.error("旧密码不能为空");
    } else if (this.state.comfirmPassword.trim() === "") {
      return message.error("确认密码不能为空");
    } else if (this.state.password !== this.state.comfirmPassword) {
      return message.error("两次输入的新密码不一致！");
    } else if (this.state.password === this.state.oldPassword) {
      return message.error("新密码不能与原密码相同！");
    }
    // 校验成功后发送修改密码请求
    axios
      .put("/userData", {
        password: this.state.password,
        oldPassword: this.state.oldPassword
      })
      .then(({ data: res }) => {
        if (res.ok === 1) {
          // 修改密码成功后隐藏弹框，清空修改密码表单
          this.setState({
            visible: false,
            oldPassword: "",
            password: "",
            comfirmPassword: ""
          });
          // 提醒用户修改密码成功
          message.success(res.msg);
        } else {
          message.error(res.msg);
        }
      });
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <div className="center-nav">
          <div className="center-nav-left">
            <div className="account-msg-head">
              <h2>个人中心</h2>
            </div>
            <div className="account-msg-body">
              <div className="user-avatar-box">
                <div>更改头像:</div>
                <Upload
                  className="upload-avatar"
                  listType="picture-card"
                  showUploadList={false}
                  action={uploadAvatarURL}
                  onChange={this.uploadChange}
                  headers={{ token: sessionStorage.getItem("token") }}
                >
                  {this.state.imageUrl ? (
                    <img
                      src={this.state.imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
              <div className="user-avatar-box">
                <div>用户名:</div>
                <div style={{ marginLeft: "1rem" }}>
                  {jwt.decode(sessionStorage.getItem("token")).username}
                </div>
              </div>
              <div className="user-avatar-box">
                <div>密码:</div>
                <button
                  className="btn"
                  onClick={() => {
                    this.setState({
                      visible: true
                    });
                  }}
                >
                  修改密码
                </button>
              </div>
            </div>
          </div>
          <div className="center-nav-right"></div>
        </div>
        <Modal
          className="change-password-modal"
          title="修改密码"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={() => {
            this.setState({
              visible: false
            });
          }}
          okText="确认"
          cancelText="取消"
        >
          <input
            type="password"
            value={this.state.oldPassword}
            onChange={e => {
              this.setState({
                oldPassword: e.target.value
              });
            }}
            placeholder="请输入原密码"
          />
          <input
            type="password"
            value={this.state.password}
            onChange={e => {
              this.setState({
                password: e.target.value
              });
            }}
            placeholder="请输入新密码"
          />
          <input
            type="password"
            value={this.state.comfirmPassword}
            onChange={e => {
              this.setState({
                comfirmPassword: e.target.value
              });
            }}
            placeholder="请再次输入新密码"
          />
        </Modal>
      </div>
    );
  }
}
