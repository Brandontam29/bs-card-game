const express = require('express');
// const { check } = require('express-validator');

const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.get('/:uid', userControllers.getUserByAccountId);

module.exports = router;
