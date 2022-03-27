import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from 'boring-avatars';

import * as AppPropTypes from '../../../../lib/PropTypes';
import { classNames } from '../../../../lib/classNames';

const propTypes = {
    player: AppPropTypes.player.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: '',
};

const Player = ({ player, className }) => {
    return (
        <div className={classNames(['', className])}>
            <h4 className="text-base">{player.name}</h4>
            <Avatar name={player.avatar} square="true" variant="beam" size={60} />
        </div>
    );
};

Player.propTypes = propTypes;
Player.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ player }) => ({
        player: player,
    }),
    () => ({}),
)(Player);

export default WithReduxContainer;
