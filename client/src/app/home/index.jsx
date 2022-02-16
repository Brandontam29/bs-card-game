import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';

import { setSocket as setSocketAction } from '../../redux/actions/siteActions';
import { setLobbyCode as setLobbyCodeAction } from '../../redux/actions/lobbyActions';
import { setConnected as setConnectedAction } from '../../redux/actions/playerActions';

import CharacterCreation from '../sharedComponents/characterCreation/CharacterCreation';

const propTypes = {
    // socket: AppPropTypes.socket,
    // setSocket: PropTypes.func,
    // setLobbyCode: PropTypes.func,
    // setConnected: PropTypes.func,
};

const defaultProps = {
    // socket: null,
    // setSocket: () => {},
    // setLobbyCode: () => {},
    // setConnected: () => {},
};
const Home = () => {
    // const joinRoom = (e) => {
    //     e.preventDefault();
    //     if (!socket) {
    //         return;
    //     }
    //     socket.emit('lobby:join', name);
    // };

    useEffect(() => {
        // if (socket) {
        //     setSocket(
        //         io(`${process.env.REACT_APP_SERVER_API}`, {
        //             transports: ['websocket'],
        //         }),
        //     );
        // }
        // const socketio = io(`${process.env.REACT_APP_SERVER_API}`, {
        //     transports: ['websocket'],
        // });
    });

    return (
        <>
            <Helmet>
                <title>BS Card Game</title>
                <meta name="description" content="Home" />
            </Helmet>
            <div className="flex content-center items-center w-full h-full">
                HOME THIS IS HOME
                <CharacterCreation />
            </div>
        </>
    );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({}) => ({}),
    (dispatch) => ({
        // setLobbyCode: (value) => dispatch(setLobbyCodeAction(value)),
        // setSocket: (value) => dispatch(setSocketAction(value)),
        // setConnected: (value) => dispatch(setConnectedAction(value)),
    }),
)(Home);

export default WithReduxContainer;
