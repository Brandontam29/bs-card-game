import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

import * as AppPropTypes from '../../../lib/PropTypes';

import { setSocket as setSocketAction } from '../../../redux/actions/siteActions';
import { setConnected as setConnectedAction } from '../../../redux/actions/playerActions';
import {
    setPlayers as setPlayersAction,
    setLobbyCode as setLobbyCodeAction,
    addMessage as addMessageAction,
    setInGame,
} from '../../../redux/actions/lobbyActions';

const propTypes = {
    socket: AppPropTypes.socket,
    setSocket: PropTypes.func.isRequired,
    setLobbyCode: PropTypes.func.isRequired,
    setConnected: PropTypes.func.isRequired,
    setPlayers: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    children: PropTypes.node,
};

const defaultProps = {
    socket: null,
    children: <div />,
};

const socketio = io(`${process.env.REACT_APP_SERVER_API}`, {
    transports: ['websocket'],
});

const SocketProvider = ({
    socket,
    setSocket,
    setLobbyCode,
    setConnected,
    setPlayers,
    addMessage,
    children,
}) => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(socketio);
    });

    useEffect(() => {
        if (!socket) {
            setSocket(socketio);
        }
    });

    socketio.off('created_lobby').on('created_lobby', (code) => {
        console.log('created_lobby', code);
        setLobbyCode(code);
        setConnected(true);
        navigate(`/lobby/${code}`);
    });

    socketio.off('joined_lobby').on('joined_lobby', (code) => {
        console.log('joined_lobby', code);
        setLobbyCode(code);
        setConnected(true);
        navigate(`/lobby/${code}`);
    });

    socketio.off('update_players').on('update_players', (players) => {
        console.log('update players', players);
        setPlayers(players);
    });

    socketio.off('new_message').on('new_message', (msg) => {
        console.log('new message', msg);
        addMessage(msg);
    });

    socketio.off('started_game').on('started_game', (msg) => {
        console.log('new message', msg);
        setInGame(true);
    });
    return children;
};

SocketProvider.propTypes = propTypes;
SocketProvider.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site }) => ({
        socket: site.socket,
    }),
    (dispatch) => ({
        setSocket: (value) => dispatch(setSocketAction(value)),
        setLobbyCode: (value) => dispatch(setLobbyCodeAction(value)),
        setConnected: (value) => dispatch(setConnectedAction(value)),
        setPlayers: (value) => dispatch(setPlayersAction(value)),
        addMessage: (value) => dispatch(addMessageAction(value)),
    }),
)(SocketProvider);

export default WithReduxContainer;
