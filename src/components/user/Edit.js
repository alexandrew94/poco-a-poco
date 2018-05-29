import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class Profile extends React.Component {
  state = {
    user: {},
    editedUser: {}
  }

  componentDidMount() {
    axios
      .get(`/api/users/${Auth.getPayload().sub}`, { headers: { Authorization: `Bearer ${Auth.getToken()}` }})
      .then(user => this.setState({ user: user.data, editedUser: user.data }));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ editedUser: { ...this.state.editedUser, [name]: value }});
  }

  handleInstrumentClick = ({ target: { value } }) => {
    if (this.state.editedUser.instruments.map(instrument => instrument.name).includes(value)) {
      const newInstrumentArray = this.state.editedUser.instruments.filter(instrument => {
        return instrument.name !== value;
      });
      return this.setState({ editedUser: { ...this.state.editedUser, instruments: newInstrumentArray }});
    }
    return this.setState({ editedUser: { ...this.state.editedUser, instruments: [ ...this.state.editedUser.instruments, { name: value }]}});
  }

  checkInstrument = value => {
    return this.state.user.instruments.map(instrument => instrument.name).includes(value);
  }

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`/api/users/${Auth.getPayload().sub}/edit`,
        this.state.editedUser,
        { headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
      .then(() => this.props.history.push('/profile'));
  }

  handleClose = () => this.props.history.push('/profile');

  render() {
    return (
      <div>
        <form>
          { this.state.user.username &&
            <div>
              <input
                name="username"
                value={this.state.editedUser.username}
                onChange={this.handleChange}
              />
              <input
                name="email"
                value={this.state.editedUser.email}
                onChange={this.handleChange}
              />
              <div>
                <h4>Select your instruments:</h4>
                <label><input defaultChecked={this.checkInstrument('piano')} onClick={this.handleInstrumentClick} type="checkbox" value="piano"/>Piano</label>
                <label><input defaultChecked={this.checkInstrument('violin')} onClick={this.handleInstrumentClick} type="checkbox" value="violin"/>Violin</label>
                <label><input defaultChecked={this.checkInstrument('guitar')} onClick={this.handleInstrumentClick} type="checkbox" value="guitar"/>Guitar</label>
                <label><input defaultChecked={this.checkInstrument('voice')} onClick={this.handleInstrumentClick} type="checkbox" value="voice"/>Voice</label>
              </div>
              <button onClick={this.handleSubmit}>Save Changes</button>
            </div>
          }
        </form>
        <button onClick={this.handleClose}>Close without saving</button>
      </div>
    );
  }
}

export default Profile;
