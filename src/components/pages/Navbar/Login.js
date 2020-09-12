import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

class LogIn extends React.Component {
  logInEvent = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);
  }

  render() {
    return (
      <div>
        <button className='btn btn-success' onClick={this.logInEvent}>Google Log In</button>
      </div>
    );
  }
}

export default LogIn;
