import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';

import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { Server as ServerType, Socket } from './types';

import { messageHandlers as registerMessageHandlers } from './handlers/messageHandlers';
import { gameHandlers as registerGameHandlers } from './handlers/gameHandlers';
import { lobbyHandlers as registerLobbyHandlers } from './handlers/lobbyHandlers';

// const deckRoutes  = require('./routes/deckRoutes'));
// const pileRoutes  = require('./routes/pileRoutes'));
// const matchRoutes  = require('./routes/matchRoutes.js');
// const userRoutes  = require('./routes/userRoutes.js');

import { HttpError } from './errors/HttpError';

import 'dotenv/config';

const app = express();
app.use(bodyParser.json());

const user: string = encodeURIComponent(process.env.DB_USER || '');
const password: string = encodeURIComponent(process.env.DB_PASS || '');
const databaseName: string = encodeURIComponent(process.env.DB_NAME || '');

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
const onConnection = (io: ServerType, socket: Socket) => {
    registerLobbyHandlers(io, socket);
    registerGameHandlers(io, socket);
    registerMessageHandlers(io, socket);
};

// app.use('/api/user', userRoutes);
// app.use('/api/match', matchRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use(((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
}) as ErrorRequestHandler);

const port = 4000;

// Connections

mongoose
    .connect(uri)
    .then(() => {
        const server = app.listen(port, () => {
            console.log(`Cheat Card Game at http://localhost:${port}`);
        });

        const io = new Server(server);
        io.on('connection', (socket: Socket) => {
            console.log('connected');
            onConnection(io, socket);
        });
    })
    .catch((err: Error) => {
        console.error(err);
    });
