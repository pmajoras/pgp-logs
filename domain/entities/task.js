"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = Schema({
  changedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  taskList: { type: Schema.Types.ObjectId, ref: 'TaskList' }
});

// set up a mongoose model
module.exports = mongoose.model('Task', new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  taskList: { type: Schema.Types.ObjectId, ref: 'TaskList' },
  history: [historySchema],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}));