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
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <main>
            <Switch>
              <Route path="/profile/edit" component={EditProfile} />
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
