'use strict';
import React from 'react';
import LogAlertsModal from './LogAlertsModal.jsx';
import autobind from 'autobind-decorator';
import LogAlertsStore from '../../stores/log-alerts/LogAlertsStore';
import LogAlertsActions from '../../actions/log-alerts/LogAlertsActions';

const store = LogAlertsStore;

class LogAlertsIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listState: store.getState(),
      isLoading: true,
      hasError: false
    };
  }

  componentWillMount() {
    console.log('LogAlertsIndex >> componentWillMount >> Start');
    store.addChangeListener(this.handleListChangeState);
    console.log('LogAlertsIndex >> componentWillMount >> Finish');
  }

  componentWillUnmount() {
    console.log('LogAlertsIndex >> componentWillUnmount >> Start');
    store.removeChangeListener(this.handleListChangeState);
    console.log('LogAlertsIndex >> componentWillUnmount >> Finish');
  }

  componentDidMount() {
    console.log('LogAlertsIndex >> componentDidMount >> Start');
    LogAlertsActions.getLogAlertsByAlertId(this.props.params.alertId);
    console.log('LogAlertsIndex >> componentDidMount >> Finish');
  }

  @autobind
  handleListChangeState() {
    console.log('LogAlertsIndex >> handleListChangeState >> Start');

    this.setState({
      listState: store.getState(),
      hasError: store.hasError(),
      isLoading: store.isLoading()
    });

    console.log('LogAlertsIndex >> handleListChangeState >> Finish');
  }

  render() {
    let data = this.state.listState.get('data');
    let isLoading = this.state.isLoading;

    return (
      <LogAlertsModal isLoading={isLoading} logAlerts={data}>
      </LogAlertsModal>
    );
  }
}

LogAlertsIndex.propTypes = {
  params: React.PropTypes.object
};

export default LogAlertsIndex;
