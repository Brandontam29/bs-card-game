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
        'grid-cols-[repeat(16,28px)] grid-rows-[30px,30px,40px]',
    );

    useEffect(() => {
        const defaultString = 'grid-cols-[repeat(27,22px)]';
    }, [hand]);

    return (
        <div className={classNames([`grid`, handClass, className])}>
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
