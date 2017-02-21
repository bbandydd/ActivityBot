// LUIS 回傳的日期格式有時候會很奇怪 XXXX-03-01 所以我要把它正規化
const parseDate = require('../service/parseDate.js');

// Example: 明天在鼓岩國小舉辦羽球活動，時間 18:00~20:00
async function createActivity(event, luisResult) {
  if (!luisResult.entityObject.location) {
    event.reply('請輸入地點！');
  } else if (!luisResult.entityObject['activityTime::activityStartTime'] || !luisResult.entityObject['activityTime::activityEndTime']) {
    event.reply('請輸入起迄時間！');
  } else if (!luisResult.entityObject['builtin.datetime.date']) {
    event.reply('請輸入日期！');
  } else {
    try {
      const user = await this.db.users.findOne({ userId: event.source.userId });
      if (user.isPresident) {
        const entity = {
          location: luisResult.entityObject.location,
          startTime: luisResult.entityObject['activityTime::activityStartTime'],
          endTime: luisResult.entityObject['activityTime::activityEndTime'],
          date: parseDate(luisResult.entityObject['builtin.datetime.date']),
          user: user.userId,
          userList: [],
          dueTime: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
        };
        const response = await this.db.activities.insert(entity);
        event.reply(response.error ? '活動建立失敗！' : '活動建立成功！');
      } else {
        event.reply('只有社長可以建立活動喔！');
      }
    } catch (e) {
      console.error('createActivity insert activity error', e);
      event.reply('Oops, 建立活動發生錯誤....請找管理者！');
    }
  }
}

module.exports = createActivity;
