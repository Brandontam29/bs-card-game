// const { validationResult } = require('express-validator');
// const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Match = require('../models/matchModel');

const getMatchById = async (req, res, next) => {
    const matchId = req.params.mid;
    let match;
    try {
        match = await Match.findOne({ matchId: matchId });
    } catch (err) {
        const error = new HttpError('Sorry, we could not find the match.', 500);
        return next(error);
    }

    if (!match) {
        const error = new HttpError(
            'It seems that the match does not exist ',
            404,
        );
        return next(error);
    }

    res.json(JSON.stringify({ match }));
};

const postMatch = async (req, res, next) => {
    const matchId = req.params.mid;
    let match;
    try {
        match = await Match.findOne({ matchId: matchId });
    } catch (err) {
        const error = new HttpError('Sorry, we could not find the match.', 500);
        return next(error);
    }

    if (!match) {
        const error = new HttpError(
            'It seems that the match does not exist ',
            404,
        );
        return next(error);
    }

    res.json(JSON.stringify({ match }));
};
const test = async (req, res, next) => {
    res.json('data is here');
};
exports.getMatchById = getMatchById;
exports.postMatch = postMatch;
exports.test = test;
