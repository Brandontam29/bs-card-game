import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import * as AppPropTypes from '../../../lib/PropTypes';

import { setSocket as setSocketAction } from '../../../redux/actions/siteActions';

import Login from './login/Login';
import WaitingRoom from './waitingRoom/WaitingRoom';
import Game from './game/Game';
import Messaging from './components/Messaging';
import PostGame from './postGame/PostGame';

const propTypes = {
    connected: PropTypes.bool.isRequired,
    inGame: PropTypes.bool.isRequired,
    postGame: PropTypes.bool.isRequired,
};

const defaultProps = {};

const Lobby = ({ connected, inGame, postGame }) => {
    useEffect(() => {
        console.log('Post Game', postGame);
    });

    if (!connected) {
        return <Login />;
    }
    return (
        <>
            {inGame ? <Game /> : <WaitingRoom />}
            {postGame && <PostGame />}
            <Messaging />
        </>
    );
};

Lobby.propTypes = propTypes;
Lobby.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ player, lobby }) => ({
        connected: player.connected,
        inGame: lobby.inGame,
        postGame: lobby.postGame,
    }),
    (dispatch) => ({ setSocket: (value) => dispatch(setSocketAction(value)) }),
)(Lobby);

export default WithReduxContainer;
