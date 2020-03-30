const userRouter = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const request = require("request");
const { tokenVerify } = require("../tokenVerify");
const { md5 } = require("../config");
// 用户登录
userRouter.post("/login", (req, res) => {
  let sql = "SELECT * FROM user WHERE username = ? AND password = ?";
  let data = [req.body.username, req.body.password];
  db.query(sql, data, (err, result) => {
    if (err) console.log(err);
    if (result.length !== 0) {
      // 生成令牌
      let token = jwt.sign(
        { id: result[0].id, username: result[0].username },
        md5,
        { expiresIn: "2h" }
      );
      res.json({
        ok: 1,
        msg: "登录成功！",
        token: token
      });
    } else {
      res.json({
        ok: 0,
        msg: "用户名或密码错误！"
      });
    }
  });
});
// 用户注册
userRouter.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  // 用户名和密码不允许为空
  if (username.trim() == "" || password.trim() == "") {
    res.json({
      ok: 0,
      msg: "用户名或密码不能为空！"
    });
  }
  // 不允许重复用户名
  db.query("SELECT * FROM user WHERE username = ?", username, (err, result) => {
    if (err) console.log(err);
    if (result.length === 0) {
      db.query(
        "INSERT INTO user(username, password) VALUES(?, ?)",
        [username, password],
        (err, result) => {
          if (err) console.log(err);
          if (result.affectedRows === 1) {
            res.json({
              ok: 1,
              msg: "注册成功！"
            });
          }
        }
      );
    } else {
      res.json({
        ok: 0,
        msg: "用户名已存在！"
      });
    }
  });
});
// 获取用户信息
userRouter.get("/userData", (req, res) => {
  // 验证令牌
  if (!tokenVerify(req.headers.token)) {
    return res.json({
      ok: 0,
      msg: "令牌无效或过期，请重新登录！"
    });
  } else {
    var id = tokenVerify(req.headers.token);
  }
  db.query(`SELECT * FROM user WHERE id = ${id}`, (err, result) => {
    if (err) console.log(err);
    res.json({
      ok: 1,
      data: result[0]
    });
  });
});
// 修改用户信息（头像或密码）
userRouter.put("/userData", (req, res) => {
  // 验证令牌
  if (!tokenVerify(req.headers.token)) {
    return res.json({
      ok: 0,
      msg: "令牌无效或过期，请重新登录！"
    });
  } else {
    var id = tokenVerify(req.headers.token);
  }
  let avatar = req.body.avatar || "";
  let password = req.body.password || "";
  let oldPassword = req.body.oldPassword;
  // 修改头像
  if (avatar) {
    db.query(
      `UPDATE user SET avatar = '${avatar}' WHERE id = ${id}`,
      (err, result) => {
        if (err) console.log(err);
        if (result.affectedRows === 1) {
          res.json({
            ok: 1,
            msg: "修改成功!"
          });
        }
      }
    );
  } else if (password) {
    // 修改密码
    db.query(
      `SELECT * FROM user WHERE id = ${id} AND password = '${oldPassword}'`,
      (err, result) => {
        if (err) console.log(err);
        if (result.length === 0) {
          res.json({
            ok: 0,
            msg: "原密码错误！"
          });
        } else {
          db.query(
            `UPDATE user SET password = '${password}' WHERE id = ${id}`,
            (err, result) => {
              if (err) console.log(err);
              if (result.affectedRows === 1) {
                res.json({
                  ok: 1,
                  msg: "修改密码成功!"
                });
              }
            }
          );
        }
      }
    );
  }
});
// 根据用户ip获取用户地理位置信息（登录时记录用户信息）
userRouter.post("/user_ip", (req, res) => {
  let ip = req.body.ip;
  let username = req.body.username;
  let login_time = req.body.login_time;
  // 向百度地图api发起请求，根据ip获取定位
  request(
    `http://api.map.baidu.com/location/ip?ak=AaEFRWRRd5khBcbn9uBFcEe1CQvoUP8w&ip=${ip}&coor=bd09ll`,
    (err, response) => {
      if (err) console.log(err);
      let obj = JSON.parse(response.body);
      // 获取定位的省和市
      let [province, city] = [
        obj.content.address_detail.province,
        obj.content.address_detail.city
      ];
      // 将ip,省,市,登录用户和时间写入到访客记录中
      db.query(
        `INSERT INTO record(ip,province,city,username,login_time) VALUES('${ip}','${province}','${city}','${username}','${login_time}')`,
        (err, result) => {
          if (err) console.log(err);
          if (result.affectedRows === 1) {
            res.json({
              ok: 1
            });
          }
        }
      );
    }
  );
});
module.exports = userRouter;
