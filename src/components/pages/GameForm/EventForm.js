import React from 'react';

import stadiumData from '../../../helpers/data/stadiumData';

class EventForm extends React.Component {
  state = {
    stadiums: [],
    date: new Date(),
    awayTeam: '',
    awayTeamAcro: '',
    section: '',
    seats: '',
    stadiumID: '',
  }

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
    this.setState({ stadiumID: e.target.value });
  }

  awayTeamChange = (e) => {
    e.preventDefault();
    const { stadiums } = this.state;
    const awayTeam = stadiums.find((stadium) => stadium.team === e.target.value);
    this.setState({ awayTeamAcro: awayTeam.acronym, awayTeam: e.target.value });
  }

  render() {
    const { stadiums, stadiumId, awayTeam } = this.state;

    // const buildStadiumOptions = () => {
    //   stadiums.forEach((stadium) => <option>{stadium.name}</option>);
    // };

    // string split on a comma and turn it into an array
    return (
      <form className='col-6 offset-3'>

        <label for="home-stadium">Stadium</label>
        <select value={stadiumId} onChange={this.stadiumEventChange} id='stadium' className="form-control">
          <option>Default select</option>
          {stadiums.map((stadium) => <option value={stadium.id}>{stadium.name}</option>)}
        </select>

        <label for="visiting-team">Visiting Team</label>
        <select value={awayTeam} onChange={this.awayTeamChange} className="form-control">
          <option>Default select</option>
          {stadiums.map((stadium) => <option value={stadium.team}>{stadium.team}</option>)}
        </select>

        <div className="form-group">
          <label for="section">Section</label>
          <input type="text" className="form-control" id="section" placeholder="Section" />
        </div>
        <div className="form-group">
          <label for="seats">Seats</label>
          <input type="text" className="form-control" id="seats" placeholder="Please use commas between seats example: '1B, 2B, 3B'" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default EventForm;
