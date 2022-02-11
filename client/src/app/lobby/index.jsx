import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';

// import * as AppPropTypes from '../../../lib/PropTypes';

import { setSocket as setSocketAction } from '../../redux/actions/siteActions';

import Login from './login/Login';
import WaitingRoom from './waitingRoom/WaitingRoom';
import Game from './game/Game';
import Messaging from './components/Messaging';

const propTypes = {
    // socket: PropTypes.string.isRequired,
    inGame: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    setSocket: PropTypes.func,
};

const defaultProps = {
    setSocket: () => {},
};

const Lobby = ({ inGame, connected, setSocket }) => {
    useEffect(() => {});

    return (
        <>
            <Helmet>
                <title>Don't get Caught Cheating</title>
                <meta name="description" content="Lobby" />
            </Helmet>
            {inGame && connected && <Game />}
            {!inGame || connected ? <WaitingRoom /> : <Login />}
            {/* {connected && <Messaging className="h-[600px]" />} */}
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
