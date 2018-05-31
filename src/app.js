import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bulma';

import './scss/main.scss';

import Home from './components/Home';
import Navbar from './components/Navbar';

import Profile from './components/user/Profile';
import EditProfile from './components/user/Edit';

class App extends React.Component {

  state = {
    editingProfile: false
  }

  editingProfileTrue = () => this.setState({ editingProfile: true });

  editingProfileFalse = () => this.setState({ editingProfile: false });

  render() {
    return (
      <Router>
        <div>
          <Navbar
            editingProfileStatus={this.state.editingProfile}
            editingProfileTrue={this.editingProfileTrue}
            editingProfileFalse={this.editingProfileFalse}
          />
          <main>
            <Switch>
              <Route
                render={(props) => (
                  <EditProfile {...props} editingProfileFalse={this.editingProfileFalse} />
                )}
                path="/profile/edit"
              />
              <Route path="/profile" component={Profile} />
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
