const trashtalk = require('../service/trashtalk.js');

async function None(event) {
  event.reply(trashtalk(event.message.text));
}

module.exports = None;
