import PropTypes from 'prop-types';

const ticketShape = PropTypes.shape({
  section: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  seats: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
});

export default ticketShape;
