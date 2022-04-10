import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { classNames } from '../../../lib/classNames';

import {
    setPannelOpen as setPannelOpenAction,
    setBackdrop as setBackdropAction,
} from '../../../redux/actions/siteActions';

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setBackdrop: PropTypes.func.isRequired,
    setPannelOpen: PropTypes.func.isRequired,
};

const defaultProps = {};

const Backdrop = ({ visible, setBackdrop, setPannelOpen }) => {
    const clickBackdrop = () => {
        setPannelOpen(!visible);
        setBackdrop(!visible);
    };

    return (
        <button
            type="button"
            onClick={clickBackdrop}
            className={classNames([
                'absolute inset-0 backdrop-opacity bg-black/30',
                {
                    hidden: !visible,
                },
            ])}
        >
            <div className="hidden">Close</div>
        </button>
    );
};

Backdrop.propTypes = propTypes;
Backdrop.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site }) => ({
        visible: site.backdrop,
    }),
    (dispatch) => ({
        setPannelOpen: (value) => dispatch(setPannelOpenAction(value)),
        setBackdrop: (value) => dispatch(setBackdropAction(value)),
    }),
)(Backdrop);

export default WithReduxContainer;
