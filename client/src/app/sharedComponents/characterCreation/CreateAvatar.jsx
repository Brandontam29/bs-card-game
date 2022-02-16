import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { io } from 'socket.io-client';
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
    socket: AppPropTypes.socket.isRequired,
    setPlayers: PropTypes.func.isRequired,
    setSocket: PropTypes.func.isRequired,
    setLobbyCode: PropTypes.func.isRequired,
    setConnected: PropTypes.func.isRequired,
    setPlayerName: PropTypes.func.isRequired,
};

const defaultProps = {};

const CharacterCreation = ({ setPlayerName }) => {
    const [avatar, setAvatar] = useState('010101');

    const randomize = () => {};

    return (
        <div className="relative flex flex-row">
            {/* Left Buttons */}
            <div className="flex flex-column">
                <button></button>
            </div>
            {/* Avatar */}
            <div className="relative flex-grow">
                <img />
                <img />
                <img />
            </div>
            {/* Right Buttons */}
            <div className="flex flex-column">
                <button></button>
            </div>
            <button className="absolute top-0 right-0 -translate-x-1/2"></button>
        </div>
    );
};

CharacterCreation.propTypes = propTypes;
CharacterCreation.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site, lobby }) => ({}),
    (dispatch) => ({
        setPlayerName: (value) => dispatch(setNameAction(value)),
    }),
)(CharacterCreation);

export default WithReduxContainer;
