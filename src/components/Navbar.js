import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';

class Navbar extends React.Component {

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/');
  }

  render() {
    return (
      <nav>
        {Auth.isAuthenticated() && <Link to="/profile/edit">Edit profile</Link>}
        {Auth.isAuthenticated() && <Link to="/profile">My Profile</Link>}
        {Auth.isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item">Logout</a>}
      </nav>
    );
  }
}

export default withRouter(Navbar);
