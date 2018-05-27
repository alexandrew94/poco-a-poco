import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Auth from '../../lib/Auth';

class diariesCreate extends React.Component {

  state = {
    displayDate: null,
    expandedMode: false,
    newEntry: {}
  }

  componentDidMount() {
    this.generateDisplayDate(moment());
  }

  handleChange = ({ target: { name, value } }) => {
    name === 'timeLogged' ? this.generateDisplayDate(value) : null;
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
      <div>
        <form>
          <input type="date" name="timeLogged" onChange={this.handleChange} value={moment().format('YYYY-MM-DD')}/>
          { this.state.displayDate &&
            <small>({this.state.displayDate})</small>
          }
          <input name="timePracticed" placeholder="Time Practiced" onChange={this.handleChange} value={this.state.newEntry.timePracticed || ''}/>
          { !this.state.expandedMode &&
            <button onClick={this.openExpandedMode}>Include practice notes</button>
          }
          { this.state.expandedMode &&
            <div>
              <textarea name="notes" placeholder="Practice Notes" onChange={this.handleChange} value={this.state.newEntry.notes || ''}/>
              <button onClick={this.closeExpandedMode}>Don&apos;t include practice notes</button>
            </div>
          }
          <button onClick={this.handleSubmit}>Submit new entry</button>
        </form>
      </div>
    );
  }
}

export default diariesCreate;
