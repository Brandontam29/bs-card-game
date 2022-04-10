import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'boring-avatars';

import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';
import { setPostGame } from '../../../../redux/actions/lobbyActions';
import { classNames } from '../../../../lib/classNames';
import PlayerCard from './PlayerCard';

const propTypes = {
    ranking: AppPropTypes.ranking.isRequired,
};

const defaultProps = {};

const PostGame = ({ ranking }) => {
    useEffect(() => {
        const id = setInterval(() => leavePostGame(), 5000);

        clearTimeout(id);
    }, [ranking]);

    const leavePostGame = () => {
        setPostGame(false);
    };

    return (
        <div
            className={classNames([
                'absolute h-[100vh] w-[100vw] top-0 left-0 ',
                'backdrop-blur-[1.5px] bg-black/40 hover:backdrop-blur-lg',
                'flex flex-col justify-center items-center',
            ])}
        >
            {ranking.length >= 2 && (
                <>
                    <div>
                        1<sup>st</sup>:{ranking[0].name} <PlayerCard player={ranking[0]} />
                    </div>
                    <div>
                        2<sup>st</sup>:{ranking[1].name}
                        <PlayerCard player={ranking[1]} />
                    </div>
                    ranking
                    {ranking.length >= 3 && (
                        <div>
                            3<sup>st</sup>:{ranking[2].name}
                            <PlayerCard player={ranking[2]} />
                        </div>
                    )}
                    <div>
                        {ranking.slice(3, ranking.length).map((player) => (
                            <div>
                                <div>{player.name}</div>
                                <PlayerCard player={player} />
                            </div>
                        ))}
                    </div>
                    <div>{ranking[1].name}</div>
                    <button type="button" onClick={leavePostGame} data-cy="leave_post_game">
                        Continue
                    </button>
                </>
            )}
        </div>
    );
};

PostGame.propTypes = propTypes;
PostGame.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ game }) => ({
        ranking: game.ranking,
    }),
    () => ({}),
)(PostGame);

export default WithReduxContainer;
