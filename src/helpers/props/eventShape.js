import PropTypes from 'prop-types';

const eventShape = PropTypes.shape({
  stadium: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  awayTeam: PropTypes.string.isRequired,
  awayTeamAcro: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default eventShape;
