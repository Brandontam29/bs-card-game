import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cardBack from '../../../../../assets/images/cardBack.png';
import { classNames } from '../../../../../lib/classNames';
import { calculateClamp } from '../../../../../lib/calculateClamp';
import CardBack from '../../../../sharedComponents/icons/CardBack';
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
            return setCardCount(3);
        }
        if (handSize < 10) {
            return setCardCount(4);
        }
        if (handSize < 15) {
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
            className={classNames(['relative grid', className])}
            style={{
                gridTemplateColumns: `repeat(${cardCount}, ${calculateClamp(9, 18)})`,
                transform: `translateX(${calculateClamp(-25, -50)})`,
            }}
        >
            {new Array(cardCount).fill(
                <CardBack
                    alt="card backs"
                    src={cardBack}
                    className={classNames(['h-auto block max-w-none'])}
                    style={{
                        width: `${calculateClamp(25, 50)}`,
                    }}
                />,
            )}
            <div
                className="absolute justify-self-center self-center"
                style={{
                    transform: `translateX(${calculateClamp(12.5, 25)})`,
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    boxShadow: '0px 0px 5px 7px #fff',
                }}
            >
                {handSize}
            </div>
        </div>
    );
};

HiddenCards.propTypes = propTypes;
HiddenCards.defaultProps = defaultProps;

export default HiddenCards;
