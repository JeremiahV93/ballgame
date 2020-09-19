import React from 'react';
import firebase from 'firebase/app';

import 'firebase/auth';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import './App.scss';

import authData from '../helpers/data/authData';
import userData from '../helpers/data/userData';

import Navbar from '../components/pages/Navbar/Navbar';
import Home from '../components/pages/Home/Home';
import PastEvents from '../components/pages/PastEvents/PastEvents';
import LandingPage from '../components/shared/Landing/Landing';
import SingleEvent from '../components/pages/SingleEvent/SingleEvent';
import EventForm from '../components/pages/GameForm/EventForm';
import UpdateForm from '../components/pages/UpdateEvent/UpdateEvent';
import NoteForm from '../components/pages/NoteForm/NoteForm';

import firebaseConnection from '../helpers/data/connection';

firebaseConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/landingPage', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const RoutesContainer = ({ authed }) => {
  if (authed === null) {
    return (
      <i className="fas fa-spin fa-baseball-ball"></i>
    );
  }

  return (
    <div>
      <Switch>
        <PrivateRoute path="/home" component={Home} authed={authed} />
        <PrivateRoute path="/events/:eventId" component={SingleEvent} authed={authed} />
        <PrivateRoute path="/form" component={EventForm} authed={authed} />
        <PrivateRoute path="/update/:eventId" component={UpdateForm} authed={authed} />
        <PrivateRoute path="/past-events" component={PastEvents} authed={authed} />
        <PrivateRoute path="/note-form/:eventId" component={NoteForm} authed={authed} />

        <PublicRoute path='/landingPage' component={LandingPage} authed={authed} />

        <Redirect from='*' to='/home' />
      </Switch>
    </div>
  );
};

class App extends React.Component {
  state = {
    authed: null,
    pColor: '',
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
        userData.getUserData(authData.getUid())
          .then((currentUser) => {
            this.setState({ pColor: currentUser[0].primaryColor });
          })
          .catch((err) => console.error(err));
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, pColor } = this.state;
    return (
      <div className="App"
        style={{
          backgroundColor: pColor,
          // borderTop: `1px ${sColor} solid`,
        }}
      >
        <BrowserRouter>
            <Navbar authed={authed} />
            <RoutesContainer authed={authed} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
