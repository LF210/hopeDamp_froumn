const jwt = require("jsonwebtoken");
const { md5 } = require("./config");
module.exports = {
  // 验证令牌的函数
  tokenVerify: token => {
    try {
      var id = jwt.verify(token, md5).id;
      return id;
    } catch (error) {
      return null;
    }
  }
};
