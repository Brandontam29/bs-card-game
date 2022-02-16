import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';

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
    useEffect(() => {
        // console.log(players);
    });

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
    ({ site, lobby }) => ({
        socket: site.socket,
        content: site.pannelContent,
        hidden: site.pannelOpen,
        players: lobby.players,
    }),
    (dispatch) => ({}),
)(WaitingRoom);

export default WithReduxContainer;
