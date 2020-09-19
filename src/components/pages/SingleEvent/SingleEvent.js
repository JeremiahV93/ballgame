import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
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
    today: new Date(),
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

  render() {
    const {
      event, ticket, stadium, today,
    } = this.state;
    const { eventId } = this.props.match.params;

    const startTime = moment(event.date).format('MMMM Do YYYY, h:mm a');
    const eventFormLink = `/update/${eventId}`;
    const NoteFormLink = `/note-form/${eventId}`;

    const addNotes = () => {
      if (moment(event.date).isBefore(today)) {
        return <Link to={NoteFormLink} className='btn btn-success'> Add Note </Link>;
      }
      return null;
    };

    const buildNotes = () => {
      if (event.notes) {
        return <div className="row">
                  <div className="col-sm-offset-4 col-sm-4">Notes:</div>
                  <div className="col-sm-4"> {event.notes} </div>
                </div>;
      }
      return null;
    };

    return (
      <div className='single-view'>
        <div className="card single-card" >
          <img className="card-img-top" src={stadium.imgUrl} alt={stadium.name} />
          <div className="card-body">
            <h2 className="card-title">{stadium.name}</h2>
            <p className="card-text"> {event.awayTeam} @ {stadium.team} </p>
            <p className="card-text"> Start Time: {startTime} </p>
            <p className="card-text">Parking: ${stadium.parking}</p>
            <div className="container">
              <div className="row">
                <div className="col"><h3>Tickets</h3></div>
              </div>
              <div className="row">
                  <div className="col-sm-offset-4 col-sm-4"> <h4>Section:</h4></div>
                  <div className="col-sm-4"><h5>{ticket.section}</h5></div>
              </div>
              <div className="row">
                  <div className="col-sm-offset-4 col-sm-4"><h4>Seats:</h4></div>
                  <div className="col-sm-4"> <h5>{ticket.seats}</h5>  </div>
              </div>
              { buildNotes() }
            </div>
            <Link to={eventFormLink} className='btn btn-warning'> Update Event </Link>
            { addNotes() }
            <button className='btn btn-danger' onClick={this.deleteEventAndTickets}>Cancel Event</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleEvent;
