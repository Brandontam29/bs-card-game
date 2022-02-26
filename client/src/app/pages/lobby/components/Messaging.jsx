import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';

import { setSocket as setSocketAction } from '../../../../redux/actions/siteActions';

const propTypes = {
    socket: AppPropTypes.socket.isRequired,
    roomCode: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    messages: PropTypes.any.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    roomCode: '',
    className: '',
};

const Messaging = ({ roomCode, socket, messages, className }) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        console.log('message:send');
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
                            {msg.name}: <span className="">{msg.text}</span>
                        </div>
                    );
                })}
            </div>

            <div className="">
                <input
                    type="text"
                    placeholder="Message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    data-cy="message"
                />
                <button type="button" onClick={() => sendMessage()} data-cy="send_message">
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
