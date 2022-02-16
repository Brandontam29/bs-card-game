import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { io } from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';

import * as AppPropTypes from '../../../lib/PropTypes';
import Chevron from '../icons/Chevron';
import Dice from '../icons/Dice';
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
    const [avatar, setAvatar] = useState(0);

    const randomize = () => {};
    const increment = (n) => {
        const arr = [avatar.substring(0, 2), avatar.substring(2, 4), avatar.substring(4, 6)];

        const code = 1 + parseInt(arr[n], 10) > 99 ? 0 : 1 + parseInt(arr[n], 10);
        arr[n] = Math.floor(code / 10) ? `${code}` : `0${code}`;
        const newCode = arr[0] + arr[1] + arr[2];

        setAvatar(newCode);
    };

    const decrement = (n) => {
        const arr = [avatar.substring(0, 2), avatar.substring(2, 4), avatar.substring(4, 6)];

        const code = parseInt(arr[n], 10) - 1 < 0 ? 99 : parseInt(arr[n], 10) - 1;
        arr[n] = Math.floor(code / 10) ? `${code}` : `0${code}`;
        const newCode = arr[0] + arr[1] + arr[2];

        setAvatar(newCode);
    };

    return (
        <div className="relative flex flex-row">
            {/* Left Buttons */}
            <div className="flex flex-column">
                <button type="button" onClick={() => increment(2)}>
                    <Chevron right />
                </button>
                <button type="button" onClick={() => increment(1)}>
                    <Chevron right />
                </button>
                <button type="button" onClick={() => increment(0)}>
                    <Chevron right />
                </button>
            </div>
            {/* Avatar */}
            <div className="relative flex-grow">
                <div />
                <div className="h-[60px] w-[25px]" />
                <div />
            </div>
            {/* Right Buttons */}
            <div className="flex flex-column">
                <button type="button" onClick={() => decrement(3)}>
                    <Chevron right />
                </button>
                <button type="button" onClick={() => decrement(2)}>
                    <Chevron right />
                </button>
                <button type="button" onClick={() => decrement(1)}>
                    <Chevron right />
                </button>
            </div>
            <button
                type="button"
                className="absolute top-0 right-0 -translate-x-1/2"
                onClick={randomize}
            >
                <Dice className="h-[15px] w-[15px]" />
            </button>
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
