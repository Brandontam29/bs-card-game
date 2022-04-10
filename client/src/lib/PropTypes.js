/* eslint-disable object-shorthand */

import PropTypes from 'prop-types';
// Docs: https://github.com/facebook/prop-types

export const color = PropTypes.string;

export const className = PropTypes.string;

export const player = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    handSize: PropTypes.number,
    lobby: PropTypes.string,
});

export const ranking = PropTypes.arrayOf(
    PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        remaining: PropTypes.number.isRequired,
    }),
);

export const players = PropTypes.arrayOf(player);

export const socket = PropTypes.any;

export const card = PropTypes.shape({
    image: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
});

export const cards = PropTypes.arrayOf(card);

export const playerCardsLeft = PropTypes.objectOf(PropTypes.number);
