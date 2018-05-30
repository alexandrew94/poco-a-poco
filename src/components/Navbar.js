import React from 'react';
import { withRouter } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import Auth from '../lib/Auth';

class Navbar extends React.Component {

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/');
  }

  smoothScroll = ( element ) => {
    console.log(document.getElementById(element));
    document.getElementById(element).scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return (
      <nav>
        <div className="navbar-top">
          <div>
            {Auth.isAuthenticated() && <a onClick={() => this.smoothScroll('stats')}>
              <i className="fas fa-chart-line"></i>
            </a>}
          </div>
          <div>
            {Auth.isAuthenticated() && <a onClick={() => this.smoothScroll('history')}>
              <i className="fas fa-history"></i>
            </a>}
          </div>
          <div>
            {Auth.isAuthenticated() && <a onClick={() => this.smoothScroll('pieces')}>
              <i className="fas fa-music"></i>
            </a>}
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
