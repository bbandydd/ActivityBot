async function registeredPresident(event) {
  const presidentKey = process.env.PRESIDENT_KEY;

  if (event.message.text.indexOf(presidentKey) > -1) {
    try {
      await this.db.User.update({ userId: event.source.userId }
                                , { $set: { isPresident: true } });
      event.reply('已經幫您註冊成為社長');
    } catch (e) {
      console.log('registeredPresident database error', e);
      event.reply('好像出了點錯誤沒辦法把你變成社長...');
    }
  } else {
    event.reply('沒有通關密語就想成為社長....想得美');
  }
}

module.exports = registeredPresident;
