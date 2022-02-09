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

const BurgerIcon = ({ color, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="14"
        viewBox="0 0 22 14"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="1" y1="1" x2="21" y2="1" />
        <line x1="1" y1="7" x2="21" y2="7" />
        <line x1="1" y1="13" x2="21" y2="13" />
    </svg>
);

BurgerIcon.propTypes = propTypes;
BurgerIcon.defaultProps = defaultProps;

export default BurgerIcon;
