/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { PropTypes } from 'prop-types';
import styles from './ratings.module.css';

const propTypes = {
    rating: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

const defaultProps = {};

const Ratings = ({ rating, onChange }) => {
    const onClick = (e) => {
        onChange(e.target.value);
    };

    console.log(rating);

    return (
        <div className={styles.rating}>
            <input
                type="radio"
                id="star5"
                name="rate"
                value="5"
                {...(rating === 0 && { checked: false })}
                onChange={onClick}
            />
            <label htmlFor="star5" title="text" />
            <input
                type="radio"
                id="star4"
                name="rate"
                value="4"
                {...(rating === 0 && { checked: false })}
                onChange={onClick}
            />
            <label htmlFor="star4" title="text" />
            <input
                type="radio"
                id="star3"
                name="rate"
                value="3"
                {...(rating === 0 && { checked: false })}
                onChange={onClick}
            />
            <label htmlFor="star3" title="text" />
            <input
                type="radio"
                id="star2"
                name="rate"
                value="2"
                {...(rating === 0 && { checked: false })}
                onChange={onClick}
            />
            <label htmlFor="star2" title="text" />
            <input
                type="radio"
                id="star1"
                name="rate"
                value="1"
                {...(rating === 0 && { checked: false })}
                onChange={onClick}
            />
            <label htmlFor="star1" title="text" />
        </div>
    );
};

Ratings.propTypes = propTypes;
Ratings.defaultProps = defaultProps;

export default Ratings;
