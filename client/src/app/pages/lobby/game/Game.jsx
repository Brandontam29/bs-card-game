/* eslint-disable react/no-array-index-key */
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
    playerCardsLeft: AppPropTypes.playerCardsLeft.isRequired,
};

const defaultProps = {};

const Game = ({ players, playerCardsLeft }) => {
    console.log(playerCardsLeft);
    // TODO Implement style array to put players based on number of players

    return (
        <div className="relative">
            {players.map((player, key) => (
                <OtherPlayer
                    key={player.name + player.avatar + key}
                    player={player}
                    handSize={playerCardsLeft[player.id]}
                />
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
    ({ lobby, game }) => ({
        players: lobby.players,
        inGame: lobby.pannelContent,
        playerCardsLeft: game.playerCardsLeft,
    }),
    (dispatch) => ({
        setPannelOpen: (value) => dispatch(setPannelOpenAction(value)),
    }),
)(Game);

export default WithReduxContainer;
