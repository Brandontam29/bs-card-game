import axios from 'axios';

export const getNewDeck = () => {
    let response;
    axios
        .get({
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?jokers_enabled=true',
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

// const exmaple_response = {
//     success: true,
//     deck_id: '29dj3x5w4nf1',
//     remaining: 54,
//     shuffled: true,
// };
