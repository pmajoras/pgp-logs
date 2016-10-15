'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('LogAlert', new Schema({
  alertId: { type: Schema.Types.ObjectId, required: true },
  appId: { type: String, required: true },
  message: [{ type: String, required: true }],
  logId: { type: String, required: true },
  compiledMessage: { type: Schema.Types.Mixed },
  alertDate: { type: Date, required: true, default: new Date() },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}));
