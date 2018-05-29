import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Auth from '../../lib/Auth';

class Signup extends React.Component {

  state = {
    instruments: [],
    accountCreated: moment().format('YYYY-MM-DD')
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('/api/signup', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
      })
      .then(() => this.props.history.push('/profile'))
      .catch(() => {
        this.props.handleRedirect();
      });
  }

  handleInstrumentClick = ({ target: { value } }) => {
    if (this.state.instruments.map(instrument => instrument.name).includes(value)) {
      const newInstrumentArray = this.state.instruments.filter(instrument => {
        return instrument.name !== value;
      });
      return this.setState({ instruments: newInstrumentArray });
    }
    return this.setState({ instruments: [ ...this.state.instruments, { name: value }]});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={this.handleChange}
        />
        <input
          className="input"
          name="email"
          placeholder="Email"
          onChange={this.handleChange}
        />
        <input
          type="password"
          className="input"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <input
          type="password"
          className="input"
          name="passwordConfirmation"
          placeholder="Password Confirmation"
          onChange={this.handleChange}
        />
        <div>
          <h4>Select your instruments:</h4>
          <label><input onClick={this.handleInstrumentClick} type="checkbox" value="piano"/>Piano</label>
          <label><input onClick={this.handleInstrumentClick} type="checkbox" value="violin"/>Violin</label>
          <label><input onClick={this.handleInstrumentClick} type="checkbox" value="guitar"/>Guitar</label>
          <label><input onClick={this.handleInstrumentClick} type="checkbox" value="voice"/>Voice</label>
        </div>
        <button>Sign Up</button>
      </form>
    );
  }
}

export default Signup;
