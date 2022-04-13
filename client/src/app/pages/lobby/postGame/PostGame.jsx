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
                'absolute h-full w-full top-0 left-0 ',
                'backdrop-blur-[1px] bg-black/50 ',
                'flex flex-col justify-center items-center',
            ])}
        >
            <div className="flex flex-row">
                <div>
                    1<sup>st</sup> <PlayerCard player={ranking[0]} />
                </div>
                <div>
                    2<sup>st</sup>
                    <PlayerCard player={ranking[1]} />
                </div>
                {ranking.length > 2 && (
                    <div>
                        3<sup>st</sup>
                        <PlayerCard player={ranking[2]} />
                    </div>
                )}
            </div>
            {ranking.length > 3 && (
                <div className="flex flex-row">
                    {ranking.slice(3, ranking.length).map((player) => (
                        <div>
                            <PlayerCard player={player} />
                        </div>
                    ))}
                </div>
            )}
            <button
                type="button"
                onClick={leavePostGame}
                data-cy="leave_post_game"
                className="rounded-md bg-sky-500 py-2 px-4 text-white"
            >
                Continue
            </button>
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
