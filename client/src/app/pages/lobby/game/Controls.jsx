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
    const styles =
        'px-5 py-2.5 border border-black border-solid bg-slate-100 mr-5 disabled:bg-gray-400 hover:bg-gray-50';
    return (
        <div>
            <Button
                type="button"
                onClick={onPlay}
                dataCy="play_cards"
                disabled={disabled}
                className={classNames([styles])}
            >
                Play
            </Button>
            <Button
                type="button"
                onClick={onDeselect}
                dataCy="deselect_cards"
                className={classNames([styles])}
            >
                Deselect
            </Button>
            <Button
                type="button"
                onClick={onSort}
                dataCy="sort_cards"
                className={classNames([styles])}
            >
                Sort
            </Button>
        </div>
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
