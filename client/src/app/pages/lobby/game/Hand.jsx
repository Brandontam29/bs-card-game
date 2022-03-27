import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
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
    const [handClass, setHandClass] = useState(
        'grid-cols-[repeat(20,22px)] grid-rows-[repeat(2,30px)]',
    );

    useEffect(() => {
        const defaultString = 'grid-cols-[repeat(27,22px)]';
    }, [hand]);

    return (
        <div
            className={classNames([
                // 'absolute inset-x-0 bottom-0',
                `grid mx-auto `,
                handClass,
                className,
            ])}
        >
            {hand.map((card) => (
                <Card key={card.code} card={card} />
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
