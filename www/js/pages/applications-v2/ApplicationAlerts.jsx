'use strict';
import React, { PropTypes } from 'react';
import reactIdGenerator from '../../helpers/react-id-generator';
import * as messageHelper from '../../helpers/message-helper';
import AppPanel from '../../components/common/AppPanel.jsx';
import autobind from 'autobind-decorator';
import AlertsEditModal from '../logAlerts/AlertsEditModal.jsx';
import AlertContainer from './AlertContainer.jsx';
import {HorizontalBar} from 'react-chartjs-2';
import ApplicationsActions from '../../actions/applications/ApplicationsActions';
const emptyMessage = messageHelper.get('ALERTS_EMPTY');
const registerRequestMessage = messageHelper.get('ALERTS_REGISTER_REQUEST');
const alertsCreateMessage = messageHelper.get('ALERTS_CREATE');

const ApplicationAlertsChart = ({ alerts, applicationName, onElementsClick }) => {
  alerts = alerts.toJS();
  let applicationTitle = `Application - ${applicationName}`;
  let barData = {
    labels: alerts.map((alert) => alert.name),
    datasets: [
      {
        label: applicationTitle,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        data: alerts.map((alert) => alert.quantity)
      }]
  };
  let barOptions = {
    scales: {
      xAxes: [{
        ticks: {
          max: Math.max.apply(Math, alerts.map((alert) => alert.quantity)) || 10,
          min: 0,
          stepSize: 1
        }
      }]
    }
  };
  return (<HorizontalBar onElementsClick={onElementsClick} data={barData} options={barOptions}/>);
};

const NoAlertsFound = () => {
  return (<div><h2>{emptyMessage}</h2> <h3>{registerRequestMessage}</h3></div>);
};

const propTypes = {
  alerts: React.PropTypes.object.isRequired,
  fields: React.PropTypes.object
};

class ApplicationAlerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      editingRow: null
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('ApplicationAlerts >> shouldComponentUpdate >> Start');

    let componentShouldUpdate = this.props.alerts !== nextProps.alerts ||
      this.props.fields !== nextProps.fields ||
      this.state.showEditModal !== nextState.showEditModal ||
      this.state.editingRow !== nextState.editingRow;

    console.log('ApplicationAlerts >> shouldComponentUpdate >>', componentShouldUpdate);
    console.log('ApplicationAlerts >> shouldComponentUpdate >> Finish');
    return componentShouldUpdate;
  }

  @autobind
  handleAddClick() {
    console.log('ApplicationAlerts >> handleAddClick >> Start');
    this.setState({
      showEditModal: true,
      editingRow: null
    });
    console.log('ApplicationAlerts >> handleAddClick >> Finish');
  }

  @autobind
  handleEditEnded() {
    console.log('ApplicationAlerts >> handleEditEnded >> Start');
    this.setState({ editingRow: null, showEditModal: false });
    console.log('ApplicationAlerts >> handleEditEnded >> Finish');
  }

  @autobind
  handleSave(alert) {
    console.log('ApplicationAlerts >> handleSave >> Start');
    if (typeof this.props.onSaveAlert === 'function') {
      this.props.onSaveAlert(alert);
    }
    console.log('ApplicationAlerts >> handleSave >> Finish');
  }

  @autobind
  handleChartClick() {
    console.log('ApplicationAlerts >> handleChartClick >> Start');


    console.log('ApplicationAlerts >> handleChartClick >> Finish');
  }

  render() {
    console.log('ApplicationAlerts >> render >> Start', this.props.alerts);
    const alerts = this.props.alerts;
    const fields = this.props.fields ? this.props.fields.toJS() : [];
    const showEditModal = this.state.showEditModal;

    let content;
    if (alerts.size === 0) {
      content = <NoAlertsFound></NoAlertsFound>;
    }
    else {
      content = <ApplicationAlertsChart alerts={alerts} onElementsClick={this.handleChartClick} applicationName={this.props.applicationName}></ApplicationAlertsChart>;
    }

    console.log('ApplicationAlerts >> render >> Finish');
    return (
      <div>
        <div class="margin-bottom">
          <button class="button button-primary button-small" onClick={this.handleAddClick}>
            {alertsCreateMessage}
            <i class="fa fa-plus margin-left" aria-hidden="true"></i>
          </button>
        </div>
        {content}
        <AlertsEditModal alert={this.state.editingRow} fields={fields} onSave={this.handleSave} onEditEnded={this.handleEditEnded} showModal={showEditModal}>
        </AlertsEditModal>
      </div>
    );
  }
}

ApplicationAlerts.propTypes = propTypes;

export default ApplicationAlerts;
