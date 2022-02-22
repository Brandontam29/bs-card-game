import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from 'boring-avatars';

import * as AppPropTypes from '../../../../lib/PropTypes';

import { setPannelOpen as setPannelOpenAction } from '../../../../redux/actions/siteActions';

const propTypes = {
    player: AppPropTypes.player.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: '',
};

const PlayerCard = ({ player, className }) => {
    return (
        <div className={`${className}`}>
            <h4>{player.name}</h4>
            <Avatar name={player.avatar} square="true" variant="beam" size={60} />
        </div>
    );
};

PlayerCard.propTypes = propTypes;
PlayerCard.defaultProps = defaultProps;

export default PlayerCard;
