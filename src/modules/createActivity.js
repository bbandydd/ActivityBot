function createActivity(event, luisResult) {
  if (!luisResult.entityObject.location) {
    event.reply('請輸入地點！');
  } else if (!luisResult.entityObject['activityTime::activityStartTime'] || !luisResult.entityObject['activityTime::activityEndTime']) {
    event.reply('請輸入起迄時間！');
  } else {
    event.reply(`location: ${luisResult.entityObject.location} startTime: ${luisResult.entityObject['activityTime::activityStartTime']} endTime: ${luisResult.entityObject['activityTime::activityEndTime']}`);
  }
}

module.exports = createActivity;
