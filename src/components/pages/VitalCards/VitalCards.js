import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import moment from 'moment';
import stadiumData from '../../../helpers/data/stadiumData';

import eventShape from '../../../helpers/props/eventShape';

import './vitalCards.scss';

class VitalCards extends React.Component {
  state = {
    stadium: {},
  }

  props = {
    event: eventShape,
    friend: PropTypes.bool,
  }

  componentDidMount() {
    const { event } = this.props;
    stadiumData.stadiumDataById(event.stadiumId)
      .then((res) => this.setState({ stadium: res.data }))
      .catch((err) => console.error(err));
  }

  render() {
    const { event, friend } = this.props;
    const { stadium } = this.state;

    const startTime = moment(event.date).format('MMMM Do YYYY, h:mm a');

    const singleEventLink = `/events/${event.id}`;

    const buildLink = () => {
      if (!friend) {
        return <Link to={singleEventLink} className='btn btn-info'> More Details </Link>;
      }
      return null;
    };

    return (
      <div className="card" >
        <img className="card-img-top" src={stadium.imgUrl} alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title">{stadium.name}</h5>
          <p className="card-text">{event.awayTeamAcro} @ {stadium.acronym}</p>
          <div className="row">
            <div className="col-md-6"><p className="card-text ">{startTime}</p></div>
            <div className="col-md-6"><p className="card-text">Parking: ${stadium.parking}</p></div>
          </div>
          { buildLink() }
        </div>
      </div>
    );
  }
}

export default VitalCards;
