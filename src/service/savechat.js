async function saveChats(db, event, result) {
  const userId = event.source.userId;
  const chats = {
    userId,
    intentJsonStr: JSON.stringify(result),
  };
  try {
    const userCount = await db.users.count({ userId });
    if (userCount === 0) {
      const user = {
        userId,
        paymentRecord: [],
        isPresident: false,
      };
      await db.users.insert(user);
    }
  } catch (e) {
    console.error('saveChats count user error', e);
  }

  // insert chat records
  try {
    await db.chats.insert(chats);
  } catch (e) {
    console.error('saveChats insert chats error', e);
  }
}

module.exports = saveChats;
