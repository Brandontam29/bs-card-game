const splitCards = (cardsArr, numOfPlayers) => {
    let hands = {};
    switch (numOfPlayers) {
        case 3: {
            hands.player1 = cardsArr.slice(0, 18);
            hands.player2 = cardsArr.slice(18, 36);
            hands.player3 = cardsArr.slice(36, 54);
        }
        case 4: {
            hands.player1 = cardsArr.slice(0, 14);
            hands.player2 = cardsArr.slice(14, 28);
            hands.player3 = cardsArr.slice(28, 41);
            hands.player4 = cardsArr.slice(41, 54);
        }
        case 5: {
            hands.player1 = cardsArr.slice(0, 11);
            hands.player2 = cardsArr.slice(11, 22);
            hands.player3 = cardsArr.slice(22, 33);
            hands.player4 = cardsArr.slice(33, 44);
            hands.player5 = cardsArr.slice(44, 54);
        }
        case 6: {
            hands.player1 = cardsArr.slice(0, 9);
            hands.player2 = cardsArr.slice(9, 18);
            hands.player3 = cardsArr.slice(18, 27);
            hands.player4 = cardsArr.slice(27, 36);
            hands.player5 = cardsArr.slice(36, 45);
            hands.player6 = cardsArr.slice(45, 54);
        }
        default: {
            hands.error = true;
        }
    }

    return hands;
};

module.exports = splitCards;
