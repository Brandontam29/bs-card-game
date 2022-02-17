import PropTypes from 'prop-types';

import * as AppPropTypes from '../../../lib/PropTypes';

const propTypes = {
    right: PropTypes.bool,
    color: PropTypes.string,
    className: AppPropTypes.className,
};

const defaultProps = {
    right: false,
    color: 'currentColor',
    className: null,
};

const BurgerIcon = ({ right, color, className }) => (
    <svg
        width="100%"
        height="100%"
        viewBox="-77 0 512 512"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        transform={`rotate(${right ? 0 : 180})`}
        className={className}
    >
        <path d="M98 460L64 426 227 262 64 98 98 64 294 262 98 460Z" />
    </svg>
);

BurgerIcon.propTypes = propTypes;
BurgerIcon.defaultProps = defaultProps;

export default BurgerIcon;
