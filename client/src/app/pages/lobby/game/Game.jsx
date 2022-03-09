// import { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';

import Player from './Player';
import OtherPlayer from './opponent/OtherPlayer';
import Hand from './Hand';
import Controls from './Controls';
import { setPannelOpen as setPannelOpenAction } from '../../../../redux/actions/siteActions';

const propTypes = {
    players: AppPropTypes.players.isRequired,
};

const defaultProps = {};

const Game = ({ players }) => {
    // TODO Implement style array to put players based on number of players

    return (
        <div className="relative">
            {players.map((player) => (
                <OtherPlayer player={player} />
            ))}

            <div>Center Pile</div>
            <Player />
            <Hand />
            <Controls />
        </div>
    );
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
