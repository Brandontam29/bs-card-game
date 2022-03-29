import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';
import { classNames } from '../../../../lib/classNames';

import {
    deselectAll as deselectAllAction,
    sortHand as sortHandAction,
} from '../../../../redux/actions/handActions';
import Button from '../../../sharedComponents/uiElements/Button';

// import { classNames } from '../../../../lib/classNames';

const propTypes = {
    socket: AppPropTypes.socket.isRequired,
    turnPlayer: PropTypes.string.isRequired,
    deselectAll: PropTypes.func.isRequired,
    sortHand: PropTypes.func.isRequired,
    selectedCards: AppPropTypes.cards.isRequired,
};

const defaultProps = {};

const Controls = ({ socket, turnPlayer, deselectAll, selectedCards, sortHand }) => {
    const [disabled, setDisabled] = useState(true);

    const onPlay = () => {
        socket.emit('game:play_card', selectedCards);
        deselectAll();
    };

    const onDeselect = () => {
        deselectAll();
    };
    const onSort = () => {
        sortHand();
    };

    useEffect(() => {
        if (turnPlayer === socket.id && selectedCards.length > 0) {
            return setDisabled(false);
        }
        return setDisabled(true);
    }, [turnPlayer, socket.id, selectedCards]);

    const buttonStyles =
        'absolute m-1.5 px-2 py-1 border border-black border-solid rounded disabled:bg-gray-400 hover:bg-gray-50 text-sm';

    return (
        <>
            <Button
                type="button"
                onClick={onPlay}
                dataCy="play_cards"
                disabled={disabled}
                className={classNames(['bottom right-1/2 translate-x-1/2', buttonStyles])}
            >
                Play
            </Button>
            <Button
                type="button"
                onClick={onDeselect}
                dataCy="deselect_cards"
                className={classNames(['bottom-0 left-0 bg-red', buttonStyles])}
            >
                Deselect
            </Button>
            <Button
                type="button"
                onClick={onSort}
                dataCy="sort_cards"
                className={classNames(['bottom-0 right-0 bg-blue-300', buttonStyles])}
            >
                Sort
            </Button>
        </>
    );
};

Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site, game, hand }) => ({
        socket: site.socket,
        turnPlayer: game.turnPlayer,
        selectedCards: hand.selectedCards,
    }),
    (dispatch) => ({
        deselectAll: (value) => dispatch(deselectAllAction(value)),
        sortHand: (value) => dispatch(sortHandAction(value)),
    }),
)(Controls);

export default WithReduxContainer;
