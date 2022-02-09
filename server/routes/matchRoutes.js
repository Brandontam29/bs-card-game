const express = require('express');
// const { check } = require('express-validator');

const matchControllers = require('../controllers/matchControllers');

const router = express.Router();

router.get('/:mid', matchControllers.getMatchById);
router.post('/:mid', matchControllers.postMatch);

module.exports = router;
