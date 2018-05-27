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
