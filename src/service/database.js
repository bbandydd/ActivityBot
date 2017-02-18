const Datastore = require('nedb-promise');

const db = new Datastore();
db.users = new Datastore({ filename: 'database/users.db', autoload: true });
db.activities = new Datastore({ filename: 'database/activities.db', autoload: true });
db.chats = new Datastore({ filename: 'database/chats.db', autoload: true });

module.exports = db;
