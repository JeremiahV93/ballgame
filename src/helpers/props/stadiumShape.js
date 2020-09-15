import PropTypes from 'prop-types';

const stadiumShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  parking: PropTypes.number.isRequired,
  team: PropTypes.string.isRequired,
  acronym: PropTypes.string.isRequired,
});

export default stadiumShape;
