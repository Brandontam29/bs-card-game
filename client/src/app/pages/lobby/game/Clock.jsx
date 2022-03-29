import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { capitalize } from '../../../../lib/utils';
import cardBack from '../../../../assets/images/cardBack.png';

const propTypes = {
    cardNeeded: PropTypes.string.isRequired,
};

const defaultProps = {};

const Clock = ({ cardNeeded }) => {
    return (
        <div
            data-cy="clock_card"
            className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2"
        >
            <img alt="card backs" src={cardBack} className="w-16 h-auto" />
            <div className="absolute place-self-center">{capitalize(cardNeeded)}</div>
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
