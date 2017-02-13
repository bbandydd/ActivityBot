const path = require('path');
const linebot = require('linebot');
const express = require('express');

const luis = require('./service/luis.js');

// use express to handle line bot.
const app = express();

// generate bot
const bot = linebot({
  channelId: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_TOKEN,
});

async function getMessage(event) {
  try {
    const result = await luis.getIntent(event.message.text);
    event.reply(`意圖：${result.topScoringIntent.intent} 機率： ${result.topScoringIntent.score}`);
  } catch (e) {
    console.log('error');
  }
}

bot.on('message', getMessage);

// bot.on('message', function (event) { });
// bot.on('follow', function (event) { });
// bot.on('unfollow', function (event) { });

// bot.on('leave', function (event) { });
// bot.on('postback', function (event) { });
// bot.on('beacon', function (event) { });

// static web
app.use('/', express.static(path.join(path.resolve(), '/public')));

// generate line bot middleware to express server
const linebotParser = bot.parser();

// start express server and use line bot parser
app.post('/linewebhook', linebotParser);
app.listen(process.env.PORT || 5000, () => {
  console.log('server start success');
});
