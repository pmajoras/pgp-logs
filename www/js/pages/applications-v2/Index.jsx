'use strict';
import React from 'react';
import ApplicationsListContainer from './ApplicationsListContainer.jsx';
import autobind from 'autobind-decorator';
import AppPanel from '../../components/common/AppPanel.jsx';
import Loader from "react-loader";
import reactIdGenerator from '../../helpers/react-id-generator';
import * as messageHelper from '../../helpers/message-helper';
import ApplicationsListStore from '../../stores/applications/ApplicationsListStore';
import ApplicationsActions from '../../actions/applications/ApplicationsActions';

const store = ApplicationsListStore;

export default class ApplicationsIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listState: store.getState()
    };
  }

  componentWillMount() {
    console.log('ApplicationsIndex >> componentWillMount >> Start');
    store.addChangeListener(this.handleListChangeState);
    console.log('ApplicationsIndex >> componentWillMount >> Finish');
  }

  componentWillUnmount() {
    console.log('ApplicationsIndex >> componentWillUnmount >> Start');
    store.removeChangeListener(this.handleListChangeState);
    console.log('ApplicationsIndex >> componentWillUnmount >> Finish');
  }

  componentDidMount() {
    console.log('ApplicationsIndex >> componentDidMount >> Start');
    ApplicationsActions.getApplications();
    console.log('ApplicationsIndex >> componentDidMount >> Finish');
  }

  @autobind
  handleListChangeState() {
    console.log('ApplicationsIndex >> handleListChangeState >> Start');

    this.setState({
      listState: store.getState(),
      hasError: store.hasError(),
      isLoading: store.isLoading()
    });

    console.log('ApplicationsIndex >> handleListChangeState >> Finish');
  }

  render() {
    let headerMessage = messageHelper.get('APPLICATIONS_HEADER');
    let data = this.state.listState.get('data');
    let isLoading = this.state.isLoading;
    if (isLoading === true) {
      //return (<Loader loaded={!isLoading}></Loader>);
    }

    return (
      <AppPanel headerMessage={headerMessage} headerSize="lg">
        <ApplicationsListContainer applications={data}>
        </ApplicationsListContainer>
      </AppPanel>
    );
  }
}
