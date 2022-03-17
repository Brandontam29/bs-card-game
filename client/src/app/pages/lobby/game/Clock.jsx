import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
    cardNeeded: PropTypes.string.isRequired,
};

const defaultProps = {};

const Clock = ({ cardNeeded }) => {
    return (
        <div data-cy="clock_card" className="">
            {cardNeeded}
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
