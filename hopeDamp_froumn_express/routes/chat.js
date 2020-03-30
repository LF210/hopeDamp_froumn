const chatRouter = require("express").Router();
const db = require("../db");
const { tokenVerify } = require("../tokenVerify");
// 新建私聊房间
chatRouter.post("/room", (req, res) => {
  // 先查询数据库中是否已经有这两人私聊的房间，如果有则不作处理，没有则新建房间
  // 验证令牌
  if (!tokenVerify(req.headers.token)) {
    return res.json({
      ok: 0,
      msg: "令牌无效或过期，请重新登录！"
    });
  } else {
    // 获取发信息用户id
    var send_user_id = tokenVerify(req.headers.token);
  }
  // 获取收信息
  let collect_user_id = req.body.collect_user_id;
  // 查询数据库中是否有记录
  db.query(
    `SELECT * FROM private_room WHERE (user_id_A = ${send_user_id} AND user_id_B = ${collect_user_id}) OR (user_id_A = ${collect_user_id} AND user_id_B = ${send_user_id})`,
    (err, result) => {
      if (err) console.log(err);
      // 如果聊过天，则直接返回
      if (result.length !== 0) {
        let room_id = result[0].id;
        db.query(
          `SELECT id,username,avatar FROM user WHERE id = ${collect_user_id}`,
          (err, result) => {
            if (err) console.log(err);
            res.json({
              ok: 1,
              data: {
                id: result[0].id,
                username: result[0].username,
                avatar: result[0].avatar,
                room_id
              }
            });
          }
        );
      } else {
        // 如果没聊过天，则新建一个聊天房间后再返回
        db.query(
          `INSERT INTO private_room(user_id_A,user_id_B) VALUES('${send_user_id}','${collect_user_id}');select last_insert_id()`,
          (err, result) => {
            if (err) console.log(err);
            let room_id = null;
            // 获取刚刚创建的聊天房间的房间id
            for (let key in result[1][0]) {
              room_id = result[1][0][key];
            }
            db.query(
              `SELECT id,username,avatar FROM user WHERE id = ${collect_user_id}`,
              (err, result) => {
                if (err) console.log(err);
                res.json({
                  ok: 1,
                  data: {
                    id: result[0].id,
                    username: result[0].username,
                    avatar: result[0].avatar,
                    room_id
                  }
                });
              }
            );
          }
        );
      }
    }
  );
});
// 根据用户ID查询聊过天的用户列表
chatRouter.get("/room", (req, res) => {
  // 验证令牌
  if (!tokenVerify(req.headers.token)) {
    return res.json({
      ok: 0,
      msg: "令牌无效或过期，请重新登录！"
    });
  } else {
    // 获取用户id
    var id = tokenVerify(req.headers.token);
  }
  db.query(
    `SELECT id AS room_id,user_id_A,user_id_B FROM private_room WHERE user_id_A = ${id} OR user_id_B = ${id}`,
    (err, result) => {
      if (err) console.log(err);
      if (result.length !== 0) {
        result.forEach(v => {
          if (v.user_id_A == id) {
            delete v.user_id_A;
            v.user_id = v.user_id_B;
            delete v.user_id_B;
          } else {
            delete v.user_id_B;
            v.user_id = v.user_id_A;
            delete v.user_id_A;
          }
        });
        let userIdArr = [];
        result.forEach(v => {
          userIdArr.push(parseInt(v.user_id));
        });
        // 批量获取所有与自己聊过天的用户信息
        db.query(
          `SELECT id,username,avatar FROM user WHERE id in (${userIdArr})`,
          (err, data) => {
            if (err) console.log(err);
            // 将房间ID加到对应的用户数据上
            data.forEach(v => {
              for (var key in result) {
                if (result[key].user_id === v.id) {
                  v.room_id = result[key].room_id;
                }
              }
            });
            // 返回结果
            res.json({
              ok: 1,
              data
            });
          }
        );
      } else {
        res.json({
          ok: 1,
          data: []
        });
      }
    }
  );
});
// 根据房间ID查询聊天历史
chatRouter.get("/roomMsg", (req, res) => {
  let room_id = req.query.room_id;
  db.query(
    `SELECT p.id,p.value,p.create_time,u.username,u.avatar,u.id AS user_id FROM private_chat p,user u WHERE u.id = p.send_user_id AND p.room_id = ${room_id} ORDER BY p.create_time`,
    (err, result) => {
      if (err) console.log(err);
      res.json({
        ok: 1,
        data: result
      });
    }
  );
});

module.exports = chatRouter;
