async function listUsers(event) {
  try {
    const { userList } = await this.db.activities.cfindOne({})
      .sort({ dueDate: -1 })
      .limit(1)
      .exec();

    const userProfiles = userList.map(({ userId }) => this.getUserProfile(userId));
    const userNames = (await Promise.all(userProfiles)).map(userObj => userObj.displayName);

    event.reply(`參加人數: ${userList.length},\n參加名單:\n${userNames.join(',\n')}`);
    // event.reply(`意圖：${result.topScoringIntent.intent} 機率： ${result.topScoringIntent.score}`);
  } catch (e) {
    event.reply('錯誤了，說好的使用者名單呢...');
    console.error('list users error', e);
  }
}

module.exports = listUsers;
