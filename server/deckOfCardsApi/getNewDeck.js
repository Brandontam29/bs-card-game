import axios from 'axios';
import HttpError from '../models/http-error.js';

export const getNewDeck = () => {
    return axios
        .get(
            'https://deckofcardsapi.com/api/deck/new/shuffle/?jokers_enabled=true',
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            const error = new HttpError(err.messsage, 500);
            return error;
        });
};

// const exmaple_response = {
//     success: true,
//     deck_id: '29dj3x5w4nf1',
//     remaining: 54,
//     shuffled: true,
// };
