"use strict";
var jwt = require('jsonwebtoken');
var config = require('../../config/config');

/**
 * 
 */
function setup(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.param('token') || req.headers.authentication;
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (!err) {
        req.currentUser = decoded;
      }
      next();
    });
  }
  else {
    next();
  }
}


module.exports = setup;