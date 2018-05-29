import React from 'react';
import moment from 'moment';
import Chart from 'chart.js';

class LineGraph extends React.Component {

  state = {
    daysDisplayed: null,
    mode: 'all time'
  }

  componentDidMount = () => {
    this.setState({ ...this.state, daysDisplayed: this.handleAllTimeDates()}, () => console.log(this.state));
  }

  componentDidUpdate = () => {

    const labels = [];
    for (var i = (this.state.daysDisplayed - 1); i >= 0; i--) {
      labels.push(moment().subtract(i, 'days').format('YYYY-MM-DD'));
    }

    const data = labels.map(date => {
      if (this.props.user.practiceLog && Object.keys(this.props.user.practiceLog).includes(date)) {
        return this.props.user.practiceLog[date];
      } else {
        return 0;
      }
    });

    const ctx = document.getElementById('line').getContext('2d');
    let myChart = new Chart(ctx, { // eslint-disable-line
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            fill: 'origin',
            label: 'Total Minutes Practiced',
            data: data,
            backgroundColor: [
              '#5fb3ce'
            ],
            borderColor: [
              '#ff5656'
            ],
            borderWidth: 7
          }]
      },
      options: {
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  handleGraphDates = ({ target: { value }}) => {
    this.setState({ ...this.state, daysDisplayed: value });
  }

  handleAllTimeDates = () => {
    const a = moment(this.props.user.accountCreated);
    const b = moment();
    return Math.abs(a.diff(b, 'days')) + 1;
  }

  render() {
    return <div>
      <button className="button is-primary" onClick={this.handleGraphDates} value={30}>
        Show last 30 days
      </button>
      &nbsp;
      <button className="button is-primary" onClick={this.handleGraphDates} value={7}>
        Show last 7 days
      </button>
      &nbsp;
      <button className="button is-primary" onClick={this.handleGraphDates} value={this.handleAllTimeDates()}>
        Show all time
      </button>
      { this.state.daysDisplayed && <div className="chart-container">
        <canvas id="line"></canvas>
      </div> }
    </div>;
  }

}

export default LineGraph;
