'use strict';

const messages = require('../messages/messages');

module.exports = {
  get: function(key) {
    let messageValue = messages[key];
    return messageValue || '';
  }
};
