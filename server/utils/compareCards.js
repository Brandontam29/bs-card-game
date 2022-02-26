export const compareCards = (cardsArr, card) => {
    const index = cardsArr.findIndex((cardObj) => cardObj.value !== card);
    return index === -1;
};
