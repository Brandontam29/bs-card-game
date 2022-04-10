import PropTypes from 'prop-types';
import Avatar from 'boring-avatars';

const propTypes = {
    player: PropTypes.any.isRequired,
};

const defaultProps = {};

const PlayerCard = ({ player }) => {
    return (
        <div>
            <div>{player.name}</div>
            <Avatar name={player.avatar} square="true" variant="beam" size={60} />
            <div>{player.handSize}</div>
        </div>
    );
};

PlayerCard.propTypes = propTypes;
PlayerCard.defaultProps = defaultProps;
export default PlayerCard;
