import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from 'boring-avatars';

import * as AppPropTypes from '../../../../lib/PropTypes';

import Hand from './Hand';

import { setPannelOpen as setPannelOpenAction } from '../../../../redux/actions/siteActions';

const propTypes = {
    player: AppPropTypes.player.isRequired,
    hand: AppPropTypes.cards.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: '',
};

const UserPlayerCard = ({ player, hand, className }) => {
    return (
        <div className={`${className}`}>
            <h4>{player.name}</h4>
            <Avatar name={player.avatar} square="true" variant="beam" size={60} />
            <Hand />
        </div>
    );
};

UserPlayerCard.propTypes = propTypes;
UserPlayerCard.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ player, hand }) => ({
        player: player,
        hand: hand.hand,
    }),
    () => ({}),
)(UserPlayerCard);

export default WithReduxContainer;
