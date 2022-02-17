import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
// import { io } from 'socket.io-client';
import { connect } from 'react-redux';

// import * as AppPropTypes from '../../../lib/PropTypes';

import { setSocket as setSocketAction } from '../../../redux/actions/siteActions';

import Login from './login/Login';
import WaitingRoom from './waitingRoom/WaitingRoom';
import Game from './game/Game';
import Messaging from './components/Messaging';
// import NotConnected from './notConnected/notConnected';

const propTypes = {
    // socket: PropTypes.string.isRequired,
    inGame: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
};

const defaultProps = {};

const Lobby = ({ inGame, connected }) => {
    useEffect(() => {});

    if (!connected) {
        return <Login />;
    }
    return (
        <>
            {inGame ? <Game /> : <WaitingRoom />}
            <Messaging className="h-[600px]" />
        </>
    );
};

Lobby.propTypes = propTypes;
Lobby.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site, player, lobby }) => ({
        // socket: site.socket,
        connected: player.connected,
        inGame: lobby.inGame,
    }),
    (dispatch) => ({ setSocket: (value) => dispatch(setSocketAction(value)) }),
)(Lobby);

export default WithReduxContainer;
