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

module.exports = HelpHandler;