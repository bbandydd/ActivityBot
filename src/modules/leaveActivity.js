const generateNewActivityList = (activity, userId) => (
  activity.userList.map((userInstance) => {
    // make new instance
    const newInstance = { ...userInstance };
    // make user condition
    if (userInstance.userId === userId) {
      newInstance.isLeave = true;
    }
    return newInstance;
  })
);

async function leaveActivity(event) {
  try {
    // find the last event and remove user from userList
    const activities = await this.db.activities.cfind({}).sort({
      dueTime: -1,
    }).limit(1).exec();
    const activity = activities[0];

    // generate new userList
    const newUserList = generateNewActivityList(activity, event.source.userId);

    // set new userList to activity
    await this.db.activities.update({
      _id: activity._id,
    }, {
      $set: {
        userList: newUserList,
      },
    }, {});

    event.reply('已經幫您從活動名單中移除');
  } catch (e) {
    event.reply('好像出錯了....誰快來修好我');
    console.error('leace activity error', e);
  }
}

module.exports = leaveActivity;
