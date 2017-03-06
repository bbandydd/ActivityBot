const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/linebot';

mongoose.Promise = global.Promise;
mongoose.connect(dbURI);


const User = mongoose.model('User', {
  userId: String,
  paymentRecord: Array,
  isPresident: Boolean,
});

const Activity = mongoose.model('Activity', {
  location: String,
  startTime: String,
  endTime: String,
  date: Date,
  creatorId: String,
  dueTime: Date,
  userList: Array,
  createTime: Date,
});

const Chat = mongoose.model('Chat', {
  userId: String,
  intentJsonStr: mongoose.Schema.Types.Mixed,
});

module.exports = {
  User,
  Activity,
  Chat,
};
