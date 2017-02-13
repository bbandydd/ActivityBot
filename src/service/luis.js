const request = require('request-promise');

const LUIS_API_URL = process.env.LUIS_API_URL;

function getIntent(message) {
  const options = {
    uri: LUIS_API_URL,
    qs: {
      q: message,
    },
    json: true,
  };

  return request(options);
}

module.exports.getIntent = getIntent;
