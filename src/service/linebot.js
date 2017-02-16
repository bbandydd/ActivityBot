const LineBot = require('linebot');

const database = 'this is database';

class LineBotDB extends LineBot {
  constructor(options) {
    console.log('good');
    super(options);
    this.db = database;
  }
}

module.exports = LineBotDB;
