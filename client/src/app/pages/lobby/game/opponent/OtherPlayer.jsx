import PropTypes from 'prop-types';
import Avatar from 'boring-avatars';

import * as AppPropTypes from '../../../../../lib/PropTypes';

import HiddenCards from './HiddenCards';
import { classNames } from '../../../../../lib/classNames';

const propTypes = {
    player: AppPropTypes.player.isRequired,
    handSize: PropTypes.number.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OtherPlayer = ({ player, handSize, className }) => {
    return (
        <div className={classNames(['absolute flex flex-col items-center p-2', className])}>
            <h4 className="text-sm">{player.name}</h4>
            <Avatar name={player.avatar} square="true" variant="beam" size={40} />
            <HiddenCards handSize={handSize} />
        </div>
    );
};

OtherPlayer.propTypes = propTypes;
OtherPlayer.defaultProps = defaultProps;

export default OtherPlayer;
