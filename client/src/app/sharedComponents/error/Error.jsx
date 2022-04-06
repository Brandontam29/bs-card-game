import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setError as setErrorAction } from '../../../redux/actions/siteActions';
import { className } from '../../../lib/PropTypes';

const propTypes = {
    error: PropTypes.string.isRequired,
    setError: PropTypes.func.isRequired,
};

const defaultProps = {};

const Error = ({ error, setError }) => {
    const closeError = () => {
        setError(null);
    };

    return (
        <div className={className(['bg-slate-100', { hidden: !error }])}>
            <div>{error}</div>
            <button type="button" onClick={closeError}>
                X
            </button>
        </div>
    );
};

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site }) => ({
        error: site.error,
    }),
    (dispatch) => ({
        setError: (value) => dispatch(setErrorAction(value)),
    }),
)(Error);

export default WithReduxContainer;
