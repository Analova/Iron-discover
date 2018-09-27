import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import './App.css';
import AddActivity from './pages/AddActivity';
import Activities from './pages/Activities'
import Profile from './pages/Profile'
import IdActivity from "./pages/IdActivity"
import FormActivities from './pages/FormActivities';
import NavBar from "./pages/NavBar"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
    // api.loadUser();
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          {/* <Route path="/" component={Activities} /> */}
          <Route path="/signup" component={Signup} />
          <Route path="/add-activity" component={AddActivity} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/activity/:id/edit" component={FormActivities} />
          <Route path="/activity/:id" component={IdActivity} />
          <Route path="/activity/:id/add-comment" component={IdActivity} />
          <Route path="/" component={Activities} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );

  }
}

export default App;
