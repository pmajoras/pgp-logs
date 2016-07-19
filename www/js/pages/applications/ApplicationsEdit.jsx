'use strict';
import React from 'react';
import AppText from '../../components/common/AppText.jsx';
import AppForm from '../../components/common/AppForm.jsx';

export default class ApplicationsEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  render() {

    return (
      <div>
        Teste
        {this.props.params.applicationId}
      </div>
    );
  }
}
