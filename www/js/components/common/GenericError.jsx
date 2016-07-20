'use strict';
import React from 'react';
import { generic } from '../../messages/messages-pt-br';

export default class GenericError extends React.Component {

  render() {
    return (
      <h2>
        {generic.error}
      </h2>
    );
  }
}
