import React from 'react';
import eventShape from '../../../helpers/props/eventShape';
import eventData from '../../../helpers/data/eventData';
import ticketData from '../../../helpers/data/ticketData';

class SingleEvent extends React.Component {
  static propTypes = {
    event: eventShape,
  }

  state = {
    event: {},
    ticket: {},
  }

  getEventData = () => {
    const { eventId } = this.props.match.params;
    eventData.getEventById(eventId)
      .then((res) => this.setState({ event: res.data }))
      .catch((err) => console.error(err));
  }

  getTicketData = () => {
    const { eventId } = this.props.match.params;
    console.error(eventId);
    ticketData.getTicketByEventId(eventId)
      .then((res) => this.setState({ ticket: res }))
      .catch((err) => console.error(err));
  };

  // this.setState({ ticket: res[0] })

  componentDidMount() {
    this.getEventData();
    this.getTicketData();
  }

  render() {
    return (
      <div>
        this is just one event
      </div>
    );
  }
}

export default SingleEvent;
