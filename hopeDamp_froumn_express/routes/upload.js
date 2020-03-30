const uploadRouter = require("express").Router();
const db = require("../db");
const { tokenVerify } = require("../tokenVerify");
let OSS = require("ali-oss");
// 引入fs包
const fs = require("fs");
// 引入path包
const path = require("path");
// 引入上传文件中间件
const multer = require("multer");
// 配置文件上传
const upload = multer({
  dest: path.resolve(__dirname, "../") + "/uploads"
});
// 上传图片接口
uploadRouter.post("/uploadImg", upload.single("file"), (req, res) => {
  // 验证令牌
  if (!tokenVerify(req.headers.token)) {
    return res.json({
      ok: 0,
      msg: "令牌无效或过期，请重新登录！"
    });
  }
  // 获取写入的图片路径
  let des_file =
    path.resolve(__dirname, "../") + "/uploads/" + req.file.originalname;
  // 读取上传的图片buff信息
  fs.readFile(req.file.path, (err, data) => {
    if (err) console.log(err);
    // 将读取到的信息写入到图片路径中
    fs.writeFile(des_file, data, err => {
      if (err) throw err;

      // 将图片上传到阿里云服务器
      put(req.file.originalname).then(result => {
        // 上传成功后返回数据到浏览器
        if (result.res.status === 200) {
          // 图片上传服务器成功后，删除在本地的图片文件
          fs.unlink(
            path.resolve(__dirname, "../uploads/" + req.file.originalname),
            err => {
              if (err) console.log(err);
            }
          );
          // 删除上传的图片的二进制文件
          fs.unlink(req.file.path, err => {
            if (err) console.log(err);
          });
          // 返回图片的服务器路径和成功报告
          res.json({
            ok: 1,
            path: result.url,
            errno: 0,
            data: result.res.requestUrls
          });
        }
      });
    });
  });
});
// 创建OSS对象
let client = new OSS({
  region: "oss-cn-hangzhou", //阿里云对象存储地域名
  accessKeyId: "LTAI4Fpsq6rFA3fHhJjw9Z95", //api接口id
  accessKeySecret: "tHTyr3FTMXb5Rh9S6Anz1eqozHzUgD" //api接口密码
});
//使用的存储桶名
client.useBucket("wclt-lf");
//向存储桶中添加文件的接口
async function put(filename) {
  try {
    let result = await client.put(
      "my_froumn/" + filename,
      "uploads/" + filename
    );
    return result;
  } catch (err) {
    console.log(err);
  }
}
module.exports = uploadRouter;
