const Datastore = require('nedb-promise');

const db = new Datastore();
const defaultParameter = {
  autoload: true,
  timestampData: true,
};
db.users = new Datastore({
  filename: 'database/users.db',
  ...defaultParameter,
});
db.activities = new Datastore({
  filename: 'database/activities.db',
  ...defaultParameter,
});
db.chats = new Datastore({
  filename: 'database/chats.db',
  ...defaultParameter,
});

module.exports = db;
