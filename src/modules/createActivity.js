// Example: 明天在鼓岩國小舉辦羽球活動，時間 18:00~20:00
async function createActivity(event, luisResult) {
  if (!luisResult.entityObject.location) {
    event.reply('請輸入地點！');
  } else if (!luisResult.entityObject['activityTime::activityStartTime'] || !luisResult.entityObject['activityTime::activityEndTime']) {
    event.reply('請輸入起迄時間！');
  } else if (!luisResult.entityObject['builtin.datetime.date']) {
    event.reply('請輸入日期！');
  } else {
    const user = await this.db.users.findOne({ userId: event.source.userId });
    if (user.isPresident) {
      const entity = {
        location: luisResult.entityObject.location,
        startTime: luisResult.entityObject['activityTime::activityStartTime'],
        endTime: luisResult.entityObject['activityTime::activityEndTime'],
        date: luisResult.entityObject['builtin.datetime.date'],
        user: user.userId,
        userList: [],
      };
      const response = await this.db.activities.insert(entity);
      event.reply(response.error ? '活動建立失敗！' : '活動建立成功！');
    } else {
      event.reply('只有社長可以建立活動喔！');
    }
  }
}

module.exports = createActivity;
