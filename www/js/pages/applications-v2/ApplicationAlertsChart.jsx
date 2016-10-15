'use strict';
import React, { PropTypes } from 'react';
import * as ReactDOM from 'react-dom';
import * as messageHelper from '../../helpers/message-helper';
import reactColorGenerator from '../../helpers/react-color-generator';
import autobind from 'autobind-decorator';
import { Pie } from 'react-chartjs-2';
const noDataMessage = messageHelper.get('ALERTS_NO_DATA');

const propTypes = {
  alerts: React.PropTypes.object.isRequired,
  onChartClick: React.PropTypes.func
};

class ApplicationAlertsChart extends React.Component {
    constructor(props){
      super(props);
    }

    shouldComponentUpdate(nextProps) {
      console.log('ApplicationAlertsChart >> shouldComponentUpdate >> Start');
      console.log('ApplicationAlertsChart >> shouldComponentUpdate >>', this.props.alerts !== nextProps.alerts);
      console.log('ApplicationAlertsChart >> shouldComponentUpdate >> Finish');
      return this.props.alerts !== nextProps.alerts;
    }

    getChartOptions() {
        console.log('ApplicationAlertsChart >> getChartOptions >> Start');
        let options = {};
        options.hover = {
            onHover: this.handleChartHover
        };
        console.log('ApplicationAlertsChart >> getChartOptions >> Finish');
        return options;
    }

    getChartData(alertData) {
      console.log('ApplicationAlertsChart >> getChartData >> Start');
      let colors = alertData.map(() => reactColorGenerator.getRandomColor());
      let hoverColors = colors.map((color) => color + '99');
      let pieData = {
        labels: alertData.map((alert) => alert.name),
        datasets: [
          {
            backgroundColor: colors,
            borderColor: colors,
            hoverBackgroundColor: hoverColors,
            hoverBorderColor: hoverColors,
            borderWidth: 1,
            data: alertData.map((alert) => alert.count)
          }]
      };
      console.log('ApplicationAlertsChart >> getChartData >> Finish');
      return pieData;
    }

    @autobind
    handleChartClick(elements) {
      console.log('ApplicationAlertsChart >> handleChartClick >> Start', elements);
      let alerts = this.props.alerts.toJS();
      if (typeof this.props.onChartClick === 'function' && elements.length > 0) {
        this.props.onChartClick(alerts[elements[0]._index]);
      }
      console.log('ApplicationAlertsChart >> handleChartClick >> Finish');
    }

    @autobind
    handleChartHover(elements) {
      if (this.refs.chartContainer) {
        let domElement = ReactDOM.findDOMNode(this.refs.chartContainer);
        if (Array.isArray(elements) && elements.length > 0) {
          domElement.style.cursor = 'pointer';
        }
        else {
          domElement.style.cursor = '';
        }
      }
    }

    render() {
      console.log('ApplicationAlertsChart >> render >> Start');
      let content;
      let alertData = this.props.alerts.toJS();
      let higherValue = Math.max.apply(Math, alertData.map((alert) => alert.count));

      if (higherValue > 0) {
        content = (<Pie data={this.getChartData(alertData)} onElementsClick={this.handleChartClick} options={this.getChartOptions()} />);
      }
      else {
        content = (<h2>{noDataMessage}</h2>);
      }

      console.log('ApplicationAlertsChart >> render >> Finish');
      return (<div>
                <div ref="chartContainer">
                  {content}
                </div>
              </div>);
    }
}


ApplicationAlertsChart.propTypes = propTypes;
export default ApplicationAlertsChart;
