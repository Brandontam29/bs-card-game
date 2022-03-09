import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';

import { setSocket as setSocketAction } from '../../../../redux/actions/siteActions';
import { classNames } from '../../../../lib/classNames';

const propTypes = {
    socket: AppPropTypes.socket.isRequired,
    lobbyCode: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    messages: PropTypes.any.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    lobbyCode: '',
    className: null,
};

const Messaging = ({ lobbyCode, socket, messages, className }) => {
    const [minimized, setMinimized] = useState(true);
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        socket.emit('message:send', message);
        setMessage('');
    };

    return (
        <div
            className={classNames([
                'fixed bottom-0 right-0',
                'h-full max-h-[800px] w-full max-w-[640px]',
                'flex flex-col',
                'bg-white overflow-y-scroll',
                { 'bottom-[-100vh-1.25rem]': !minimized },
                className,
            ])}
        >
            {/* tab button */}
            <button
                type="button"
                onClick={() => {
                    console.log(minimized);
                    setMinimized(!minimized);
                }}
            >
                <h5>Chat: {lobbyCode}</h5>
            </button>

            {/* messages */}
            <ul className="grow" data-cy="messages">
                {messages.map((msg, key) => {
                    return (
                        <li className="">
                            {msg.name}: <span className="">{msg.text}</span>
                        </li>
                    );
                })}
            </ul>

            {/* input field for sending message */}
            <div
                className={classNames([
                    'fixed bottom-0 right-0 w-full max-w-[inherit] p-1 bg-slate-300',
                    'flex flex-row',
                ])}
            >
                <input
                    type="text"
                    placeholder="Message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="grow p-1"
                    data-cy="message"
                />
                <button
                    type="button"
                    onClick={() => sendMessage()}
                    className="shrink py-1 px-2"
                    data-cy="send_message"
                >
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
        lobbyCode: lobby.lobbyCode,
        inGame: lobby.inGame,
        messages: lobby.messages,
    }),
    (dispatch) => ({ setSocket: (value) => dispatch(setSocketAction(value)) }),
)(Messaging);

export default WithReduxContainer;
