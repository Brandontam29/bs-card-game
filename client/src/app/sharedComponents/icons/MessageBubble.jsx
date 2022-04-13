/* eslint-disable max-len */
import PropTypes from 'prop-types';

import * as AppPropTypes from '../../../lib/PropTypes';

const propTypes = {
    color: PropTypes.string,
    className: AppPropTypes.className,
};

const defaultProps = {
    color: 'currentColor',
    className: null,
};

const MessageBubbleIcon = ({ color, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={{ width: '100%', height: 'auto' }}
    >
        <path fill="white" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />

        <path d="M6 7H18" stroke="black" />
        <path d="M6 10H18" stroke="black" />
        <path d="M6 13H15" stroke="black" />
    </svg>
);

MessageBubbleIcon.propTypes = propTypes;
MessageBubbleIcon.defaultProps = defaultProps;

export default MessageBubbleIcon;
