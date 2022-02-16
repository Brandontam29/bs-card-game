const propTypes = {};

const defaultProps = {};

const Rules = () => {
    return (
        <div>
            <h2>The rules</h2>
            <p>Each player take turn playing 1-4 cards into the center pile face-down.</p>
            <p>Any player can decide to call BS on another one for placing the wrong cards.</p>
            <p>
                When BS is called, the last cards a player placed is then revealed. If the cards are
                the right one, the player calling out takes the entire center pile. If the cards are
                not the right ones, the player who placed them takes the entire pile.
            </p>

            <p>
                When playing with Jokers, they serve as a wildcard (can substitute for any other
                card).
            </p>
            <p>The game ends when a player is out of cards.</p>
        </div>
    );
};

Rules.propTypes = propTypes;
Rules.defaultProps = defaultProps;

export default Rules;
