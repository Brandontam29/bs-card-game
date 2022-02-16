import { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';

import { setPannelOpen as setPannelOpenAction } from '../../../../redux/actions/siteActions';

const propTypes = {
    players: AppPropTypes.players.isRequired,
};

const defaultProps = {};

const Game = ({ players }) => {
    useEffect(() => {});

    return <div>This is the Game</div>;
};

Game.propTypes = propTypes;
Game.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ lobby }) => ({
        players: lobby.players,
        inGame: lobby.pannelContent,
    }),
    (dispatch) => ({
        setPannelOpen: (value) => dispatch(setPannelOpenAction(value)),
    }),
)(Game);

export default WithReduxContainer;
