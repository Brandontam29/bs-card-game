const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const deckRoutes = require('./routes/deckRoutes');
const pileRoutes = require('./routes/pileRoutes');
const matchRoutes = require('./routes/matchRoutes');
const userRoutes = require('./routes/userRoutes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

const user = encodeURIComponent(process.env.DB_USER);
const password = encodeURIComponent(process.env.DB_PASS);
const databaseName = encodeURIComponent(process.env.DB_NAME);

const uri = `mongodb+srv://${user}:${password}@cluster0.rzpas.mongodb.net/${databaseName}?retryWrites=true&w=majority"`;

// CORS Protocol
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    }),
);

// Routes
app.use('/api/deck', deckRoutes);
app.use('/api/pile', pileRoutes);
app.use('/api/user', userRoutes);
app.use('/api/match', matchRoutes);

app.use('/', () => {
    console.log('hihi');
    return 'hihi';
});
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

const port = 4000;

mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`BS Card Game at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
