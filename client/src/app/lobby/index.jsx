import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';

// import * as AppPropTypes from '../../lib/PropTypes';

import WaitingRoom from './waitingRoom';
import Game from './game';

const propTypes = { inGame: PropTypes.bool.isRequired };

const defaultProps = {};

const Lobby = ({ inGame }) => {
    useEffect(() => {});

    return (
        <>
            <Helmet>
                <title>Don't get Caught Cheating</title>
                <meta name="description" content="Lobby" />
            </Helmet>
            {inGame ? <Game /> : <WaitingRoom />}
        </>
    );
};

Lobby.propTypes = propTypes;
Lobby.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ lobby }) => ({
        inGame: lobby.inGame,
    }),
    (dispatch) => ({}),
)(Lobby);

export default WithReduxContainer;
