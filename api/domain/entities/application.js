'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const operatorsEnum = {
  CONTAINS: 'contains',
  EQUALS: 'equals'
};
const logicalOperator = {
  AND: 'and',
  OR: 'or'
};

const LogRule = new Schema({
  operator: { type: String, required: true, enum: [operatorsEnum.CONTAINS, operatorsEnum.EQUALS] },
  logicalOperator: { type: String, required: true, enum: [logicalOperator.AND, logicalOperator.OR] },
  ignoreCase: { type: Boolean, required: true, default: false },
  expectedValue: { type: String, required: true }
});

// set up a mongoose model
const ApplicationAlertSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  rules: [LogRule]
});

// set up a mongoose model
module.exports = mongoose.model('Application', new Schema({
  name: { type: String, unique: true, required: true, dropDups: true },
  appId: { type: String, unique: true, required: true, dropDups: true },
  logPattern: [{ type: String, required: true }],
  isActive: { type: Boolean, required: true, default: true },
  isAvailable: { type: Boolean, required: true, default: true },
  description: { type: String, required: false },
  alerts: [ApplicationAlertSchema]
}));
