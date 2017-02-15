const joinActivity = (event, result) => {
  global.preIntent = 'joinActivity';
  event.reply(`意圖：${result.topScoringIntent.intent} 機率： ${result.topScoringIntent.score}`);
};

module.exports = joinActivity;
