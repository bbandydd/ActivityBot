const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/linebot';

mongoose.Promise = global.Promise;
mongoose.connect(dbURI);

const userSchema = new Schema(
  {
    userId: String,
    paymentRecord: Array,
    isPresident: Boolean,
  }, {
    timestamps: true,
  },
);

const activitySchema = new Schema(
  {
    location: String,
    startTime: String,
    endTime: String,
    date: Date,
    creatorId: String,
    dueTime: Date,
    userList: Array,
  }, {
    timestamps: true,
  },
);

const chatSchema = new Schema(
  {
    userId: String,
    intentJsonStr: mongoose.Schema.Types.Mixed,
  }, {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);
const Activity = mongoose.model('Activity', activitySchema);
const Chat = mongoose.model('Chat', chatSchema);

module.exports = {
  User,
  Activity,
  Chat,
};
