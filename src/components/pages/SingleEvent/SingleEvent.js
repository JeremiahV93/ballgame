import React from 'react';
import eventShape from '../../../helpers/props/eventShape';
import eventData from '../../../helpers/data/eventData';

class SingleEvent extends React.Component {
  static propTypes = {
    event: eventShape,
  }

  state = {
    event: {},
    tickets: {},
  }

  getEventData = () => {
    const { eventId } = this.props.match.params;
    console.error(eventId);
    eventData.getEventById(eventId)
      .then((res) => this.setState({ event: res.data }))
      .catch((err) => console.error(err));
  }

  getTicketData = () => {

  };

  componentDidMount() {
    this.getEventData();
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
