const createActivity = (event, result) => {
  console.log(result);
  const entityModel = global.entityModel;
  if (!entityModel.location) {
    event.reply('請輸入地點！');
  } else if (!entityModel['activityTime::activityStartTime'] || !entityModel['activityTime::activityEndTime']) {
    event.reply('請輸入起迄時間！');
  } else {
    event.reply(`location: ${entityModel.location} startTime: ${entityModel['activityTime::activityStartTime']} endTime: ${entityModel['activityTime::activityEndTime']}`);
  }
};

module.exports = createActivity;
