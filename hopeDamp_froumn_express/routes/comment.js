const commentRouter = require("express").Router();
const db = require("../db");
const { tokenVerify } = require("../tokenVerify");
// 添加评论
commentRouter.post("/comment", (req, res) => {
  // 验证令牌
  if (!tokenVerify(req.headers.token)) {
    return res.json({
      ok: 0,
      msg: "令牌无效或过期，请重新登录！"
    });
  } else {
    var user_id = tokenVerify(req.headers.token);
  }
  let [topic_id, value, create_time] = [
    req.body.topic_id,
    req.body.value,
    req.body.create_time
  ];
  db.query(
    `INSERT INTO comment(topic_id, user_id, value, create_time) VALUES(${topic_id}, ${user_id}, '${value}', '${create_time}');UPDATE topic SET comment_num = comment_num + 1 WHERE id = ${topic_id}`,
    (err, result) => {
      if (err) console.log(err);
      if (result[0].affectedRows == 1 && result[1].affectedRows == 1) {
        res.json({
          ok: 1
        });
      }
    }
  );
});
// 查询用户发表的评论
commentRouter.get("/commentMsg", (req, res) => {
  // 验证令牌
  if (!tokenVerify(req.headers.token)) {
    return res.json({
      ok: 0,
      msg: "令牌无效或过期，请重新登录！"
    });
  } else {
    var id = tokenVerify(req.headers.token);
  }
  let pageNum = req.query.pageNum || 1;
  let pageSize = req.query.pageSize || 10;
  db.query(
    `SELECT t.title, t.id , c.create_time, c.value FROM comment c,topic t WHERE c.topic_id = t.id AND c.user_id = ${id} LIMIT ${(pageNum -
      1) *
      pageSize},${pageSize};SELECT COUNT(*) AS zs FROM comment WHERE user_id = ${id}`,
    (err, result) => {
      if (err) console.log(err);
      if (result[0].length !== 0) {
        res.json({
          ok: 1,
          data: result[0],
          total: result[1][0].zs
        });
      } else {
        res.json({
          ok: 0
        });
      }
    }
  );
});
// 删除评论
commentRouter.delete("/comment", (req, res) => {
  // 验证令牌
  if (!tokenVerify(req.headers.token)) {
    return res.json({
      ok: 0,
      msg: "令牌无效或过期，请重新登录！"
    });
  } else {
    var user_id = tokenVerify(req.headers.token);
  }
  let id = req.query.id;
  if (!id) {
    return res.json({
      ok: 0,
      msg: "参数错误！"
    });
  }
  // 首先查询删除评论者ID是否等于发布评论者ID（只能删除自己的评论）
  db.query(
    `SELECT * FROM comment WHERE id = ${id} AND user_id = ${user_id}`,
    (err, result) => {
      if (err) console.log(err);
      if (result.length !== 0) {
        // 查询评论ID所属的话题ID
        db.query(
          `SELECT topic_id FROM comment WHERE id = ${id}`,
          (err, result) => {
            if (err) console.log(err);
            let topic_id = result[0].topic_id;
            // 删除评论，并且将对应的话题评论数减一
            db.query(
              `DELETE FROM comment WHERE id = ${id};UPDATE topic SET comment_num = comment_num - 1 WHERE id = ${topic_id}`,
              (err, result) => {
                if (err) console.log(err);
                res.json({
                  ok: 1
                });
              }
            );
          }
        );
      } else {
        res.json({
          ok: 0,
          msg: "只能删除自己的评论！"
        });
      }
    }
  );
});
module.exports = commentRouter;
