import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

class LogOut extends React.Component {
  logoutClickEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="Auth">
        <button className='btn btn-warning' onClick={this.logoutClickEvent}> Google Log out</button>
      </div>
    );
  }
}

export default LogOut;
