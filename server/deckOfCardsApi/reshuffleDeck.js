import axios from 'axios';

export const reshuffleDeck = (deck_id) => {
    let response;

    axios
        .post(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle`)
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
//     success: true,
//     deck_id: 'ojfgzb2v6qdz',
//     remaining: 54,
//     shuffled: true,
// };
