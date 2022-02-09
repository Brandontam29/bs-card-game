import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';

import { setPannelOpen as setPannelOpenAction } from '../../redux/actions/siteActions';

const propTypes = {
    players: AppPropTypes.players.isRequired,
};

const defaultProps = {};
const Game = ({ players, url }) => {
    const startGame = (history, url) => {
        history.push('/foo');
    };

    useEffect(() => {});

    return (
        <>
            <Helmet>
                <title>Don't get Caught Cheating</title>
                <meta name="description" content="Game" />
            </Helmet>
            {players.map((player) => (
                <div>
                    <b>{player.name}</b>
                    {player.avatar}
                </div>
            ))}
            <Route
                render={({ history }) => (
                    <button type="button" onClick={startGame(history, url)}>
                        Start Game
                    </button>
                )}
            />
        </>
    );
};

Game.propTypes = propTypes;
Game.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site }) => ({
        content: site.pannelContent,
        hidden: site.pannelOpen,
    }),
    (dispatch) => ({
        setPannelOpen: (value) => dispatch(setPannelOpenAction(value)),
    }),
)(Game);

export default WithReduxContainer;
