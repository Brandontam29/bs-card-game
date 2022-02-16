import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../../lib/PropTypes';

import { setSocket as setSocketAction } from '../../../redux/actions/siteActions';

const propTypes = {
    socket: AppPropTypes.socket.isRequired,
    roomCode: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    messages: PropTypes.any,
    className: PropTypes.string,
};

const defaultProps = {
    roomCode: '',
    messages: [],
    className: '',
};

const Messaging = ({ roomCode, socket, messages, className }) => {
    const [message, setMessage] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        // const messageContent = {
        //     roomCode: roomCode,
        //     content: {
        //         author: playerName,
        //         message: message,
        //     },
        // };

        socket.emit('message:send', message);
        setMessage('');
    };

    return (
        <div
            className={classNames('', {
                [className]: !className,
            })}
        >
            <h2>{roomCode}</h2>
            <div className="">
                {messages.map((msg, key) => {
                    return (
                        <div className="">
                            <div className="">
                                {msg.name}: {msg.text}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="">
                <input
                    type="text"
                    placeholder="Message..."
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
                <button type="button" onClick={(e) => sendMessage(e)}>
                    Send
                </button>
            </div>
        </div>
    );
};

Messaging.propTypes = propTypes;
Messaging.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site, player, lobby }) => ({
        socket: site.socket,
        playerName: player.name,
        roomCode: lobby.roomCode,
        inGame: lobby.inGame,
        messages: lobby.messages,
    }),
    (dispatch) => ({ setSocket: (value) => dispatch(setSocketAction(value)) }),
)(Messaging);

export default WithReduxContainer;
