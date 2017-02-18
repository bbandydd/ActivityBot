function getPosibleNumbers(array) {
  return array.reduce(function(previous, element) {
    const inPrevious = previous.find(function(inPrevious){
      return inPrevious === element.entity;
    });
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

  const filteredNumberTypeEntity = entities.filter(item => item.type === 'builtin.number');
  if (filteredNumberTypeEntity.length > 1) {
    const PosibleApplicantsNumber = getPosibleNumbers(filteredNumberTypeEntity);
    event.reply(`幾位要參加? ${PosibleApplicantsNumber.join(', ')} ?`);
    return;
  }

  console.log('filteredNumberTypeEntity', filteredNumberTypeEntity);
  let instance = {
    userId: event.source.userId,
    number: filteredNumberTypeEntity.length ? Number(filteredNumberTypeEntity[0].entity) : 1,
    isLeave: false,
  };

  // console.log('instance',instance)
  // TODO 怎麼得到正確的活動名稱？ 
  // const querysetT = {'_id':'9TBRcDPqcx5QRUMI'}
  // const activityT = await this.db.activities.findOne(queryset);
  // console.log('-----------',activityT.userList);
  // console.log('-----------------------------------------------------');
  const queryset = {'location':'鼓岩國小'}
  const activity = await this.db.activities.findOne(queryset);
  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@',activity.length);
  if (!activity) {
    event.reply('沒有這個活動，參加活動失敗！');
    return;
  }

  // TODO nedb怎麼update????
  // const newActivity = { ...activity, userList: [...activity.userList, instance] };
  const response = await this.db.activities.update({ _id: activity._id }, { $set: { userList: [...activity.userList, instance] } }, {});
  event.reply(response.err ? '參加活動失敗！' : '參加活動成功！');
  // event.reply(`意圖：${result.topScoringIntent.intent} 機率： ${result.topScoringIntent.score}`);
}

module.exports = joinActivity;
