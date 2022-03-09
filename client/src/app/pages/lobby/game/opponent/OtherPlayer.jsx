import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import Avatar from 'boring-avatars';

import * as AppPropTypes from '../../../../../lib/PropTypes';

import HiddenCards from './HiddenCards';
import { classNames } from '../../../../../lib/classNames';

const propTypes = {
    player: AppPropTypes.player.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const PlayerCard = ({ player, className }) => {
    return (
        <div className={classNames([className])}>
            <h4>{player.name}</h4>
            <Avatar name={player.avatar} square="true" variant="beam" size={40} />
            <HiddenCards handSize={player.handSize} />
        </div>
    );
};

PlayerCard.propTypes = propTypes;
PlayerCard.defaultProps = defaultProps;

export default PlayerCard;
