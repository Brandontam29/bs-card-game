import PropTypes from 'prop-types';
import cardBack from '../../../../../images/cardBack.png';
import { classNames } from '../../../../../lib/classNames';
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
    // create different images for overlapping cards
    return (
        <div className={classNames([className])}>
            <div>cards : {handSize}</div>
            <img alt="card backs" src={cardBack} className="w-9 h-auto" />
        </div>
    );
};

HiddenCards.propTypes = propTypes;
HiddenCards.defaultProps = defaultProps;

export default HiddenCards;
