async function listUsers(event) {
  try {
    const { userList } = await this.db.activities.cfindOne({})
      .sort({ dueDate: -1 })
      .limit(1)
      .exec();
    const userIds = userList.map(({ userId }) => userId);
    event.reply(`參加人數: ${userList.length}, 
目前只有參加者的ID:${userIds.join(',')}
(悄悄話:看可不可以加上姓名或是再去line api 查詢)`);
    // event.reply(`意圖：${result.topScoringIntent.intent} 機率： ${result.topScoringIntent.score}`);
  } catch (e) {
    event.reply('錯誤了，說好的使用者名單呢...');
    console.error('leace activity error', e);
    console.error('list users error', e);
  }
}

module.exports = listUsers;
