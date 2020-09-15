import React from 'react';

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
    return (
      <div class="card" >
        <img class="card-img-top" src={stadium.imgUrl} alt="Card cap" />
        <div class="card-body">
          <h5 class="card-title">{stadium.name}</h5>
          <p class="card-text">{event.awayTeamAcro} @ {stadium.acronym}</p>
          <p>Parking: ${stadium.parking}</p>
        </div>
      </div>
    );
  }
}

export default VitalCards;
