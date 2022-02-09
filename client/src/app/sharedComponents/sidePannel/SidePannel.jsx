import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
// import * as AppPropTypes from '../../lib/PropTypes';

import Rules from './Rules';
import Feedback from './Feeback';

import { setPannelOpen as setPannelOpenAction } from '../../../redux/actions/siteActions';

const propTypes = {
    content: PropTypes.oneOf(['rules', 'feedback', 'none']),
    hidden: PropTypes.bool.isRequired,
    setPannelOpen: PropTypes.func.isRequired,
};

const defaultProps = {
    content: null,
};

const SidePannel = ({ content, hidden, setPannelOpen }) => {
    const switchCase = (string) => {
        switch (string) {
            case 'rules':
                return <Rules />;

            case 'feedback':
                return <Feedback />;

            default:
                return (
                    <div>
                        <div>nothing to see here yet</div>
                        <div>nothing to see here yet</div>
                        <div>nothing to see here yet</div>
                        <div>nothing to see here yet</div>
                        <div>nothing to see here yet</div>
                        <div>nothing to see here yet</div>
                    </div>
                );
        }
    };
    const onClosePannel = () => {
        setPannelOpen(false);
    };
    return (
        <div
            className={classNames('absolute top-0 right-0 w-[320px] ', {
                'translate-x-[320px]': !hidden,
            })}
        >
            <button type="button" onClick={() => onClosePannel()}>
                X
            </button>
            {switchCase(content)}
        </div>
    );
};

SidePannel.propTypes = propTypes;
SidePannel.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site }) => ({
        content: site.pannelContent,
        hidden: site.pannelOpen,
    }),
    (dispatch) => ({
        setPannelOpen: (value) => dispatch(setPannelOpenAction(value)),
    }),
)(SidePannel);

export default WithReduxContainer;
