module.exports = {
  // 格式化日期的函数
  timeFormat: value => {
    let time = new Date(value);
    let year = time.getFullYear();
    let month = (time.getMonth() + 1).toString().padStart(2, "0");
    let day = time
      .getDate()
      .toString()
      .padStart(2, "0");
    let hour = time
      .getHours()
      .toString()
      .padStart(2, "0");
    let minute = time
      .getMinutes()
      .toString()
      .padStart(2, "0");
    let second = time
      .getSeconds()
      .toString()
      .padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
};
