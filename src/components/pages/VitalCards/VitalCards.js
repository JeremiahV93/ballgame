import React from 'react';

import { Link } from 'react-router-dom';
import stadiumData from '../../../helpers/data/stadiumData';

import eventShape from '../../../helpers/props/eventShape';

import './vitalCards.scss';

class VitalCards extends React.Component {
  state = {
    stadium: {},
  }

  props = {
    event: eventShape,
  }

  componentDidMount() {
    const { event } = this.props;
    stadiumData.stadiumDataById(event.stadiumId)
      .then((res) => this.setState({ stadium: res.data }))
      .catch((err) => console.error(err));
  }

  render() {
    const { event } = this.props;
    const { stadium } = this.state;

    const singleEventLink = `/events/${event.id}`;

    return (
      <div className="card" >
        <img className="card-img-top" src={stadium.imgUrl} alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title">{stadium.name}</h5>
          <p className="card-text">{event.awayTeamAcro} @ {stadium.acronym}</p>
          <p>Parking: ${stadium.parking}</p>
          <Link to={singleEventLink} className='btn btn-info'> More Details </Link>
        </div>
      </div>
    );
  }
}

export default VitalCards;
