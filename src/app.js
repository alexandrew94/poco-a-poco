import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bulma';

import './scss/main.scss';

import Home from './components/Home';
import Navbar from './components/Navbar';

import Profile from './components/user/Profile';
import EditProfile from './components/user/Edit';

import Flash from './lib/Flash';

class App extends React.Component {

  state = {
    editingProfile: false,
    messages: null
  }

  editingProfileTrue = () => this.setState({ editingProfile: true });

  editingProfileFalse = () => this.setState({ editingProfile: false });

  displayFlashMessages = () => {
    const messages = Flash.getMessages();
    console.log('inside of flash messages');
    console.log(this.state.messages);

    if(!messages) return false;

    this.setState({ ...this.state, messages });
    Flash.clearMessages();

    setTimeout(() => this.setState({ messages: '' }), 2000);
  }

  render() {
    return (
      <Router>
        <div>
          <div className="flash-message">
            {this.state.messages && Object.keys(this.state.messages).map(type => {
              console.log(this.state.messages, 'logging insideeeeeeeeeeeeeeeeee');
              <div key={type} className={`notification is-${type}`}>{this.state.messages[type]}</div>;
            }
            )}
          </div>
          <Navbar
            editingProfileStatus={this.state.editingProfile}
            editingProfileTrue={this.editingProfileTrue}
            editingProfileFalse={this.editingProfileFalse}
          />
          <main>
            <Switch>
              <Route
                render={(props) => (
                  <EditProfile {...props}
                    editingProfileFalse={this.editingProfileFalse}
                    displayFlashMessages={this.displayFlashMessages}
                  />
                )}
                path="/profile/edit"
              />
              <Route
                render={(props) => (
                  <Profile {...props} displayFlashMessages={this.displayFlashMessages} />
                )}
                path="/profile"
              />
              <Route exact path="/" component={Home} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
