import React from 'react';
import moment from 'moment';
import Chart from 'chart.js';

class LineGraph extends React.Component {

  state = {
    daysDisplayed: null
  }

  componentDidMount = () => {
    !this.state.daysDisplayed ? this.setState({ daysDisplayed: this.handleAllTimeDates() }) : null;
  }

  componentDidUpdate = () => {

    const labels = [];
    for (var i = (this.state.daysDisplayed - 1); i >= 0; i--) {
      labels.push(moment().subtract(i, 'days').format('YYYY-MM-DD'));
    }

    const data = [];
    labels.forEach(date => {
      if (this.props.piece.diary.find(entry => entry.timeLogged === date)) {
        let timingForOneDate = 0;
        this.props.piece.diary.forEach(entry => {
          entry.timeLogged === date ? timingForOneDate += entry.timePracticed : null;
        });
        return data.push(timingForOneDate);
      } else {
        return data.push(0);
      }
    });

    const ctx = document.getElementById('piece-line').getContext('2d');
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
              'blue'
            ],
            borderColor: [
              'rgba(255,99,132,1)'
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
    this.setState({ ...this.state, daysDisplayed: value }, () => this.componentDidMount());
  }

  handleAllTimeDates = () => {
    const a = moment(this.props.piece.startedAt);
    const b = moment();
    return Math.abs(a.diff(b, 'days')) + 1;
  }

  render() {
    return <div>
      { this.state.daysDisplayed && <canvas id="piece-line"></canvas>}
      <button onClick={this.handleGraphDates} value={30}>Show last 30 days</button>
      <button onClick={this.handleGraphDates} value={7}>Show last 7 days</button>
      <button onClick={this.handleGraphDates} value={this.handleAllTimeDates()}>Show all time</button>
    </div>;
  }

}

export default LineGraph;
