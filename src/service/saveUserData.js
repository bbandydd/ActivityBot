async function saveUserData(db, event, result) {
  const userId = event.source.userId;
  // const chats = {
  //   userId,
  //   intentJsonStr: JSON.stringify(result),
  // };
  try {
    const userCount = await db.User.find({ userId });
    if (userCount.length === 0) {
      const user = {
        userId,
        paymentRecord: [],
        isPresident: false,
      };
      await db.User(user).save();
    }
  } catch (e) {
    console.error('saveUserData count user error', e);
  }

  // insert chat records
  // try {
  //   await db.Chat(chats).save();
  // } catch (e) {
  //   console.error('saveChats insert chats error', e);
  // }
}

module.exports = saveUserData;
