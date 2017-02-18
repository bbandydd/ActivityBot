const LineBot = require('linebot');
const database = require('./database');

class LineBotDB extends LineBot {
  constructor(options) {
    super(options);
    this.db = database;
  }
}

module.exports = LineBotDB;
