/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { classNames } from '../../../lib/classNames';

const propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    href: PropTypes.string,
    to: PropTypes.string,
    exact: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    dataCy: PropTypes.string,
};

const defaultProps = {
    type: 'button',
    className: '',
    href: null,
    to: null,
    exact: false,
    onClick: () => {},
    disabled: false,
    children: <div />,
    dataCy: '',
};

const Button = ({ type, className, href, to, exact, onClick, disabled, children, dataCy }) => {
    if (href) {
        return (
            <a href={href} data-cy={dataCy} className={classNames([className])}>
                {children}
            </a>
        );
    }

    if (to) {
        return (
            <Link to={to} exact={exact} data-cy={dataCy} className={classNames([className])}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            data-cy={dataCy}
            className={classNames([className])}
        >
            {children}
        </button>
    );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
