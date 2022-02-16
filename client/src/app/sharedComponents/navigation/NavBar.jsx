import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import * as AppPropTypes from '../../lib/PropTypes';
import {
    setPannelOpen as setPannelOpenAction,
    setPannelContent as setPannelContentAction,
} from '../../../redux/actions/siteActions';

const propTypes = {
    setPannelOpen: PropTypes.func,
    setPannelContent: PropTypes.func,
};

const defaultProps = {
    setPannelOpen: () => {},
    setPannelContent: () => {},
};

const NavBar = ({ setPannelOpen, setPannelContent }) => {
    const onButtonClick = (content) => {
        setPannelContent(content);
        setPannelOpen(true);
    };

    return (
        <nav className="flex-initial bg-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        {/* <!-- logo --> */}
                        <div className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                            <Link to="/">
                                <span className="font-bold">Cheat</span>
                            </Link>
                        </div>
                    </div>

                    {/* <!-- secondary nav --> */}
                    <div className="flex items-center space-x-1">
                        <button type="button" onClick={() => onButtonClick('rules')}>
                            How to Play
                        </button>
                        <button type="button" onClick={() => onButtonClick('feedback')}>
                            Give Feedback
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site }) => ({
        pannelOpen: site.pannelOpen,
    }),
    (dispatch) => ({
        setPannelOpen: (value) => dispatch(setPannelOpenAction(value)),
        setPannelContent: (value) => dispatch(setPannelContentAction(value)),
    }),
)(NavBar);

export default WithReduxContainer;
