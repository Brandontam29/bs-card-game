import { PropTypes } from 'prop-types';
import CloseButton from './CloseButton';

const propTypes = {
    closePannel: PropTypes.func.isRequired,
};

const defaultProps = {};

const Rules = ({ closePannel }) => {
    return (
        <>
            <div className="flex flex-row justify-between flex-grow m-2">
                <h2>The rules</h2>
                <CloseButton onClick={closePannel} />
            </div>
            <div className="flex flex-col gap-3 m-2">
                <section>
                    <h3>How to Win</h3>
                    <p>
                        The game ends when a player has played all of his cards. Those with the less
                        cards are placed higher.
                    </p>
                </section>

                <section className="flex flex-col gap-1.5">
                    <h3>How to Play</h3>
                    <p>Each player take turn playing 1-4 cards into the center pile face-down.</p>
                    <p>Any player can callout the cards that were just played.</p>
                </section>
                <section className="flex flex-col gap-1.5">
                    <h4>Glossary</h4>
                    <p>
                        <b>Callout: </b>
                        The cards that are just played are revealed. If they are all the right
                        cards, the player calling out takes the entire center pile.If the cards are
                        not the right ones, the player who placed them takes the entire pile.
                    </p>
                    <p>
                        <b>Jokers: </b>They serve as a wildcard (can substitute for any other card).
                    </p>
                </section>
            </div>
        </>
    );
};

Rules.propTypes = propTypes;
Rules.defaultProps = defaultProps;

export default Rules;
