'use strict';
import dispatcher from '../../dispatcher';
import ActionResponse from '../ActionResponse';

var actions = {
  registerForm: 'REGISTER_FORM',
  unRegisterForm: 'UNGESITER_FORM',
  submitForm: 'SUBMIT_FORM'
};

module.exports = {
  actions: actions,
  authenticate: function (authenticateModel) {
    let service = new AuthenticationService();

    service.authenticate(authenticateModel)
      .then((data) => {

        dispatcher.dispatch(new ActionResponse(null, actions.authenticate, data));
      }, (err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.authenticate));
      });
  },
  logoff: function () {
    let service = new AuthenticationService();

    service.logoff();
    dispatcher.dispatch(new ActionResponse(null, actions.logoff));
  }
};
