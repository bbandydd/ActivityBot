// const path = require('path');
const LineBot = require('./service/linebot');
const express = require('express');
const checkEnv = require('check-env');
const luis = require('./service/luis.js');
const intentHandlers = require('./modules/index.js');

// check env
try {
  checkEnv(['LINE_CHANNEL_SECRET', 'LINE_CHANNEL_TOKEN', 'LINE_CHANNEL_ID', 'LUIS_API_URL', 'PRESIDENT_KEY']);
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

async function saveChats(event, result) {
  const { userId } = event.source.userId;
  const chats = {
    userId,
    intentJsonStr: JSON.stringify(result),
  };
  const { newDoc: userCount } = await this.db.users.count({ userId });
  if (userCount === 0) {
    const user = {
      userId,
      paymentRecord: [],
      isPresident: false,
    };
    await this.db.users.insert(user);
  }

  await this.db.chats.insert(chats);
}

async function getMessage(event) {
  try {
    const result = await luis.getIntent(event.message.text);

    intentHandlers[result.topScoringIntent.intent].call(this, event, result);
    saveChats.call(this, event, result);
  } catch (e) {
    console.error('getMessage error', e);
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
