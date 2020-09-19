import React from 'react';
import moment from 'moment';

import authData from '../../../helpers/data/authData';
import eventData from '../../../helpers/data/eventData';

import VitalCards from '../VitalCards/VitalCards';
import NewUser from '../NewUser/NewUser';

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
        this.vitalCards();
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getUpcomingEvents();
  }

  vitalCards = () => {
    const { upcomingEvents } = this.state;

    if (upcomingEvents.length === 0) {
      return (
        <NewUser />
      );
    }
    return upcomingEvents.map((event) => <VitalCards event={event} key={event.id} />);
  }

  render() {
    return (
      <div>
        <h1 className='title'> Upcoming Games</h1>
        <div className='cards'>
          { this.vitalCards() }
        </div>
      </div>
    );
  }
}

export default Home;
