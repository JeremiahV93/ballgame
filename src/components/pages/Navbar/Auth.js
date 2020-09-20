import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import userData from '../../../helpers/data/userData';

class LogIn extends React.Component {
  logInEvent = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider)
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          const newUser = {
            uid: res.user.uid,
            favTeam: '',
            email: res.user.email,
          };
          userData.addUser(newUser);
        }
      })
      .catch((err) => console.error(err));
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
