function getPosibleNumbers(array) {
  return array.reduce((previous, element) => {
    const inPrevious = previous.find(item => item === element.entity);
    if (!inPrevious) {
      previous.push(element.entity);
    }
    return previous;
  }, []);
}

async function joinActivity(event, result) {
  const { topScoringIntent, entities } = result;
  if (topScoringIntent.score < 0.7) {
    event.reply('你是不是想要參加活動，請告訴我更多');
    return;
  }
  try {
    const queryset = { location: '鼓岩國小' };
    const activityList = await this.db.activities
    .cfind(queryset).sort({ dueTime: -1 }).limit(1).exec();
    if (activityList.length === 0) {
      event.reply('目前沒有活動可以參加！');
      return;
    }

    const activity = activityList[0];
    if (Date.now() > activity.dueTime) {
      event.reply(`${activity.location} 報名截止！`);
      return;
    }

    const user = activity.userList.filter(item => item.userId === event.source.userId);
    if (user.length > 0) {
      event.reply('你已經報名過了！');
      return;
    }

    const filteredNumberTypeEntity = entities.filter(item => item.type === 'builtin.number');
    if (filteredNumberTypeEntity.length > 1) {
      const PosibleApplicantsNumber = getPosibleNumbers(filteredNumberTypeEntity);
      event.reply(`到底幾位要參加? ${PosibleApplicantsNumber.join(', ')} ?  報名失敗!`);
      return;
    }
    // filteredNumberTypeEntity為空[]，表示預設只有一個人要參加
    // console.log('判別為number的個數', filteredNumberTypeEntity);
    const instance = {
      userId: event.source.userId,
      number: filteredNumberTypeEntity.length ? Number(filteredNumberTypeEntity[0].entity) : 1,
      isLeave: false,
    };

    const response = await this.db.activities.update({ _id: activity._id },
    { $set: { userList: [...activity.userList, instance] } }, {});
    event.reply(response.err ? '參加活動失敗！' : '參加活動成功！');
  } catch (e) {
    console.error('joinActivity error', e);
    event.reply('好像出錯了....誰快來修好我');
  }
}

module.exports = joinActivity;
