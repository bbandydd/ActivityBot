const Datastore = require('nedb');

const db = new Datastore();
db.users = new Datastore({ filename: 'database/users.db', autoload: true });
db.activities = new Datastore({ filename: 'database/activities.db', autoload: true });
db.chats = new Datastore({ filename: 'database/chats.db', autoload: true });

const dbOperation = (table, doc, opt) =>
  new Promise((resolve, reject) =>
    table[opt](doc, (err, newDoc) => (err ? reject(err) : resolve({ err, newDoc }))));

db.insert = (table, doc) => dbOperation(table, doc, 'insert');
db.find = (table, doc) => dbOperation(table, doc, 'find');
db.findOne = (table, doc) => dbOperation(table, doc, 'findOne');
db.count = (table, doc) => dbOperation(table, doc, 'count');
db.update = (table, doc) => dbOperation(table, doc, 'update');
db.remove = (table, doc) => dbOperation(table, doc, 'remove');

module.exports = db;
