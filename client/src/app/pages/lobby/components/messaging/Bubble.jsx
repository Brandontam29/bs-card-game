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
    const common = 'inline-block mb-1';
    const renderBubble = () => {
        switch (message.id) {
            case 'system':
                return (
                    <li className={classNames(['text-gray-300 text-center my-', common])}>
                        <i>{text}</i>
                    </li>
                );

            case id:
                return (
                    <li
                        className={classNames([
                            'rounded bg-sky-400 text-white py-0.5 px-1.5',
                            common,
                        ])}
                    >
                        {text}
                    </li>
                );

            default:
                return (
                    <li className={classNames(['rounded bg-gray-200 ', common])}>
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
