import axios from 'axios';

export const getPile = (deck_id, pile_name) => {
    let response;
    axios
        .get({
            url: `https://deckofcardsapi.com/api/deck/${deck_id}/pile//${pile_name}/list/`,
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
