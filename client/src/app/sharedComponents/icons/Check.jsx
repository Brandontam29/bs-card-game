import PropTypes from 'prop-types';
// import classNames from 'classnames'

import * as AppPropTypes from '../../../lib/PropTypes';

// import styles from '../../styles/main/CheckIcon.scss';

const propTypes = {
    color: PropTypes.string,
    className: AppPropTypes.className,
};

const defaultProps = {
    color: 'currentColor',
    className: null,
};

const CheckIcon = ({ color, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

CheckIcon.propTypes = propTypes;
CheckIcon.defaultProps = defaultProps;

export default CheckIcon;
