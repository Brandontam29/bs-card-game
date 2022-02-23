import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';

import registerMessageHandlers from './handlers/messageHandlers.js';
import registerGameHandlers from './handlers/gameHandlers.js';
import registerLobbyHandlers from './handlers/lobbyHandlers.js';

// import deckRoutes from './routes/deckRoutes');
// import pileRoutes from './routes/pileRoutes');
// import matchRoutes from './routes/matchRoutes.js';
// import userRoutes from './routes/userRoutes.js';
import HttpError from './models/http-error.js';

import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(bodyParser.json());

const user = encodeURIComponent(process.env.DB_USER);
const password = encodeURIComponent(process.env.DB_PASS);
const databaseName = encodeURIComponent(process.env.DB_NAME);

const uri = `mongodb+srv://${user}:${password}@cluster0.rzpas.mongodb.net/${databaseName}?retryWrites=true&w=majority"`;

// CORS Protocol
app.use(
    cors({
        origin: `${process.env.CLIENT_ORIGIN}`,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        credentials: true,
    }),
);

// Routes
// const onConnection = (io, socket) => {
//     registerLobbyHandlers(io, socket);
//     registerGameHandlers(io, socket);
//     registerMessageHandlers(io, socket);
// };

// app.use('/api/user', userRoutes);
// app.use('/api/match', matchRoutes);

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

// Connections

mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => {
        const server = app.listen(port, () => {
            console.log(`BS Card Game at http://localhost:${port}`);
        });

        const io = new Server(server);
        io.on('connection', (socket) => {
            console.log('connected');
            registerMessageHandlers(io, socket);
            registerLobbyHandlers(io, socket);
            registerGameHandlers(io, socket);
        });
    })
    .catch((err) => {
        console.log(err);
    });
