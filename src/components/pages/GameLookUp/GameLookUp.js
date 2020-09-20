import React from 'react';

import { Link } from 'react-router-dom';

class GameLookuUp extends React.Component {
  state = {
    email: '',
  }

  emailEventChange = (e) => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  render() {
    const { email } = this.state;

    const friendGamesLink = `friend/${email}`;

    return (
      <div>

        <h1>Friend's Games!</h1>
        <form className='col-6 offset-3'>

          <div className="form-group">
            <label htmlFor="feiend-email">Friend's E-mail</label>
            <input type="text" onChange={this.emailEventChange} className="form-control" id="section" placeholder="Section" />
          </div>

          <Link to={friendGamesLink} className='btn btn-info'> Find Games! </Link>
        </form>

      </div>
    );
  }
}

export default GameLookuUp;
