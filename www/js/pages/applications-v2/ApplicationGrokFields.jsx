'use strict';
import React from 'react';
import autobind from 'autobind-decorator';
import * as messageHelper from '../../helpers/message-helper';
const noGrokFieldsMessage = messageHelper.get('NO_GROK_FIELDS');
const patternMessage = messageHelper.get('GORK_FIELDS_PATTERN');
const fieldMessage = messageHelper.get('FIELD');

const propTypes = {
  alert: React.PropTypes.array.isRequired,
  logPattern: React.PropTypes.string.isRequired
};

class ApplicationGrokFields extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    console.log('ApplicationGrokFields >> shouldComponentUpdate >> Start');
    console.log('ApplicationGrokFields >> shouldComponentUpdate >>', this.props.fields !== nextProps.fields);
    console.log('ApplicationGrokFields >> shouldComponentUpdate >> Finish');
    return this.props.fields !== nextProps.fields || this.props.logPattern !== nextProps.logPattern;
  }

  render() {
    console.log('ApplicationGrokFields >> render >> Start');
    let content = null;
    let fields = this.props.fields;

    if (fields && fields.length > 0) {
      content = (fields.map((field, index) => <h4 key={index}>{fieldMessage + ': '}<span class="label label-info">{field}</span></h4>));
    }
    else {
      content = <h4><span class="label label-warning">{noGrokFieldsMessage}</span></h4>;
    }

    console.log('ApplicationGrokFields >> render >> Finish');
    return (
      <div>
        <h4>
          {patternMessage + ': '} <span style={{ wordBreak: 'break-all', whiteSpace: 'normal' }} class="label label-info">{this.props.logPattern}</span>
        </h4>
        <div>
          {content}
        </div>
      </div>
    );
  }
}

ApplicationGrokFields.PropTypes = propTypes;

export default ApplicationGrokFields;
