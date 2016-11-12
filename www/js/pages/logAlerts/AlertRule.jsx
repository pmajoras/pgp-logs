'use strict';
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Modal } from 'react-bootstrap';
import * as messageHelper from '../../helpers/message-helper';
import ToolbarColumn from '../../components/custom-table/ToolbarColumn.jsx';
import autobind from 'autobind-decorator';
import reactIdGenerator from '../../helpers/react-id-generator';

class AlertRule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: this.props.rule,
      fields: this.props.fields || []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rule !== this.state.rule) {
      this.setState({ rule: nextProps.rule });
    }
    if (nextProps.fields !== this.state.fields) {
      this.setState({ fields: nextProps.fields });
    }
  }

  componentDidMount() {
    if (this.state.rule && !this.state.rule.expectedValue && this.props.autoFocus) {
      this.refs.expectedValueInput.getDOMNode().focus();
    }
  }

  @autobind
  handleInputChange(e) {
    let propertyName = e.target.dataset.propName;
    this.state.rule[propertyName] = e.target.value;
    this.setState({ rule: this.state.rule });
  }

  render() {
    let rule = this.state.rule;
    let fields = this.state.fields;
    let fieldsContent = null;

    if (fields.length > 0) {
      fieldsContent = (
        <div class="col-xs-4 form-group">
          <label class="control-label">{messageHelper.get('FIELD')}</label>
          <select class="form-control" onChange={this.handleInputChange} data-prop-name="field" value={rule.field || ''}>
            <option value="">{messageHelper.get('WHOLE_DATA')}</option>
            {fields.map((fieldValue, index) => <option key={index} value={fieldValue}>{messageHelper.get('FIELD') + ' - ' + fieldValue}</option>)}
          </select>
        </div>);
    }

    let fieldsOptions = this.state.fields.map((fieldValue, index) => <option key={index} value={fieldValue}>{fieldValue}</option>);

    return (
      <div>
        <div class="row">
          {fieldsContent}
          <div class={`col-xs-4 form-group ${rule.operator ? '' : 'has-error'}`}>
            <label class="control-label">{messageHelper.get('OPERATOR')}</label>
            <select class="form-control" onChange={this.handleInputChange} data-prop-name="operator" value={rule.operator}>
              <option value="equals">
                Equals
              </option>
              <option value="contains">
                Contains
              </option>
              <option value="higher">
                Higher
              </option>
            </select>
          </div>
          <div class={`col-xs-4 form-group ${rule.expectedValue ? '' : 'has-error'}`}>
            <label class="control-label">{messageHelper.get('EXPECTED_VALUE')}</label>
            <input ref="expectedValueInput" type="text" value={rule.expectedValue} onChange={this.handleInputChange}
              data-prop-name="expectedValue"
              class="form-control"
              placeholder={messageHelper.get('EXPECTED_VALUE')}></input>
          </div>
        </div>
      </div>
    );
  }
}

AlertRule.propTypes = {
  rule: React.PropTypes.object.isRequired,
  autoFocus: React.PropTypes.bool,
  fields: React.PropTypes.array
};

export default AlertRule;
