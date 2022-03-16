/* eslint-disable react/no-array-index-key */
// import { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';

const propTypes = {
    cardNeeded: AppPropTypes.card.isRequired,
};

const defaultProps = {};

const Clock = ({ cardNeeded }) => {
    return <div className="">{cardNeeded}</div>;
};

Clock.propTypes = propTypes;
Clock.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ game }) => ({
        cardNeeded: game.cardNeeded,
    }),
    () => ({}),
)(Clock);

export default WithReduxContainer;
