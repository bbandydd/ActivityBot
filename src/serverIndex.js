// const path = require('path');
const LineBot = require('./service/linebot');
const express = require('express');
const checkEnv = require('check-env');
const luis = require('./service/luis.js');
const intentHandlers = require('./modules/index.js');
const saveChats = require('./service/savechat.js');

// check env
try {
  checkEnv(['LINE_CHANNEL_SECRET', 'LINE_CHANNEL_TOKEN', 'LINE_CHANNEL_ID', 'LUIS_API_URL', 'PRESIDENT_KEY', 'BOT_NAME']);
} catch (e) {
  console.log('缺少環境變數', e);
  process.exit();
}

// use express to handle line bot.
const app = express();

// generate bot
const bot = new LineBot({
  channelId: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_TOKEN,
});

async function MessageHandler(event) {
  try {
    const result = await luis.getIntent(event.message.text);
    // save chat record first, then into intentHandler
    saveChats(this.db, event, result);
    intentHandlers[result.topScoringIntent.intent].call(this, event, result);
  } catch (e) {
    console.error('getMessage error', e);
  }
}

async function getMessage(event) {
  // if messge type not text, should not tick next process.
  if (event.message.type !== 'text') {
    return;
  }
  // make condition when user cue the bot in group
  const { source: { type } } = event;
  if (type === 'user') {
    MessageHandler.call(this, event);
  } else {
    const { message: { text } } = event;
    const botName = process.env.BOT_NAME;
    if (text.indexOf(botName) !== -1) {
      MessageHandler.call(this, event);
    }
  }
}

bot.on('message', getMessage);

// bot.on('message', function (event) { });
// bot.on('follow', function (event) { });
// bot.on('unfollow', function (event) { });

// bot.on('leave', function (event) { });
// bot.on('postback', function (event) { });
// bot.on('beacon', function (event) { });x

// static web
app.use('/', express.static(`${__dirname}/public`));

// generate line bot middleware to express server
const linebotParser = bot.parser();

// start express server and use line bot parser
app.post('/linewebhook', linebotParser);
app.listen(process.env.PORT || 5000, () => {
  console.log('server start success');
});
