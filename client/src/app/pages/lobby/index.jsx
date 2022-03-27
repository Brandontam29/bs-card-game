import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import * as AppPropTypes from '../../../lib/PropTypes';

import { setSocket as setSocketAction } from '../../../redux/actions/siteActions';

import Login from './login/Login';
import WaitingRoom from './waitingRoom/WaitingRoom';
import Game from './game/Game';
import Messaging from './components/Messaging';

const propTypes = {
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
    }),
    (dispatch) => ({ setSocket: (value) => dispatch(setSocketAction(value)) }),
)(Lobby);

export default WithReduxContainer;
