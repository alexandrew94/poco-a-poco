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
        this.props.handleRedirect('/profile');
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="columns">
        <div className="column is-one-third">
          <input
            name="usernameOrEmail"
            placeholder="Username Or Email"
            onChange={this.handleChange}
          />
        </div>
        <div className="column is-one-third">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </div>
        <div className="column">
          <button>
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default AuthLogin;
