const jieba = require('nodejieba');
const trashtalk = require('../service/trashtalk.js');

async function None(event) {
  const jiebaResult = jieba.cut(event.message.text).filter(x => x.length > 1); // 兩個字以上才去判斷
  event.reply(trashtalk(jiebaResult));
}

module.exports = None;
