import React from 'react';
import ReactDom from 'react-dom';
import { inject, observer } from 'mobx-react';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';

/**
 * Display a simple view into your blood pressure
 */
@inject('commonStore', 'bpStore')
@observer
export default class ChartBPOverTime extends React.Component {

  render(){

    const sysValues = this.props.bpStore.sysByDateValues.reverse();
    const diaValues = this.props.bpStore.diaByDateValues.reverse();
    const pulseValues = this.props.bpStore.pulseByDateValues.reverse();

    const chartConfig = {
      title: {
        text: 'BP Over Time'
      },
      tooltip: {
        formatter: function() {
          return moment(this.x).format("YYYY-MM-DD HH:mm").toString();
        }
      },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter: function() {
            return moment(this.value).format("YYYY-MM-DD");
          }
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Value'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          }
        }
      },

      series: [
        {
          name: 'Sys',
          data: sysValues
        },
        {
          name: 'Dia',
          data: diaValues
        },
        {
          name: 'Pulse',
          data: pulseValues
        }
      ],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    };
    return(
      <div id="ChartBPOverTime">
        <ReactHighcharts config={chartConfig}></ReactHighcharts>
      </div>
    );
  }
}