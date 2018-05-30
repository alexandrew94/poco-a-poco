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
    return <div className="landing">
      <h1>poco a poco</h1>
      <img>
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
