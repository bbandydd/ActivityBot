const { Wit, log } = require('node-wit');

// generate wit bot
const witBot = new Wit({
  accessToken: process.env.WIT_TOKEN,
  logger: new log.Logger(log.DEBUG), // optional
});

// get intent from wit.ai and parse data as follow rule.
async function getIntent(messageText) {
  const result = await witBot.message(messageText);
  const entities = {};
  Object.keys(result.entities).forEach((entityKey) => {
    entities[entityKey] = result.entities[entityKey][0].value;
  });
  const newResult = { ...result, entities };
  if (!newResult.entities.intent) {
    newResult.entities.intent = 'None';
  }
  return newResult;
}

module.exports = getIntent;

// ==============original data==============
// {
//     "msg_id": "a3978adc-1246-4236-8d30-10577a6f38ea",
//     "_text": "wiwi 有誰要參加活動？",
//     "entities": {
//         "intent": [{
//             "confidence": 0.9040730105760665,
//             "value": "listUsers"
//         }]
//     }
// }
// ==============output data==============
// {
//     "msg_id": "a3978adc-1246-4236-8d30-10577a6f38ea",
//     "_text": "wiwi 有誰要參加活動？",
//     "entities": {
//         "intent": "listUsers"
//     }
// }

// ==============original data==============
// {
//     "msg_id": "566099aa-b0e3-4ae9-9ff1-1f29231afbe4",
//     "_text": "我要參加 10位",
//     "entities": {
//         "number": [{
//             "confidence": 1,
//             "value": 10,
//             "type": "value"
//         }],
//         "intent": [{
//             "confidence": 0.9540202181530716,
//             "value": "joinActivity"
//         }]
//     }
// }
// ==============output data==============
// {
//     "msg_id": "566099aa-b0e3-4ae9-9ff1-1f29231afbe4",
//     "_text": "我要參加 10位",
//     "entities": {
//         "number": 10,
//         "intent": "joinActivity"
//     }
// }
