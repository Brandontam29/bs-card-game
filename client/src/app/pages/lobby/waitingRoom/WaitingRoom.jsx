import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';

const propTypes = {
    socket: AppPropTypes.socket.isRequired,
    lobbyCode: PropTypes.string.isRequired,
    players: AppPropTypes.players.isRequired,
};

const defaultProps = {};

const WaitingRoom = ({ socket, lobbyCode, players }) => {
    useEffect(() => {
        console.log('waiting room: ', socket);
    });

    const onStartGame = () => {
        console.log('game:start_game');
        socket.emit('game:start_game');
    };

    return (
        <>
            <Helmet>
                <title>Don't Get Caught Cheating</title>
                <meta name="description" content="Game" />
            </Helmet>
            <div>
                Waiting for the host to start...
                <div>Code: {lobbyCode}</div> <h3>Players</h3>
                <ul>
                    {players.map((player) => (
                        <li key={player.id}>
                            <b>{player.name}</b>
                            {player.avatar}
                        </li>
                    ))}
                </ul>
            </div>

            <button type="button" onClick={onStartGame}>
                Start Game
            </button>
        </>
    );
};

WaitingRoom.propTypes = propTypes;
WaitingRoom.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site, lobby }) => ({
        socket: site.socket,
        content: site.pannelContent,
        hidden: site.pannelOpen,
        players: lobby.players,
        lobbyCode: lobby.lobbyCode,
    }),
    () => ({}),
)(WaitingRoom);

export default WithReduxContainer;
