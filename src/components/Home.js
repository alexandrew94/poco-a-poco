import React from 'react';

import Login from './auth/Login';
import Signup from './auth/Signup';

class Home extends React.Component {

  state = {
    mode: 'login'
  }

  handleRedirect = () => {
    this.props.history.push('/profile');
  }

  toggleMode = () => {
    this.state.mode === 'login' ? this.setState({ mode: 'signup' }) : this.setState({ mode: 'login' });
  }

  render() {
    return <div>
      <h1>Some landing page</h1>
      <h2>landing landing</h2>
      { this.state.mode === 'login' &&
        <div>
          <Login handleRedirect={this.handleRedirect}/>
          <button onClick={this.toggleMode}>Don&apos;t have an account? Signup instead.</button>
        </div>
      }
      { this.state.mode === 'signup' &&
      <div>
        <Signup handleRedirect={this.handleRedirect}/>
        <button onClick={this.toggleMode}>Go back to Login</button>
      </div>
      }
    </div>;
  }
}

export default Home;
