'use strict';
const nodemailer = require('nodemailer');
const config = require('../config/config');
const Q = require('q');
const transporter = nodemailer.createTransport(config.emailConnection);

const defaultMailOptions = {
  from: '"PGP-LOGS-TEST" <poffaltest@gmail.com>'
};

function sendMail(options) {
  let deferred = Q.defer();
  options = options || {};
  options.from = defaultMailOptions.from;

  transporter.sendMail(options, function (err, info) {
    if (err) {
      deferred.reject(err);
    }
    else {
      deferred.resolve(info);
    }
  });

  return deferred.promise;
}

let templateContentMessage = 'Message: [MESSAGE]<br/>';
let templateMessage = `There was a message that trigerred the alert [ALERT] of the application [APPLICATION].<br/><br/>${templateContentMessage}`;

module.exports = {
  sendMail: sendMail,
  sendAlertsEmail: function (aplicationName, alertsToSendEmail) {

    if (Array.isArray(alertsToSendEmail)) {
      if (alertsToSendEmail.length > 10) {
        sendMail({
          to: alertsToSendEmail[0].alert.emailList,
          subject: 'PGP-LOGS GENERATED ALERT - ' + aplicationName,
          html: `There was generated ${alertsToSendEmail.length}!!<br/><br/>Please go to the application site to check what is the problem.`
        });
      }
      else {
        alertsToSendEmail.forEach((alertToSendEmail) => {
          let alert = alertToSendEmail.alert;
          let logAlert = alertToSendEmail.logAlert;

          sendMail({
            to: alert.emailList,
            subject: 'PGP-LOGS GENERATED ALERT - ' + alert.name,
            html: templateMessage.replace('[ALERT]', alert.name).replace('[APPLICATION]', aplicationName).replace('[MESSAGE]', logAlert.message)
          });
        });
      }
    }
  }
};
