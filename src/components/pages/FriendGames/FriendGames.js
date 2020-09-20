import React from 'react';
import PropTypes from 'prop-types';

import smash from '../../../helpers/data/FriendGamesSmash';

class FriendGames extends React.Component {
static Proptype = {
  email: PropTypes.string,
}

state = {
  email: '',
  games: [],
}

componentDidMount() {
  const { email } = this.props.match.params;
  this.setState({ email });
  smash.userGameSmash(email)
    .then((res) => {
      this.setState({ games: res });
    })
    .catch((err) => console.error(err));
}

render() {
  return (
      <div> friend games printed here</div>
  );
}
}

export default FriendGames;
