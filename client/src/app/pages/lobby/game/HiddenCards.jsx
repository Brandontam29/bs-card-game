import PropTypes from 'prop-types';
import cardBack from '../../../../images/cardBack.png';
// import * as AppPropTypes from '../../../../lib/PropTypes';

const propTypes = {
    handSize: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    handSize: 1,
    className: '',
};

const HiddenCards = ({ handSize, className }) => {
    return (
        <div className={`${className}`}>
            <div>cards : {handSize}</div>{' '}
            {Array(handSize).fill(<img alt="card backs" src={cardBack} />)}{' '}
        </div>
    );
};

HiddenCards.propTypes = propTypes;
HiddenCards.defaultProps = defaultProps;

export default HiddenCards;
