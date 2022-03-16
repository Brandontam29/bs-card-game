import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { classNames } from '../../../../lib/classNames';

import * as AppPropTypes from '../../../../lib/PropTypes';

import Card from './Card';

const propTypes = {
    hand: AppPropTypes.cards.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const Hand = ({ hand, className }) => {
    return (
        <div className={classNames(['flex flex-row flex-wrap', className])}>
            {hand.map((card) => (
                <Card card={card} />
            ))}
        </div>
    );
};

Hand.propTypes = propTypes;
Hand.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ hand }) => ({
        hand: hand.cards,
    }),
    () => ({}),
)(Hand);

export default WithReduxContainer;
