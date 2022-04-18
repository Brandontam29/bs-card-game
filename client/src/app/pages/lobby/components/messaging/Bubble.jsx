import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { classNames } from '../../../../../lib/classNames';
import * as AppPropTypes from '../../../../../lib/PropTypes';

const propTypes = {
    id: PropTypes.string.isRequired,
    message: AppPropTypes.message.isRequired,
};

const defaultProps = {};

const Bubble = ({ id, message }) => {
    const { author, text, time } = message;
    console.log(message);

    // Sent from the system (check messageHandlers.ts)
    const common = 'block mb-2 w-[fit-content]';
    const renderBubble = () => {
        switch (message.id) {
            // System messages
            case 'system':
                return (
                    <li className={classNames(['text-gray-300 text-center mx-auto', common])}>
                        <i>{text}</i>
                    </li>
                );

            // Player messages
            case id:
                return (
                    <li
                        className={classNames([
                            common,
                            'rounded bg-sky-400 text-white py-0.5 px-1.5 ml-auto',
                            'max-w-[80%]',
                        ])}
                    >
                        {text}
                    </li>
                );

            // Other's messages
            default:
                return (
                    <li
                        className={classNames([
                            common,
                            'rounded bg-gray-200',
                            'max-w-[80%] mr-auto',
                        ])}
                    >
                        {author}: <span className="">{text}</span>
                    </li>
                );
        }
    };

    return renderBubble();
};

Bubble.propTypes = propTypes;
Bubble.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site }) => ({
        socket: site.socket.id,
    }),
    () => ({}),
)(Bubble);

export default WithReduxContainer;
