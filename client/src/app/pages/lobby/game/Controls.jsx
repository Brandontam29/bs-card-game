import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';

import {
    deselectAll as deselectAllAction,
    sortHand as sortHandAction,
} from '../../../../redux/actions/handActions';

import { classNames } from '../../../../lib/classNames';

const propTypes = {
    socket: AppPropTypes.socket.isRequired,
    turnPlayer: PropTypes.string.isRequired,
    deselectAll: PropTypes.func.isRequired,
    sortHand: PropTypes.func.isRequired,
    selectedCards: AppPropTypes.cards.isRequired,
};

const defaultProps = {};

const Controls = ({ socket, turnPlayer, deselectAll, selectedCards, sortHand }) => {
    const [enabled, setEnabled] = useState(false);

    const onPlay = () => {
        console.log(selectedCards);
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
        console.log(selectedCards);
    }, [selectedCards]);

    useEffect(() => {
        if (turnPlayer === socket.id && selectedCards.length > 0) {
            setEnabled(true);
        }
    }, [turnPlayer, socket.id, selectedCards]);

    return (
        <div>
            <button
                type="button"
                onClick={onPlay}
                data-cy="play_cards"
                // className={classNames([{ disabled: !enabled }])}
            >
                Play
            </button>
            <button type="button" onClick={onDeselect} className="">
                Deselect
            </button>
            <button type="button" onClick={onSort} className="">
                Sort
            </button>
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
