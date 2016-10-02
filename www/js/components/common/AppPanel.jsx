'use strict';
import React from 'react';

class AppPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const message = this.props.headerMessage || '';
    let containerClasses = 'panel panel-primary';
    if (this.props.classes) {
      containerClasses = containerClasses + ' ' + this.props.classes;
    }
    const headerSize = this.props.headerSize || '';
    let headerContainer = '';

    if (headerSize === 'lg') {
      headerContainer = (<div class="panel-heading"><h1>{message}</h1></div>);
    }
    else if (headerSize === 'md') {
       headerContainer = (<div class="panel-heading"><h2>{message}</h2></div>);
    }
    else if (headerSize === 'sm') {
       headerContainer = (<div class="panel-heading"><h3>{message}</h3></div>);
    }
    else {
      headerContainer = (<div class="panel-heading">{message}</div>);
    }


    return (
      <div class={containerClasses}>
        {headerContainer}
        <div class="panel-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

AppPanel.propTypes = {
  headerMessage: React.PropTypes.string,
  headerSize: React.PropTypes.string,
  classes: React.PropTypes.string
};

export default AppPanel;
