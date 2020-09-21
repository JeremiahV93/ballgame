import React from 'react';

import eventData from '../../../helpers/data/eventData';

class NoteForm extends React.Component {
  state = {
    notes: '',
  }

  componentDidMount() {
    this.setState({ eventId: this.props.match.params.eventId });
  }

  noteEventChange = (e) => {
    e.preventDefault();
    this.setState({ notes: e.target.value });
  }

  submitEvent = (e) => {
    e.preventDefault();
    const { notes } = this.state;
    const { eventId } = this.props.match.params;
    eventData.addEventNotes(eventId, notes)
      .then(() => {
        this.props.history.goBack();
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className='col-6 offset-3'>
        <div className="form-group">
          <label htmlFor="section">Game Notes</label>
          <textarea type="text" onChange={this.noteEventChange} className="form-control" id="note" placeholder="Add exciting game notes!"></textarea>
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.submitEvent}>Add Entry</button>
      </div>
    );
  }
}

export default NoteForm;
