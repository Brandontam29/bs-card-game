import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cardBack from '../../../../../assets/images/cardBack.png';
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
    const [cardCount, setCardCount] = useState(1);
    const [overlap, setOverlap] = useState('15px');
    const gridStyle = `grid-cols-[repeat(${cardCount},${overlap})]`;

    useEffect(() => {
        if (handSize === 0) {
            return setCardCount(0);
        }
        if (handSize === 1) {
            return setCardCount(1);
        }
        if (handSize === 2) {
            return setCardCount(2);
        }
        if (handSize < 6) {
            setOverlap('20px');
            return setCardCount(3);
        }
        if (handSize < 10) {
            setOverlap('15px');
            return setCardCount(4);
        }
        if (handSize < 15) {
            setOverlap('10px');
            return setCardCount(5);
        }
        if (handSize < 20) {
            return setCardCount(6);
        }
        if (handSize < 25) {
            return setCardCount(7);
        }

        return setCardCount(8);
    }, [handSize]);

    return (
        <div
            className={classNames([
                'relative grid',
                `grid-cols-[repeat(8,10px)] translate-x-[-10px]`,
            ])}
        >
            {new Array(cardCount).fill(
                <img alt="card backs" src={cardBack} className="w-8 h-auto block max-w-none" />,
            )}
            <div className="absolute justify-self-center self-center">{handSize}</div>
        </div>
    );
};

HiddenCards.propTypes = propTypes;
HiddenCards.defaultProps = defaultProps;

export default HiddenCards;
