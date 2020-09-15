import React from 'react';

import stadiumData from '../../../helpers/data/stadiumData';

import eventShape from '../../../helpers/props/eventShape';

class VitalCards extends React.Component {
  state = {
    stadium: {},
  }

  props = {
    event: eventShape,
  }

  componentDidMount() {
    const { event } = this.props;
    stadiumData.stadiumDataById(event.stadiumId)
      .then((res) => console.error(res))
      .catch((err) => console.error(err));
    // this.setState({ stadium: stadiumData.stadiumDataById(event.stadiumId) });
  }

  render() {
    const { event } = this.props;

    return (
      <div>
      <p>{event.awayTeam}</p>
      </div>
    );
  }
}

export default VitalCards;
