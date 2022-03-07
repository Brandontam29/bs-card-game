const axios = require('axios');
const HttpError = require('../models/http-error.js');

const drawAllCards = async (deck_id) => {
    const response = await axios
        .get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=54`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            const error = new HttpError(err.messsage, 500);
            return error;
        });

    return response;
};
module.exports = drawAllCards;

// const exmapleResponse = {
//     "success": true,
//     "cards": [
//         {
//             "image": "https://deckofcardsapi.com/static/img/KH.png",
//             "value": "KING",
//             "suit": "HEARTS",
//             "code": "KH"
//         },
//         {
//             "image": "https://deckofcardsapi.com/static/img/8C.png",
//             "value": "8",
//             "suit": "CLUBS",
//             "code": "8C"
//         }
//     ],
//     "deck_id":"3p40paa87x90",
//     "remaining": 50,
//     "error": "Not enough cards remaining to draw 54 additional"} MAYBE THIS LINE
// }
