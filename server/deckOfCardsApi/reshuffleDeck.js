const axios = require('axios');
const HttpError = require('../models/http-error.js');

const reshuffleDeck = async (deck_id) => {
    const response = await axios
        .post(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            const error = new HttpError(err.messsage, 500);
            return error;
        });

    return response;
};

module.exports = reshuffleDeck;
// const exampleResponse = {
//     success: true,
//     deck_id: 'ojfgzb2v6qdz',
//     remaining: 54,
//     shuffled: true,
// };
