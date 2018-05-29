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
        <div className="navbar-top">
          <div>
            {Auth.isAuthenticated() && <Link to="/profile">
              <i className="fas fa-chart-line"></i>
            </Link>}
          </div>
          <div>
            {Auth.isAuthenticated() && <Link to="/profile">
              <i className="fas fa-history"></i>
            </Link>}
          </div>
          <div>
            {Auth.isAuthenticated() && <Link to="/profile">
              <i className="fas fa-music"></i>
            </Link>}
          </div>
        </div>
        <div className="navbar-bottom">
          <div>
            {Auth.isAuthenticated() && <Link to="/profile/edit">
              <i className="fas fa-user-edit"></i>
            </Link>}
          </div>
          <div>
            {Auth.isAuthenticated() && <a onClick={this.handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
            </a>}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
