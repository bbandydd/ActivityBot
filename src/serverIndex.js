// const path = require('path');
const linebot = require('linebot');
const express = require('express');
const checkEnv = require('check-env');
const luis = require('./service/luis.js');
const modules = require('./modules/index.js');

// check env
try {
  checkEnv(['LINE_CHANNEL_SECRET', 'LINE_CHANNEL_TOKEN', 'LINE_CHANNEL_ID', 'LUIS_API_URL']);
} catch (e) {
  console.log('缺少環境變數', e);
  process.exit();
}

// use express to handle line bot.
const app = express();

// generate bot
const bot = linebot({
  channelId: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_TOKEN,
});

global.entityModel = {
  location: '',
  'activityTime::activityStartTime': '',
  'activityTime::activityEndTime': '',
};

const setEntity = (entities) => {
  entities.forEach((entity) => {
    if (Object.keys(global.entityModel).indexOf(entity.type) !== -1) {
      global.entityModel[entity.type] = entity.entity;
    }
  });
};

const operation = {
  createActivity: (event, result) => modules.createActivity(event, result),
  joinActivity: (event, result) => modules.joinActivity(event, result),
  listUsers: (event, result) => modules.listUsers(event, result),
  registeredPresident: (event, result) => modules.registeredPresident(event, result),
  None: (event, result) => modules.None(event, result),
};

async function getMessage(event) {
  try {
    const result = await luis.getIntent(event.message.text);
    const { topScoringIntent, entities } = result;
    const op = operation[topScoringIntent.intent];

    if (op) {
      setEntity(entities);
      op(event, result);
    } else {
      event.reply('請再描述一次，謝謝！');
    }
  } catch (e) {
    console.log('error', e);
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
app.use('/', express.static(`${__dirname}/public`));

// generate line bot middleware to express server
const linebotParser = bot.parser();

// start express server and use line bot parser
app.post('/linewebhook', linebotParser);
app.listen(process.env.PORT || 5000, () => {
  console.log('server start success');
});
