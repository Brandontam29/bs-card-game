import axios from 'axios';

export const drawAllCards = (deck_id) => {
    let response;

    let cardCodes = '';
    cards.forEach((card) => {
        cardCodes += `${card.code},`;
    });

    axios
        .get({
            url: `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=54`,
        })
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            const error = new HttpError(err.messsage, 500);
            response = error;
        });

    return response;
};

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
