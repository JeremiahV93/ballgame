import React from 'react';
import PropTypes from 'prop-types';

import smash from '../../../helpers/data/FriendGamesSmash';

import VitalCards from '../VitalCards/VitalCards';

class FriendGames extends React.Component {
static Proptype = {
  email: PropTypes.string,
}

state = {
  email: '',
  games: [],
  friend: true,
}

componentDidMount() {
  const { email } = this.props.match.params;
  this.setState({ email });
  smash.userGameSmash(email)
    .then((res) => {
      console.error(res);
      this.setState({ games: res });
    })
    .catch((err) => {
      console.error(err);
      this.setState({ email: '' });
    });
}

render() {
  const { email, games, friend } = this.state;

  const nofriend = () => {
    if (email === '') {
      return <h1>No Friends with that email</h1>;
    } if (games.length === 0) {
      return <h1> Your friend Doesn't have any games yet!</h1>;
    }
    return null;
  };

  const buildCards = () => games.map((event) => <VitalCards event={event} key={event.id} friend={friend} />);

  return (
      <div>
        <h1>Friend's Games</h1>
        <div className='cards'>
          { nofriend() }
          { buildCards() }
        </div>
      </div>
  );
}
}

export default FriendGames;
