import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import * as AppPropTypes from '../../lib/PropTypes';

import Rules from './Rules';
import Feedback from './Feeback';

import {
    setBackdrop as setBackdropAction,
    setPannelOpen as setPannelOpenAction,
} from '../../../redux/actions/siteActions';
import { classNames } from '../../../lib/classNames';
import XIcon from '../icons/X';

const propTypes = {
    content: PropTypes.oneOf(['rules', 'feedback', 'none']),
    visible: PropTypes.bool.isRequired,
    setPannelOpen: PropTypes.func.isRequired,
    setBackdrop: PropTypes.func.isRequired,
};

const defaultProps = {
    content: 'none',
};

const SidePannel = ({ content, visible, setPannelOpen, setBackdrop }) => {
    const switchCase = (string) => {
        switch (string) {
            case 'rules':
                return <Rules closePannel={onClosePannel} />;

            case 'feedback':
                return <Feedback closePannel={onClosePannel} />;

            default:
                return <div>Close me and select a menu item</div>;
        }
    };

    const onClosePannel = () => {
        setPannelOpen(false);
    };

    useEffect(() => {
        setBackdrop(visible);
    }, [visible, setBackdrop]);

    return (
        <div
            className={classNames([
                'absolute top-0 right-0 w-[320px] h-[100vh] translate-x-[320px] transition-transform',
                {
                    'translate-x-0': visible,
                },
                'bg-white',
            ])}
        >
            {switchCase(content)}
        </div>
    );
};

SidePannel.propTypes = propTypes;
SidePannel.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site }) => ({
        content: site.pannelContent,
        visible: site.pannelOpen,
    }),
    (dispatch) => ({
        setPannelOpen: (value) => dispatch(setPannelOpenAction(value)),
        setBackdrop: (value) => dispatch(setBackdropAction(value)),
    }),
)(SidePannel);

export default WithReduxContainer;
