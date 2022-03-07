// const { validationResult } = require('express-validator');
// const mongoose = require('mongoose');

const HttpError = require('../models/http-error');

const getUserByAccountId = async (req, res, next) => {
    const accountId = req.params.uid;
    let user;
    try {
        user = await User.findOne({ accountId: accountId });
    } catch (err) {
        const error = new HttpError('Sorry, we could not find the user.', 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            'It seems that the user does not exist ',
            404,
        );
        return next(error);
    }

    res.json(JSON.stringify({ user }));
};

module.exports = { getUserByAccountId };
