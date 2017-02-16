const LineBot = require('linebot');
const database = require('./database');

class LineBotDB extends LineBot {
  constructor(options) {
    console.log('good');
    super(options);
    this.db = database;
  }
}

module.exports = LineBotDB;
