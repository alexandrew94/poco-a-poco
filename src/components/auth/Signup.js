import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class Signup extends React.Component {

  state = {};

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
        <button>Sign Up</button>
      </form>
    );
  }
}

export default Signup;
