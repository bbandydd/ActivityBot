const Datastore = require('nedb');

const db = new Datastore();
db.users = new Datastore({ filename: 'database/users.db', autoload: true });
db.activities = new Datastore({ filename: 'database/activities.db', autoload: true });

module.exports = db;
