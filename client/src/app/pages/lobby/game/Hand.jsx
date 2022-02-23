import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';

import Card from './Card';

const propTypes = {
    hand: AppPropTypes.cards.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: '',
};

const Hand = ({ hand, className }) => {
    return (
        <div className={`${className}`}>
            {hand.map((card) => (
                <Card card={card.code} />
            ))}
        </div>
    );
};

Hand.propTypes = propTypes;
Hand.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ hand }) => ({
        hand: hand.hand,
    }),
    () => ({}),
)(Hand);

export default WithReduxContainer;
