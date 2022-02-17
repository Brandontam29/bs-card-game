import axios from 'axios';

export const handToPile = (deck_id, pile_name, cards) => {
    let response;
    let cardCodes = '';
    cards.forEach((card) => {
        cardCodes += `${card.code},`;
    });

    axios
        .get({
            url: `https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pile_name}/add/?cards=${cardCodes}`,
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

// const exampleResponse = {
//     "success": true,
//     "deck_id": "3p40paa87x90",
//     "remaining": 12,
//     "piles": {
//         "discard": {
//             "remaining": 2
//         }
//     }
// }
