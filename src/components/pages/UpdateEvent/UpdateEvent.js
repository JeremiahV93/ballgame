import React from 'react';
import DatePicker from 'react-datepicker';

import eventData from '../../../helpers/data/eventData';
import ticketData from '../../../helpers/data/ticketData';
import stadiumData from '../../../helpers/data/stadiumData';
import 'react-datepicker/dist/react-datepicker.css';

class UpdateEvent extends React.Component {
  state = {
    event: {},
    ticket: {},
    stadium: {},
    stadiums: [],
  }

  update = (e) => {
    e.preventDefault();
    const { event, ticket } = this.state;
    const { eventId } = this.props.match.params;
    ticket.seats = ticket.seats.split(',');

    eventData.updateEvent(event, eventId)
      .then(() => {
        ticketData.updateTicket(ticket, ticket.id)
          .then(() => {
            this.props.history.goBack();
          });
      })
      .catch((err) => console.error(err));
  }

  getEventAndStadiumData = () => {
    const { eventId } = this.props.match.params;
    eventData.getEventById(eventId)
      .then((res) => {
        const event = res.data;
        event.date = new Date(event.date);
        this.setState({ event });
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

  getStadiumData = () => {
    stadiumData.stadiumData()
      .then((res) => this.setState({ stadiums: res }))
      .catch((err) => console.error('stadium data did not load', err));
  }

  componentDidMount() {
    this.getEventAndStadiumData();
    this.getTicketData();
    this.getStadiumData();
  }

  stadiumEventChange = (e) => {
    e.preventDefault();
    const { event } = this.state;
    event.stadiumId = e.target.value;
    this.setState({ event });
  }

  dateEventChange = (date) => {
    const { event } = this.state;
    event.date = date;
    this.setState({ event });
  }

  awayTeamEventChange = (e) => {
    e.preventDefault();
    const { event, stadiums } = this.state;
    event.awayTeam = e.target.value;
    event.awayTeamAcro = stadiums.find((stadium) => stadium.team === e.target.value).acronym;

    this.setState({ event });
  }

  sectionEventChange = (e) => {
    const { ticket } = this.state;
    ticket.section = e.target.value;
    this.setState({ ticket });
  }

  seatsEventChange = (e) => {
    const { ticket } = this.state;
    ticket.seats = e.target.value;
    this.setState({ ticket });
  }

  render() {
    const {
      event, ticket, stadiums,
    } = this.state;
    return (
      <form className='col-6 offset-3'>

        <label htmlFor="home-stadium">Stadium</label>
        <select value={event.stadiumId} onChange={this.stadiumEventChange} id='stadium' className="form-control">
          <option>Default select</option>
          {stadiums.map((eachStadium) => <option key={eachStadium.id} value={eachStadium.id}>{eachStadium.name}</option>)}
        </select>

        <div className="form-group date">
          <label htmlFor="gameDate">Game Date:</label>
          <DatePicker
          selected={event.date}
          onChange={this.dateEventChange}
          showTimeSelect
          />
        </div>

        <label htmlFor="visiting-team">Visiting Team</label>
        <select value={event.awayTeam} onChange={this.awayTeamEventChange} className="form-control">
          <option>Default select</option>
          {stadiums.map((eachStadium) => <option key={eachStadium.id} value={eachStadium.team}>{eachStadium.team}</option>)}
        </select>

        <div className="form-group">
          <label htmlFor="section">Section</label>
          <input
            type="text" value={ticket.section} onChange={this.sectionEventChange}
            className="form-control" id="section" placeholder="Section"
          />
        </div>

        <div className="form-group">
          <label htmlFor="seats">Seats</label>
          <input
            type="text" value={ticket.seats} onChange={this.seatsEventChange} className="form-control" id="seats"
            placeholder="Please use commas between seats example: '1B, 2B, 3B'"
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={this.update}>Update Event</button>
      </form>
    );
  }
}

export default UpdateEvent;
