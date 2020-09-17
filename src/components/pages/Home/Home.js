import React from 'react';
import moment from 'moment';

import authData from '../../../helpers/data/authData';
import eventData from '../../../helpers/data/eventData';

import VitalCards from '../VitalCards/VitalCards';

import './Home.scss';

class Home extends React.Component {
  state = {
    events: [],
    pastEvents: [],
    today: new Date(),
  }

  getEventData = () => {
    eventData.getEventsByUid(authData.getUid())
      .then((data) => {
        this.setState({ events: data });
      })
      .catch((err) => console.error(err));
  }

  getPastEventData = () => {
    eventData.getEventsByUid(authData.getUid())
      .then((data) => {
        const { today } = this.state;
        const pastEvents = [];
        data.forEach((eachEvent) => {
          if (moment(eachEvent.date).isBefore(today)) {
            pastEvents.push(eachEvent);
          }
        });
        this.setState({ pastEvents });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getEventData();
    this.getPastEventData();
  }

  render() {
    const { events } = this.state;

    const vitalCards = events.map((event) => <VitalCards event={event} key={event.id} />);

    return (
      <div>
        <div className='cards'>
        { vitalCards }
        </div>
      </div>
    );
  }
}

export default Home;
