import { PropTypes } from 'prop-types';
import styles from './ratings.module.css';

const propTypes = {
    onChange: PropTypes.func.isRequired,
};

const defaultProps = {};

const Ratings = ({ onChange }) => {
    const onClick = (e) => {
        e.preventDefault();
        onChange(e.target.value);
    };

    return (
        <div className={styles.rating}>
            <input type="radio" name="rating" value="5" id="5" onChange={onClick} />
            <label htmlFor="5">☆</label>
            <input type="radio" name="rating" value="4" id="4" onChange={onClick} />
            <label htmlFor="4">☆</label>
            <input type="radio" name="rating" value="3" id="3" onChange={onClick} />
            <label htmlFor="3">☆</label>
            <input type="radio" name="rating" value="2" id="2" onChange={onClick} />
            <label htmlFor="2">☆</label>
            <input type="radio" name="rating" value="1" id="1" onChange={onClick} />
            <label htmlFor="1">☆</label>
        </div>
    );
};

Ratings.propTypes = propTypes;
Ratings.defaultProps = defaultProps;

export default Ratings;
