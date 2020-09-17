import React from 'react';
import moment from 'moment';
import authData from '../../../helpers/data/authData';
import eventData from '../../../helpers/data/eventData';

import VitalCards from '../VitalCards/VitalCards';

import '../Home/Home.scss';

class PastEvents extends React.Component {
  state = {
    pastEvents: [],
    today: new Date(),
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
     this.getPastEventData();
   }

   render() {
     const { pastEvents } = this.state;

     const vitalCards = pastEvents.map((event) => <VitalCards event={event} key={event.id} />);

     return (
      <div>
        <div className='cards'>
        { vitalCards }
        </div>
      </div>
     );
   }
}

export default PastEvents;
