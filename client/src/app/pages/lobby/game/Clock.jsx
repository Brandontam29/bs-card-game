import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { convertClockToCard } from '../../../../lib/utils';

const propTypes = {
    cardNeeded: PropTypes.string.isRequired,
};

const defaultProps = {};

const Clock = ({ cardNeeded }) => {
    return (
        <div data-cy="clock_card" className="absolute top-1/2 right-1/2 translate-x-1/2">
            Center Pile Clock: {convertClockToCard(cardNeeded)}
        </div>
    );
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
