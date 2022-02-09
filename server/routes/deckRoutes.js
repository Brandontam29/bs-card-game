const express = require('express');
// const { check } = require('express-validator');

const deckControllers = require('../controllers/deckControllers');

const router = express.Router();

router.get('/getNewDeck', deckControllers.getNewDeck);
router.post('/dealCards/:numberOfCards', deckControllers.dealCards);
router.post('/reshuffleDeck', deckControllers.reshuffleDeck);

module.exports = router;
