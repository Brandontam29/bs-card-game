import { useEffect } from 'react';
// import PropTypes from 'prop-types';
import Avatar from 'boring-avatars';

import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';
import { setPostGame } from '../../../../redux/actions/lobbyActions';

const propTypes = {
    ranks: AppPropTypes.socket.isRequired,
};

const defaultProps = {};

const PostGame = ({ ranks }) => {
    useEffect(() => {
        const id = setInterval(leavePostGame, 5000);

        clearTimeout(id);
    }, []);

    const leavePostGame = () => {
        setPostGame(false);
    };

    return (
        <div>
            <div>
                1<sup>st</sup>:{ranks[0].name}
            </div>
            <div>
                2<sup>st</sup>:{ranks[1].name}
            </div>
            ranks
            {ranks.length >= 3 && (
                <div>
                    3<sup>st</sup>:{ranks[2].name}
                </div>
            )}
            <div>
                {ranks.slice(3, ranks.length).map((player) => (
                    <div>
                        <div>{player.name}</div>
                        <Avatar name={player.avatar} square="true" variant="beam" size={60} />
                    </div>
                ))}
            </div>
            <div>{ranks[1].name}</div>
            <button type="button" onClick={leavePostGame} data-cy="leave_post_game">
                Continue
            </button>
        </div>
    );
};

PostGame.propTypes = propTypes;
PostGame.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ game }) => ({
        ranks: game.ranks,
    }),
    () => ({}),
)(PostGame);

export default WithReduxContainer;
