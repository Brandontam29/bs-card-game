/* eslint-disable object-shorthand */
import PropTypes from 'prop-types';
// Docs: https://github.com/facebook/prop-types

export const color = PropTypes.string;

export const className = PropTypes.string;

export const player = PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
});

export const players = PropTypes.arrayOf(player);
