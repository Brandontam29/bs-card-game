import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';

import { setSocket as setSocketAction } from '../../../../redux/actions/siteActions';
import { classNames } from '../../../../lib/classNames';
import MessageBubbleIcon from '../../../sharedComponents/icons/MessageBubble';

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

    useEffect(() => {
        const windowWidth = window.innerWidth;
        console.log(windowWidth);
        if (windowWidth > 768) {
            setMinimized(false);
        }
    }, []);

    return (
        <>
            {/* Message button */}
            <button
                type="button"
                onClick={() => setMinimized(false)}
                className={classNames([
                    { hidden: !minimized },

                    'fixed top-2 w-[calc(30vw)] max-w-[80px] h-auto p-1',
                    'md:bottom-2 md:top-auto right-2 ',
                ])}
            >
                <MessageBubbleIcon />
            </button>

            {/*  Messages */}
            <div
                className={classNames([
                    { 'top-[100vh] bottom-auto': minimized },
                    'fixed bottom-0 right-0',
                    'h-full max-h-[800px] w-80 mx-auto',
                    'flex flex-col',
                    'bg-white overflow-y-scroll',

                    className,
                ])}
            >
                <div className="flex content-between w-full space-x-2.5">
                    <h5>Chat: {lobbyCode}</h5>
                    <button type="button" onClick={() => setMinimized(true)}>
                        -
                    </button>
                </div>

                <ul className="grow" data-cy="messages">
                    {messages.map((msg) => {
                        return (
                            <li key={msg.name + msg.text + msg.time} className="">
                                {msg.name}: <span className="">{msg.text}</span>
                            </li>
                        );
                    })}
                </ul>

                {/* input field for sending message */}
                <div
                    className={classNames([
                        'sticky bottom-0 right-0 w-full max-w-[inherit] p-1 bg-slate-300',
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
        </>
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
