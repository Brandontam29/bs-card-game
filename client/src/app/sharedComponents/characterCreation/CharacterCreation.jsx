import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';

import * as AppPropTypes from '../../../lib/PropTypes';

import {
    setName as setNameAction,
    setConnected as setConnectedAction,
    // setAvatar as setAvatarAction,
} from '../../../redux/actions/playerActions';
import { setSocket as setSocketAction } from '../../../redux/actions/siteActions';
import {
    setPlayers as setPlayersAction,
    setLobbyCode as setLobbyCodeAction,
} from '../../../redux/actions/lobbyActions';

const propTypes = {
    // socket: AppPropTypes.socket.isRequired,
    setPlayers: PropTypes.func.isRequired,
    setSocket: PropTypes.func.isRequired,
    setLobbyCode: PropTypes.func.isRequired,
    setConnected: PropTypes.func.isRequired,
    setPlayerName: PropTypes.func.isRequired,
};

const defaultProps = {};

const socket = io(`${process.env.REACT_APP_SERVER_API}`, {
    transports: ['websocket'],
});

const CharacterCreation = ({
    // socket,
    setPlayers,
    setSocket,
    setLobbyCode,
    setConnected,
    setPlayerName,
}) => {
    const [name, setName] = useState('');
    const { lid } = useParams();
    const [avatar, setAvatar] = useState('010101');
    const navigate = useNavigate();

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (lid) {
            console.log('dont run this');
            setPlayerName(name);
            socket.emit('lobby:join', {
                name: name,
                avatar: avatar,
                lobby: lid,
            });

            return;
        }

        setPlayerName(name);
        socket.emit('lobby:create', {
            name: name,
            avatar: avatar,
        });
    };

    useEffect(() => {
        if (!socket) {
            setSocket(socket);

            socket.emit('lobby:join');
        }

        socket.on('lobby_created', (code) => {
            console.log('lobby_created', code);
            setLobbyCode(code);
            setConnected(true);
            navigate(`/lobby/${code}`);
        });

        socket.on('update_players', (players) => {
            console.log('update players', players);
            setPlayers(players);
        });
    });

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <input
                    type="text"
                    placeholder="Name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div>
                    {/* <div>
                        <button></button>
                        <button></button>
                        <button></button>
                    </div> */}
                    creature
                    {/* <div>
                        <button></button>
                        <button></button>
                        <button></button>
                    </div> */}
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

CharacterCreation.propTypes = propTypes;
CharacterCreation.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site, lobby }) => ({
        socket: site.socket,
        inGame: lobby.inGame,
    }),
    (dispatch) => ({
        setPlayers: (value) => dispatch(setPlayersAction(value)),
        setPlayerName: (value) => dispatch(setNameAction(value)),
        setLobbyCode: (value) => dispatch(setLobbyCodeAction(value)),
        setSocket: (value) => dispatch(setSocketAction(value)),
        setConnected: (value) => dispatch(setConnectedAction(value)),
    }),
)(CharacterCreation);

export default WithReduxContainer;
