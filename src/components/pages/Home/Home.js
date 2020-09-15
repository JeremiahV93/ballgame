import React from 'react';

import authData from '../../../helpers/data/authData';
import eventData from '../../../helpers/data/eventData';

import VitalCards from '../VitalCards/VitalCards';

class Home extends React.Component {
  state = {
    events: [],
  }

  getEventData = () => {
    eventData.getEventsByUid(authData.getUid())
      .then((data) => {
        this.setState({ events: data });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getEventData();
  }

  render() {
    const { events } = this.state;

    const vitalCards = events.map((event) => <VitalCards event={event} key={event.id} />);

    return (
      <div>
      { vitalCards }
      </div>
    );
  }
}

export default Home;
