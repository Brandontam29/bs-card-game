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
    setInGame as setInGameAction,
} from '../../../redux/actions/lobbyActions';
import { setHand as setHandAction } from '../../../redux/actions/handActions';
import {
    setTurnPlayer as setTurnPlayerAction,
    setRanking as setRankingAction,
    setCardNeeded as setCardNeededAction,
    setPlayerCardsLeft as setPlayerCardsLeftAction,
} from '../../../redux/actions/gameActions';

const propTypes = {
    socket: AppPropTypes.socket,
    setSocket: PropTypes.func.isRequired,
    setLobbyCode: PropTypes.func.isRequired,
    setConnected: PropTypes.func.isRequired,
    setPlayers: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    setHand: PropTypes.func.isRequired,
    setTurnPlayer: PropTypes.func.isRequired,
    setRanking: PropTypes.func.isRequired,
    setCardNeeded: PropTypes.func.isRequired,
    setPlayerCardsLeft: PropTypes.func.isRequired,
    children: PropTypes.node,
};

const defaultProps = {
    socket: null,
    children: <div />,
};

const socketio = io(`${process.env.REACT_APP_SERVER_API}`, {
    transports: ['websocket'],
});

const SocketListeners = ({
    socket,
    setSocket,
    setLobbyCode,
    setConnected,
    setPlayers,
    addMessage,
    setHand,
    setTurnPlayer,
    setRanking,
    setInGame,
    setCardNeeded,
    setPlayerCardsLeft,
    children,
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) {
            setSocket(socketio);
        }
    });

    //  Lobby events
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

    //  Message events
    socketio.off('new_message').on('new_message', (msg) => {
        console.log('new message', msg);
        addMessage(msg);
    });

    // Game events
    socketio.off('started_game').on('started_game', () => {
        console.log('started_game');
        setInGame(true);
    });

    socketio.off('get_hand').on('get_hand', (cards) => {
        console.log('get_hand', cards);
        setHand(cards);
    });

    socketio.off('update_player_cards_left').on('update_player_cards_left', (obj) => {
        console.log('update_player_cards_left', obj);
        setPlayerCardsLeft(obj);
    });

    socketio.off('udpated_clock').on('udpated_clock', (cardValue) => {
        console.log('udpated_clock', cardValue);
        setCardNeeded(cardValue);
    });

    socketio.off('udpated_turn').on('udpated_turn', (id) => {
        console.log('udpated_turn', id);
        setTurnPlayer(id);
    });

    socketio.off('finished_game').on('finished_game', (ranks) => {
        console.log('finished_game', ranks);
        setInGame(false);
        setRanking(ranks);
    });

    return children;
};

SocketListeners.propTypes = propTypes;
SocketListeners.defaultProps = defaultProps;

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
        setHand: (value) => dispatch(setHandAction(value)),
        setTurnPlayer: (value) => dispatch(setTurnPlayerAction(value)),
        setRanking: (value) => dispatch(setRankingAction(value)),
        setInGame: (value) => dispatch(setInGameAction(value)),
        setCardNeeded: (value) => dispatch(setCardNeededAction(value)),
        setPlayerCardsLeft: (value) => dispatch(setPlayerCardsLeftAction(value)),
    }),
)(SocketListeners);

export default WithReduxContainer;
