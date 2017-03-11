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
  console.info('缺少環境變數', e);
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

function helpTemplate(helpMsg) {
  return {
    text: helpMsg,
    actions: [
      {
        type: 'message',
        label: ' ',
        text: ' ',
      },
    ],
  };
}

async function HelpHandler(event) {
  // text 有字數限制，沒有圖片或標題可打120 characters
  const joinHelp = `
  🙋 wiwi 小幫手 (◕‿◕✿)
  📘 報名活動
    💡 參加活動請打："我要參加"
    💡 帶小伙拜一起參加請打："我要參加 n位" (n是阿拉伯數字)
  `;
  const leaveHelp = `
  🙋 wiwi 小幫手 (◕‿◕✿)
    📘 請假
    💡 請假請打："我要請假"
  `;
  const userHelp = `
  🙋 wiwi 小幫手 (◕‿◕✿)
  📘 列出活動參加者
    💡 列出活動參加者請打： "列出活動參加者"
  `;
  try {
    event.reply({
      type: 'template',
      altText: 'wiwi help',
      template: {
        type: 'carousel',
        columns: [
          helpTemplate(joinHelp),
          helpTemplate(leaveHelp),
          helpTemplate(userHelp),
        ],
      },
    });
  } catch (e) {
    console.log(e);
    event.reply({
      type: 'text',
      text: '我壞了，誰來修好我',
    });
  }
}

async function getMessage(event) {
  // if messge type not text, should not tick next process.
  if (event.message.type !== 'text') {
    return;
  }

  const { message: { text }, source: { type } } = event;
  const msg = text.toLowerCase();
  const botName = process.env.BOT_NAME.toLowerCase();

  if (msg === `${botName} help`) {
    HelpHandler.call(this, event);
  } else if (type === 'user' || msg.indexOf(botName) !== -1) {
    // make condition when user cue the bot in group
    MessageHandler.call(this, event);
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
  console.info('server start success');
});
