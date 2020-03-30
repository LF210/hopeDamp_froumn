const webStyleRouter = require("express").Router();
const db = require("../db");
// 查询网页样式（网页title，网页主色调）
webStyleRouter.get("/web_style", (req, res) => {
  db.query("SELECT * FROM web_style", (err, result) => {
    if (err) console.log(err);
    res.json({
      ok: 1,
      data: result[0]
    });
  });
});
module.exports = webStyleRouter;
