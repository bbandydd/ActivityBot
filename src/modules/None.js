const None = (event, result) => {
	event.reply(`意圖：${result.topScoringIntent.intent} 機率： ${result.topScoringIntent.score}`)
};

module.exports = None;
