import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    to: PropTypes.string,
    exact: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.node,
};

const defaultProps = {
    className: '',
    href: null,
    to: null,
    exact: false,
    onClick: () => {},
    disabled: false,
    children: <div />,
};
const Button = ({ className, href, to, exact, onClick, disabled, children }) => {
    if (href) {
        return (
            <a href={href} className={`${className}`}>
                {children}
            </a>
        );
    }

    if (to) {
        return (
            <Link to={to} exact={exact} className={`${className}`}>
                {children}
            </Link>
        );
    }

    return (
        <button type="button" onClick={onClick} disabled={disabled} className={`${className}`}>
            {children}
        </button>
    );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
