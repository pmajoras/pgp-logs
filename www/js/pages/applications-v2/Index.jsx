'use strict';
import React from 'react';
import ApplicationsListContainer from './ApplicationsListContainer.jsx';
import AppPanel from '../../components/common/AppPanel.jsx';
import * as messageHelper from '../../helpers/message-helper';

export default class ApplicationsIndex extends React.Component {
  render() {
    let headerMessage = messageHelper.get('APPLICATIONS_HEADER');

    return (
      <AppPanel headerMessage={headerMessage} headerSize="lg">
        <ApplicationsListContainer>
        </ApplicationsListContainer>
      </AppPanel>
    );
  }
}
