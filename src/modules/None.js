const jieba = require('nodejieba');
const trashtalk = require('../service/trashtalk.js');

function None(event, result) {
  const jiebaResult = jieba.cut(event.message.text); //.filter(x => x.length > 1); // 兩個字以上才去判斷
  console.log(jiebaResult)
  event.reply(trashtalk(jiebaResult));
}

module.exports = None;
