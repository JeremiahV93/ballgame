import React from 'react';
import DatePicker from 'react-datepicker';

import stadiumData from '../../../helpers/data/stadiumData';
import authData from '../../../helpers/data/authData';
import eventData from '../../../helpers/data/eventData';
import tickeData from '../../../helpers/data/ticketData';

import 'react-datepicker/dist/react-datepicker.css';
import './EventForm.scss';

class EventForm extends React.Component {
  state = {
    stadiums: [],
    date: new Date(),
    awayTeam: '',
    awayTeamAcro: '',
    section: '',
    seats: '',
    stadiumId: '',
  }

  submitEvent = (e) => {
    e.preventDefault();
    const {
      awayTeam, awayTeamAcro, section, seats, stadiumId, date,
    } = this.state;

    const newEvent = {
      awayTeam, awayTeamAcro, stadiumId, date,
    };
    newEvent.uid = authData.getUid();

    const newTicket = { section };
    newTicket.seats = seats.split(',');

    eventData.addEvent(newEvent)
      .then((res) => {
        newTicket.eventId = res.data.name;
        tickeData.addTicket(newTicket)
          .then(() => {
            this.props.history.push('/home');
          });
      })
      .catch((err) => console.error(err));
  };

  getStadiumData = () => {
    stadiumData.stadiumData()
      .then((res) => this.setState({ stadiums: res }))
      .catch((err) => console.error('stadium data did not load', err));
  }

  componentDidMount() {
    this.getStadiumData();
  }

  stadiumEventChange = (e) => {
    e.preventDefault();
    this.setState({ stadiumId: e.target.value });
  }

  awayTeamChange = (e) => {
    e.preventDefault();
    const { stadiums } = this.state;
    const awayTeam = stadiums.find((stadium) => stadium.team === e.target.value);
    this.setState({ awayTeamAcro: awayTeam.acronym, awayTeam: e.target.value });
  }

  sectionEventChange = (e) => {
    e.preventDefault();
    this.setState({ section: e.target.value });
  }

  seatsEventChange = (e) => {
    e.preventDefault();
    this.setState({ seats: e.target.value });
  }

  dateEvent = (date) => {
    this.setState({ date });
  }

  render() {
    const {
      stadiums, stadiumId, awayTeam, date,
    } = this.state;

    return (
      <form className='col-6 offset-3'>

        <label htmlFor="home-stadium">Stadium</label>
        <select value={stadiumId} onChange={this.stadiumEventChange} id='stadium' className="form-control">
          <option>Default select</option>
          {stadiums.map((stadium) => <option key={stadium.id} value={stadium.id}>{stadium.name}</option>)}
        </select>

        <div className="form-group date">
          <label htmlFor="gameDate">Game Date:</label>
          <DatePicker
          selected={date}
          onChange={this.dateEvent}
          showTimeSelect
          />
        </div>

        <label htmlFor="visiting-team">Visiting Team</label>
        <select value={awayTeam} onChange={this.awayTeamChange} className="form-control">
          <option>Default select</option>
          {stadiums.map((stadium) => <option key={stadium.id} value={stadium.team}> {stadium.team} </option>)}
        </select>

        <div className="form-group">
          <label htmlFor="section">Section</label>
          <input type="text" onChange={this.sectionEventChange} className="form-control" id="section" placeholder="Section" />
        </div>

        <div className="form-group">
          <label htmlFor="seats">Seats</label>
          <input type="text" onChange={this.seatsEventChange} className="form-control" id="seats" placeholder="Please use commas between seats example: '1B, 2B, 3B'" />
        </div>

        <button type="submit" className="btn btn-primary" onClick={this.submitEvent}>Submit</button>
      </form>
    );
  }
}

export default EventForm;
