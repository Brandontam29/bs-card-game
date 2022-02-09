const express = require('express');
// const { check } = require('express-validator');

const pileControllers = require('../controllers/pileControllers');

const router = express.Router();

router.get('/addToPile', pileControllers.addToPile);
router.get('/takePile', pileControllers.takePile);

module.exports = router;
