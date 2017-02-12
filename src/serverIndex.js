const path = require('path');
const linebot = require('linebot');
const express = require('express');

// use express to handle line bot.
const app = express();

// generate bot
const bot = linebot({
  channelId: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_TOKEN,
});

bot.on('message', (event) => {
  event.reply('get message success');
  console.log('event');
});

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
