import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Auth from '../../lib/Auth';
import instruments from '../../lib/Instruments';

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
        <div className="columns">
          <div className="column is-half">
            <input
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
            />
          </div>
          <div className="column is-half">
            <input
              className="input"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <input
              type="password"
              className="input password-field"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          <div className="column is-half">
            <input
              type="password"
              className="input password-field"
              name="passwordConfirmation"
              placeholder="Password Confirmation"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div>
          <div className="instrument-choice">
            <h4>Select your instruments:</h4>
            <div className="columns is-multiline">
              { instruments.map((instrument, i) => {
                return <div className="column is-one-quarter" key={i}>
                  <div className="instrument-box">
                    <h4>{instrument.emoji}</h4>
                    <h5>{instrument.name}</h5>
                    <input
                      onClick={this.handleInstrumentClick}
                      type="checkbox"
                      value={instrument.name}
                      name={instrument.name}
                    />
                  </div>
                </div>;
              })}
            </div>
          </div>
          <button className="button sign-up"><i className="fas fa-user-plus"></i>Sign Up</button>
        </div>
      </form>
    );
  }
}

export default Signup;
