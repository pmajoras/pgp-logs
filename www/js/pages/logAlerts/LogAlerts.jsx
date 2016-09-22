'use strict';
import React from 'react';
import LogAlertsStore from '../../stores/log-alerts/LogAlertsStore';
import LogAlertsActions from '../../actions/log-alerts/LogAlertsActions';
import reactIdGenerator from '../../helpers/react-id-generator';
import reactColorGenerator from '../../helpers/react-color-generator';
import {HorizontalBar} from 'react-chartjs-2';

import Loader from "react-loader";
import AppPanel from '../../components/common/AppPanel.jsx';
import autobind from 'autobind-decorator';
const store = LogAlertsStore;

export default class LogAlerts extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      listState: store.getState()
    };
  }

  componentWillMount() {
    store.addChangeListener(this.handleListChangeState);
  }

  componentWillUnmount() {
    store.removeChangeListener(this.handleListChangeState);
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    LogAlertsActions.getLogAlerts();
    this.interval = setInterval(() => {
      LogAlertsActions.getLogAlerts();
    }, 60000);
  }

  @autobind
  handleListChangeState() {
    this.setState({
      listState: store.getState(),
      hasError: store.hasError(),
      isLoading: store.isLoading()
    });
  }

  render() {
    let hasError = this.state.hasError;
    let isLoading = this.state.isLoading;
    if (isLoading === true) {
      return (<Loader loaded={!isLoading}></Loader>);
    }

    if (hasError === true) {
      return (<GenericError></GenericError>);
    }

    let data = this.state.listState.get('data').toJS();

    let alerts = data.map((logAlert) => {
      let applicationTitle = 'Application - ' + logAlert.appId;
      let barData = {
        labels: logAlert.alerts.map((alert) => alert.name),
        datasets: [
          {
            label: applicationTitle,
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            data: logAlert.alerts.map((alert) => alert.quantity)
          }]
      };

      let barOptions = {
        scales: {
          xAxes: [{
            ticks: {
              max: Math.max.apply(Math, logAlert.alerts.map((alert) => alert.quantity)),
              min: 0,
              stepSize: 1
            }
          }]
        }
      };

      return (

        <div class="col-sm-3" key={reactIdGenerator.getId() }>
          <AppPanel headerMessage={applicationTitle}>
            <div>
              <HorizontalBar data={barData} options={barOptions}/>
            </div>
          </AppPanel>
        </div>)
    });
    return (
      <div class="row">
        {alerts}
      </div>
    );
  }
}
