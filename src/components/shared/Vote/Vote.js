import React from 'react';

class Vote extends React.Component {
  render() {
    return (
      <div>
        <h1>Are you registered to vote?</h1>
        <a className='btn btn-success' href='https://www.vote.org/'>Find out</a>
      </div>
    );
  }
}

export default Vote;
