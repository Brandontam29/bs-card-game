import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

import * as AppPropTypes from '../../../lib/PropTypes';

import CreateAvatar from './CreateAvatar';

const propTypes = {
    socket: AppPropTypes.socket.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const CharacterCreation = ({ socket, className }) => {
    const [name, setName] = useState('');
    const [lobbyCode, setLobbyCode] = useState('');
    const [avatar, setAvatar] = useState(Math.floor(Math.random() * 10 ** 6).toString());
    const { lid } = useParams();

    const onFormSubmit = (e) => {
        console.log('submit');
        e.preventDefault();
        if (lid) {
            socket.emit('lobby:join', name, avatar, lid);

            return;
        }

        socket.emit('lobby:create', name, avatar);
    };

    return (
        <div className={`max-w-[800px] mx-auto  ${className || ''}`}>
            <form className="bg-white p-4 mb-3 ">
                <input
                    type="text"
                    placeholder="Name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-solid border-black w-full"
                />
                <CreateAvatar avatar={avatar} setAvatar={setAvatar} />
            </form>
            <div className="bg-white p-4 mb-3">
                <button
                    type="button"
                    className="text-center w-full border border-solid border-black "
                    onClick={onFormSubmit}
                >
                    Create Lobby
                </button>
            </div>

            <form className="bg-white p-4">
                <input
                    type="text"
                    placeholder="Lobby Code..."
                    value={lobbyCode}
                    onChange={(e) => setLobbyCode(e.target.value)}
                    className="border border-solid border-black mb-3 w-full"
                />
                <button
                    type="button"
                    className="text-center w-full border border-solid border-black"
                    onClick={onFormSubmit}
                >
                    Create Lobby
                </button>
            </form>
        </div>
    );
};

CharacterCreation.propTypes = propTypes;
CharacterCreation.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site }) => ({
        socket: site.socket,
    }),
    () => ({}),
)(CharacterCreation);

export default WithReduxContainer;
