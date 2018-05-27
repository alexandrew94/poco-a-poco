import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';

import Profile from './components/user/Profile';
import EditProfile from './components/user/Edit';

class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          <Navbar />
          <h1>Poco a Poco</h1>
          <Switch>
            <Route path="/profile/edit" component={EditProfile} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
