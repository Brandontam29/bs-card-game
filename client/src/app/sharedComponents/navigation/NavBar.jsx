import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { classNames } from '../../../lib/classNames';

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
    const buttonClass = 'py-5 font-sans';

    return (
        <nav className="flex-initial bg-gray-100 font-sans">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div
                        className={classNames([
                            'flex items-center text-gray-700 hover:text-gray-900',
                            buttonClass,
                        ])}
                    >
                        {/* <!-- logo --> */}
                        <Link to="/">
                            <span className="font-bold">Cheat</span>
                        </Link>
                    </div>

                    {/* <!-- secondary nav --> */}
                    <div className="flex items-center gap-8">
                        <button
                            type="button"
                            onClick={() => onButtonClick('rules')}
                            className={classNames([buttonClass])}
                        >
                            How to Play
                        </button>
                        <button
                            type="button"
                            onClick={() => onButtonClick('feedback')}
                            className={classNames([buttonClass])}
                        >
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
