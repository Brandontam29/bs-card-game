// const { validationResult } = require('express-validator');
// const mongoose = require('mongoose');

const HttpError = require('../models/http-error');

const createNewPile = async (req, res, next) => {
    res.json(JSON.stringify({ match }));
};

const addToPile = async (req, res, next) => {
    res.json(JSON.stringify({ match }));
};

const takePile = async (req, res, next) => {
    res.json(JSON.stringify({ match }));
};

exports.createNewPile = createNewPile;
exports.addToPile = addToPile;
exports.takePile = takePile;
