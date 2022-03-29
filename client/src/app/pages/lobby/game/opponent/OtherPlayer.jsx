import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from 'boring-avatars';

import * as AppPropTypes from '../../../../../lib/PropTypes';

import HiddenCards from './HiddenCards';
import { classNames } from '../../../../../lib/classNames';

const propTypes = {
    player: AppPropTypes.player.isRequired,
    turnPlayer: PropTypes.string.isRequired,
    handSize: PropTypes.number.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OtherPlayer = ({ player, turnPlayer, handSize, className }) => {
    const active = player.id === turnPlayer;

    return (
        <div
            className={classNames([
                'absolute flex flex-col items-center p-2',
                { 'border solid border-yellow-300': active },
                className,
            ])}
        >
            <h4 className="text-sm">{player.name}</h4>
            <Avatar name={player.avatar} square="true" variant="beam" size={40} />
            <HiddenCards handSize={handSize} />
        </div>
    );
};

OtherPlayer.propTypes = propTypes;
OtherPlayer.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ game }) => ({
        turnPlayer: game.turnPlayer,
    }),
    () => ({}),
)(OtherPlayer);

export default WithReduxContainer;
