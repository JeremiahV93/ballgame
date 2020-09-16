import React from 'react';
import moment from 'moment';
import eventShape from '../../../helpers/props/eventShape';
import eventData from '../../../helpers/data/eventData';
import ticketData from '../../../helpers/data/ticketData';
import stadiumData from '../../../helpers/data/stadiumData';

import './SingleEvent.scss';

class SingleEvent extends React.Component {
  static propTypes = {
    event: eventShape,
  }

  state = {
    event: {},
    ticket: {},
    stadium: {},
  }

  getEventAndStadiumData = () => {
    const { eventId } = this.props.match.params;
    eventData.getEventById(eventId)
      .then((res) => {
        this.setState({ event: res.data });
        stadiumData.stadiumDataById(res.data.stadiumId)
          .then((obj) => this.setState({ stadium: obj.data }));
      })
      .catch((err) => console.error(err));
  }

  getTicketData = () => {
    const { eventId } = this.props.match.params;
    ticketData.getTicketByEventId(eventId)
      .then((res) => {
        const ticket = res;
        ticket.seats = ticket.seats.join(', ');
        this.setState({ ticket });
      })
      .catch((err) => console.error(err));
  };

  // Function below doesnt work alone due to not having the event data when it attempts to execute
  // getStadiumData = () => {
  //   const { event } = this.state;
  //   stadiumData.stadiumDataById(event.stadiumId)
  //     .then((res) => this.setState({ stadium: res.data }))
  //     .catch((err) => console.error(err));
  // }

  componentDidMount() {
    this.getEventAndStadiumData();
    this.getTicketData();
  }

  deleteEventAndTickets = (e) => {
    e.preventDefault();
    const { ticket } = this.state;
    const { eventId } = this.props.match.params;
    const objsToDelete = [];

    objsToDelete.push(ticketData.deleteTicket(ticket.id));
    objsToDelete.push(eventData.deleteEvent(eventId));

    Promise.all(objsToDelete)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch((err) => console.error(err));
  };

  // "event1" : {
  //   "stadiumId": "stadium1",
  //   "date": "2020-08-27T15:14:54-05:00",
  //   "awayTeam": "Houston Astros",
  //   "awayTeamAcro": "HOU",
  //   "uid": "7JXbD4GzQAT9rpIVRUx1Yqa194n2"
  // },
  // "ticket1" : {
  //   "section": "102",
  //   "amount": 3,
  //   "seats": "3B, 4B, 5B",
  //   "eventId": "event1"
  // },
  // "stadium1": {
  //   "name": "Angel Stadium",
  //   "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Angelstadiummarch2019.jpg/180px-Angelstadiummarch2019.jpg",
  //   "parking": 24,
  //   "team": "Los Angeles Angels",
  //   "acronym": "LAA"
  // },

  render() {
    const { event, ticket, stadium } = this.state;

    const startTime = moment(event.date).format('MMMM Do YYYY, h:mm a');

    return (
      <div className="card single-card" >
        <img className="card-img-top" src={stadium.imgUrl} alt={stadium.name} />
        <div className="card-body">
          <h5 className="card-title">{stadium.name}</h5>
          <p className="card-text"> {event.awayTeam} @ {stadium.team} </p>
          <p className="card-text"> Start Time: {startTime} </p>
          <p className="card-text">Parking:${stadium.parking}</p>
          <div className="container">
          <div className="row">
            <div className="col-sm-4">Tickets:</div>
          </div>
          <div className="row">
              <div className="col-sm-offset-4 col-sm-4"> Section:</div>
              <div className="col-sm-4">{ticket.section}</div>
          </div>
          <div className="row">
              <div className="col-sm-offset-4 col-sm-4">Seats:</div>
              <div className="col-sm-4"> {ticket.seats} </div>
          </div>
          </div>
          <button className='btn btn-danger' onClick={this.deleteEventAndTickets}>Cancel Event</button>
        </div>
      </div>
    );
  }
}

export default SingleEvent;
