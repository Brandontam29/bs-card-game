import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { Route } from 'react-router-dom';
import { io } from 'socket.io-client';

import { connect } from 'react-redux';

import * as AppPropTypes from '../../../lib/PropTypes';

const propTypes = {
    socket: AppPropTypes.socket.isRequired,
    players: AppPropTypes.players,
};

const defaultProps = {
    players: [
        {
            name: 'hello',
            avatar: 'hello',
            points: 22,
        },
    ],
};

const WaitingRoom = ({ socket, players }) => {
    useEffect(() => {});

    return (
        <>
            <Helmet>
                <title>Don't Get Caught Cheating</title>
                <meta name="description" content="Game" />
            </Helmet>
            <div>
                Waiting Room
                {players.map((player) => (
                    <div key={player.id}>
                        <b>{player.name}</b>
                        {player.avatar}
                    </div>
                ))}
            </div>
        </>
    );
};

WaitingRoom.propTypes = propTypes;
WaitingRoom.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site }) => ({
        socket: site.socket,
        content: site.pannelContent,
        hidden: site.pannelOpen,
    }),
    (dispatch) => ({}),
)(WaitingRoom);

export default WithReduxContainer;
