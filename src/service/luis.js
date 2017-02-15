const request = require('request-promise');

const LUIS_API_URL = process.env.LUIS_API_URL;

const entityParser = (entities) => {
  const entityObject = {};
  entities.forEach((entity) => {
    if (entity.type === 'builtin.datetime.date') {
      entityObject[entity.type] = entity.resolution.date;
    } else {
      entityObject[entity.type] = entity.entity;
    }
  });
  return entityObject;
};

const getIntent = (message) => {
  const options = {
    uri: LUIS_API_URL,
    qs: {
      q: message,
    },
    json: true,
  };

  return new Promise((resolve, reject) => {
    request(options).then((result) => {
      const newResult = { ...result };
      newResult.entityObject = entityParser(result.entities);
      console.log(newResult)
      resolve(newResult);
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports.getIntent = getIntent;

// parset object example
// {
//     query: '建立活動明天晚上18:00~20:00地點在鼓岩國小',
//     topScoringIntent: {
//         intent: 'createActivity',
//         score: 0.9973083
//     },
//     entities: [{
//             entity: '鼓岩國小',
//             type: 'location',
//             startIndex: 22,
//             endIndex: 25,
//             score: 0.5305414
//         },
//         {
//             entity: '18 : 00',
//             type: 'activityTime::activityStartTime',
//             startIndex: 8,
//             endIndex: 12,
//             score: 0.9365271
//         },
//         {
//             entity: '20 : 00',
//             type: 'activityTime::activityEndTime',
//             startIndex: 14,
//             endIndex: 18,
//             score: 0.8650926
//         },
//         {
//             entity: '18',
//             type: 'builtin.number',
//             startIndex: 8,
//             endIndex: 9,
//             score: 0.9862837
//         },
//         {
//             entity: '00',
//             type: 'builtin.number',
//             startIndex: 11,
//             endIndex: 12,
//             score: 0.9823223
//         },
//         {
//             entity: '20',
//             type: 'builtin.number',
//             startIndex: 14,
//             endIndex: 15,
//             score: 0.9808646
//         },
//         {
//             entity: '00',
//             type: 'builtin.number',
//             startIndex: 17,
//             endIndex: 18,
//             score: 0.9878207
//         },
//         {
//             entity: '明天',
//             type: 'builtin.datetime.date',
//             startIndex: 4,
//             endIndex: 5,
//             resolution: [Object]
//         },
//         {
//             entity: '晚上 18:00 20:00 地點',
//             type: 'builtin.datetime.time',
//             resolution: [Object]
//         },
//         {
//             entity: '晚上 18:00 20:00 地點',
//             type: 'builtin.datetime.time',
//             resolution: [Object]
//         }
//     ],
//     entityObject: {
//         location: '鼓岩國小',
//         'activityTime::activityStartTime': '18 : 00',
//         'activityTime::activityEndTime': '20 : 00',
//         'builtin.number': '00',
//         'builtin.datetime.date': '2017-02-16',
//         'builtin.datetime.time': '晚上 18:00 20:00 地點'
//     }
// }