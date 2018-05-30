import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Auth from '../../lib/Auth';

class diariesCreate extends React.Component {

  state = {
    displayDate: null,
    expandedMode: false,
    newEntry: {
      timeLogged: moment().format('YYYY-MM-DD')
    }
  }

  componentDidMount() {
    this.generateDisplayDate(moment());
  }

  handleChange = ({ target: { name, value } }) => {
    if (name === 'timeLogged') {
      this.setState({ newEntry: { ...this.state.newEntry, displayDate: this.generateDisplayDate(value)}});
    }
    this.setState({ newEntry: { ...this.state.newEntry, [name]: value }});
  }

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`/api/users/${Auth.getPayload().sub}/pieces/${this.props.pieceId}/diary`,
        this.state.newEntry,
        { headers: { Authorization: `Bearer ${Auth.getToken()}` }})
      .then(() => {
        this.closeExpandedMode();
        this.props.componentDidMount();
        this.setState({ newEntry: {} });
      });
  }

  openExpandedMode = e => {
    e.preventDefault();
    this.setState({ expandedMode: true });
  }

  closeExpandedMode = e => {
    e ? e.preventDefault() : null;
    this.setState({ expandedMode: false, newEntry: { ...this.state.newEntry, notes: '' }});
  }

  generateDisplayDate(date) {
    this.setState({ displayDate: moment(date).calendar().split(' at')[0] });
  }

  render () {
    return(
      <div className="diary-create">
        <form>
          <div className="input-section">
            <label htmlFor="timeLogged">Date Practiced:</label>
            <input type="date" name="timeLogged" onChange={this.handleChange} value={moment().format('YYYY-MM-DD')}/>
            { this.state.displayDate &&
              <small>({this.state.displayDate})</small>
            }
          </div>
          <div className="input-section">
            <label htmlFor="timePracticed">Minutes Practiced:</label>
            <input name="timePracticed" placeholder="Minutes Practiced" onChange={this.handleChange} value={this.state.newEntry.timePracticed || ''}/>
            { !this.state.expandedMode &&
              <button className="button" onClick={this.openExpandedMode}>
                <i className="fas fa-book"></i>
                &nbsp;
                Include Practice Notes
              </button>
            }
          </div>
          { this.state.expandedMode &&
            <div className="practice-notes">
              <textarea name="notes" placeholder="Practice Notes" onChange={this.handleChange} value={this.state.newEntry.notes || ''}/>
              <button onClick={this.closeExpandedMode}>
                <i className="fas fa-times"></i>
                &nbsp;
                Don&apos;t include practice notes
              </button>
            </div>
          }
          <button className="button" onClick={this.handleSubmit}>
            <i className="fas fa-check"></i>
            &nbsp;
            Submit new entry
          </button>
        </form>
      </div>
    );
  }
}

export default diariesCreate;
