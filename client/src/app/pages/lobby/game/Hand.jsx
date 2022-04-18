import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import useWindowSize from '../../../../hooks/useWindowSize';
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
    const [cols, setCols] = useState(18);
    const [rows, setRows] = useState(1);
    const [cardWidth, setCardWidth] = useState(80);
    const { width } = useWindowSize();

    useEffect(() => {
        const size = hand.length;
        setCols();
    }, [hand]);

    useEffect(() => {
        setCardWidth(width);
    }, [width]);

    return (
        <div
            className={classNames([`grid`, className])}
            style={{
                gridTemplateColumns: `repeat(${cols},22px)`,
                gridTemplateRows: `repeat(${rows},22px)`,
            }}
        >
            {hand.map((card) => (
                <Card key={card.code} card={card} className={`w-[clamp()]`} />
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
