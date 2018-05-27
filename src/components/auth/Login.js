import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class AuthLogin extends React.Component {
  state = {};

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('/api/login', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
      })
      .then(() => {
        this.props.handleRedirect();
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="usernameOrEmail"
          placeholder="Username Or Email"
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    );
  }
}

export default AuthLogin;
