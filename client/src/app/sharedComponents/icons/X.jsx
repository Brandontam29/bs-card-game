import PropTypes from 'prop-types';

const propTypes = {
    color: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    color: 'currentColor',
    className: null,
};

const XIcon = ({ color, className }) => (
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="100%"
        height="100%"
        viewBox="0 0 11.1 11.1"
        xmlSpace="preserve"
        className={className}
    >
        <line
            fill="none"
            stroke={color}
            strokeWidth="1.1111"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="10.6"
            y1="0.6"
            x2="0.6"
            y2="10.6"
        />
        <line
            fill="none"
            stroke={color}
            strokeWidth="1.1111"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="10.6"
            y1="10.6"
            x2="0.6"
            y2="0.6"
        />
    </svg>
);

XIcon.propTypes = propTypes;
XIcon.defaultProps = defaultProps;

export default XIcon;
