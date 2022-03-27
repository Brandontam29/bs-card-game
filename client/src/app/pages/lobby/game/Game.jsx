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
import Clock from './Clock';
import { setPannelOpen as setPannelOpenAction } from '../../../../redux/actions/siteActions';

const propTypes = {
    socket: AppPropTypes.socket.isRequired,
    players: AppPropTypes.players.isRequired,
    playerCardsLeft: AppPropTypes.playerCardsLeft.isRequired,
};

const defaultProps = {};

const Game = ({ socket, players, playerCardsLeft }) => {
    const playerIndex = players.findIndex((player) => player.id === socket.id);
    console.table(players);
    console.log(playerIndex);
    const centerLeft = 'top-1/2 left-0 translate-y-[-50%]';
    const topLeft = 'top-0 left-0';
    const topCenter = 'top-0 right-1/2 translate-x-1/2';
    const topRight = 'top-0 right-0';
    const centerRight = 'top-1/2 right-0 translate-y-[-50%]';

    const styles = {
        2: [topCenter],
        3: [topLeft, topRight],
        4: [centerLeft, topCenter, centerRight],
        5: [centerLeft, topLeft, topRight, centerRight],
        6: [centerLeft, topLeft, topCenter, topRight, centerRight],
    };
    console.log(socket.id);
    return (
        <div className="relative h-full flex flex-grow justify-end flex-col ">
            {/* renders the players in order of their turn */}
            {players.slice(playerIndex + 1, players.length).map((player, key) => (
                <OtherPlayer
                    key={player.name + player.avatar + player.id}
                    player={player}
                    handSize={playerCardsLeft[player.id]}
                    className={styles[players.length][key]}
                />
            ))}
            {players.slice(0, playerIndex).map((player, key) => (
                <OtherPlayer
                    key={player.name + player.avatar + player.id}
                    player={player}
                    handSize={playerCardsLeft[player.id]}
                    className={styles[players.length][players.length - 1 - playerIndex + key]}
                />
            ))}
            <Clock />

            <Player />
            <Hand />
            <Controls />
        </div>
    );
};

Game.propTypes = propTypes;
Game.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site, lobby, game }) => ({
        socket: site.socket,
        players: lobby.players,
        inGame: lobby.pannelContent,
        playerCardsLeft: game.playerCardsLeft,
    }),
    (dispatch) => ({
        setPannelOpen: (value) => dispatch(setPannelOpenAction(value)),
    }),
)(Game);

export default WithReduxContainer;
