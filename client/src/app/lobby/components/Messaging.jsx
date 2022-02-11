import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../../lib/PropTypes';

import { setSocket as setSocketAction } from '../../../redux/actions/siteActions';

const propTypes = {
    playerName: PropTypes.string,
    roomCode: PropTypes.string,
    socket: AppPropTypes.socket.isRequired,
    inGame: PropTypes.bool.isRequired,
    setSocket: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    playerName: 'No Name',
    roomCode: '',
    setSocket: () => {},
    className: '',
};

const Messaging = ({
    playerName,
    roomCode,
    socket,
    inGame,
    setSocket,
    className,
}) => {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMessage = () => {
        const messageContent = {
            roomCode: roomCode,
            content: {
                author: playerName,
                message: message,
            },
        };

        socket.emit('message:send', messageContent);
        setMessage('');
    };

    useEffect(() => {
        socket.on('receive_message', (msg) => {
            setMessageList([...messageList, msg]);
        });
    });

    return (
        <div
            className={classNames('', {
                [className]: !className,
            })}
        >
            <h2>{roomCode}</h2>
            <div className="">
                {messageList.map((msg, key) => {
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
                <button type="button" onClick={sendMessage}>
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
    }),
    (dispatch) => ({ setSocket: (value) => dispatch(setSocketAction(value)) }),
)(Messaging);

export default WithReduxContainer;
