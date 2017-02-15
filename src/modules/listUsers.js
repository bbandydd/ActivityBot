const listUsers = (event, result) => {
  global.preIntent = 'listUsers';
  event.reply(`意圖：${result.topScoringIntent.intent} 機率： ${result.topScoringIntent.score}`);
};

module.exports = listUsers;
