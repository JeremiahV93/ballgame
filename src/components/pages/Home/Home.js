import React from 'react';
import moment from 'moment';

import authData from '../../../helpers/data/authData';
import eventData from '../../../helpers/data/eventData';

import VitalCards from '../VitalCards/VitalCards';

import './Home.scss';

class Home extends React.Component {
  state = {
    upcomingEvents: [],
    today: new Date(),
  }

  getUpcomingEvents = () => {
    eventData.getEventsByUid(authData.getUid())
      .then((data) => {
        const { today } = this.state;
        const upcomingEvents = [];
        data.forEach((eachEvent) => {
          if (moment(eachEvent.date).isAfter(today) || moment(eachEvent.date).isSame(today)) {
            upcomingEvents.push(eachEvent);
          }
        });
        this.setState({ upcomingEvents });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getUpcomingEvents();
  }

  render() {
    const { upcomingEvents } = this.state;

    const vitalCards = upcomingEvents.map((event) => <VitalCards event={event} key={event.id} />);

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
