'use strict';
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Modal } from 'react-bootstrap';
import ToolbarColumn from '../../components/custom-table/ToolbarColumn.jsx';
import autobind from 'autobind-decorator';
import reactIdGenerator from '../../helpers/react-id-generator';

class AlertRule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: this.props.rule
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rule !== this.state.rule) {
      this.setState({ rule: nextProps.rule });
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

    return (
      <div>
        <div class="row">
          <div class={`col-xs-4 form-group ${rule.expectedValue ? '' : 'has-error'}`}>
            <label class="control-label">Valor Esperado</label>
            <input ref="expectedValueInput" type="text" value={rule.expectedValue} onChange={this.handleInputChange} data-prop-name="expectedValue" class="form-control" placeholder="Valor Esperado"></input>
          </div>
          <div class={`col-xs-4 form-group ${rule.operator ? '' : 'has-error'}`}>
            <label class="control-label">Operador</label>
            <select class="form-control" onChange={this.handleInputChange} data-prop-name="operator" value={rule.operator}>
              <option value="contains">
                Contains
              </option>
              <option value="equals">
                Equals
              </option>
            </select>
          </div>
          <div class="col-xs-4">
          </div>
        </div>
      </div>
    );
  }
}

AlertRule.propTypes = {
  rule: React.PropTypes.object.isRequired,
  autoFocus: React.PropTypes.bool
};

export default AlertRule;
