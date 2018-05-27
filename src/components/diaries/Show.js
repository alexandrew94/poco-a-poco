import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import moment from 'moment';

class diariesShow extends React.Component {
  state = {
    mode: 'show',
    entry: {},
    editedEntry: {}
  }

  componentDidMount() {
    this.generateDisplayDate(moment());
    this.setState({ entry: this.props.data, editedEntry: this.props.data });
  }

  handleShowDetails = () => {
    this.setState({ mode: 'details' });
  }

  handleCloseDetails = () => {
    this.setState({ mode: 'show' });
  }

  handleOpenEditMode = () => {
    this.setState({ mode: 'edit', editedEntry: this.state.entry });
  }

  handleCloseEditMode = e => {
    e.preventDefault();
    this.setState({ mode: 'show', editedEntry: {} });
  }

  handleChange = ({ target: { name, value } }) => {
    name === 'timeLogged' ? this.generateDisplayDate(value) : null;
    this.setState({ editedEntry: { ...this.state.editedEntry, [name]: value }});
  }

  handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`/api/users/${Auth.getPayload().sub}/pieces/${this.props.pieceId}/diary/${this.state.editedEntry._id}`, this.state.editedEntry,
        { headers: { Authorization: `Bearer ${Auth.getToken()}` }})
      .then(res => {
        this.setState({ mode: 'show', entry: res.data });
      });
  }

  handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`/api/users/${Auth.getPayload().sub}/pieces/${this.props.pieceId}/diary/${this.state.editedEntry._id}`,
        { headers: { Authorization: `Bearer ${Auth.getToken()}` }})
      .then(() => {
        this.setState({ mode: 'show', entry: {} });
        this.props.componentDidMount();
      });
  }

  generateDiaryDisplayDate(date) {
    if (moment(date).calendar().match(/\//)) {
      return `On ${moment(date).calendar()}`;
    }
    return moment(date).calendar().split(' at')[0];
  }

  generateDisplayDate(date) {
    this.setState({ displayDate: moment(date).calendar().split(' at')[0] });
  }

  render() {
    return(
      <div>
        { this.state.mode === 'show' &&
          <div>
            {this.state.entry &&
              <div>
                <h4>{this.generateDiaryDisplayDate(this.state.entry.timeLogged)}, you practiced {this.state.entry.timePracticed} mins</h4>
                <p>{this.state.entry.shortNotes}</p>
                <button onClick={this.handleShowDetails}>Show details</button>
              </div>
            }
          </div>
        }
        { this.state.mode === 'details' &&
          <div>
            {this.state.entry &&
              <div>
                <h4>{this.generateDiaryDisplayDate(this.state.entry.timeLogged)}, you practiced {this.state.entry.timePracticed} mins</h4>
                <p>{this.state.entry.notes}</p>
                <button onClick={this.handleOpenEditMode}>Edit this entry</button>
                <button onClick={this.handleCloseDetails}>Close details</button>
              </div>
            }
          </div>
        }
        { this.state.mode === 'edit' &&
          <form>
            <input type="date" name='timeLogged' value={this.state.editedEntry.timeLogged} onChange={this.handleChange}/>
            { this.state.displayDate &&
              <small>({this.state.displayDate})</small>
            }
            <input name='timePracticed' value={this.state.editedEntry.timePracticed} onChange={this.handleChange}/>
            <textarea name='notes' value={this.state.editedEntry.notes} onChange={this.handleChange}/>
            <button onClick={this.handleSubmit}>Save changes</button>
            <button onClick={this.handleDelete}>Delete this entry</button>
            <button onClick={this.handleCloseEditMode}>Close without saving</button>
          </form>
        }
      </div>
    );
  }
}

export default diariesShow;
