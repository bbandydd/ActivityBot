// 可能會拿到其他Intent需要的參數，執行前一個Intent動作
const None = (event, result) => {
  if (global.preIntent) {
    global.operation[global.preIntent](event, result);
  }
};

module.exports = None;
