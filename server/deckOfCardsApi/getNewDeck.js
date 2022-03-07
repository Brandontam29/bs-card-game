const axios = require('axios');
const HttpError = require('../models/http-error.js');

const getNewDeck = async () => {
    const response = await axios
        .get(
            'https://deckofcardsapi.com/api/deck/new/shuffle/?jokers_enabled=true',
        )
        .then((res) => {
            const obj = {
                success: res.data.success,
                deck_id: res.data.deck_id,
                remaining: res.data.remaining,
                shuffled: res.data.shuffled,
            };

            return obj;
        })
        .catch((err) => {
            const error = new HttpError(err.messsage, 500);
            return error;
        });

    return response;
};

module.exports = getNewDeck;
// const exmaple_response = {
//     success: true,
//     deck_id: '29dj3x5w4nf1',
//     remaining: 54,
//     shuffled: true,
// };
