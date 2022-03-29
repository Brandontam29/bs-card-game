import { Server as ServerType, Socket as SocketType } from 'socket.io';

export type Socket = Readonly<SocketType>;
export type Server = Readonly<ServerType>;
export interface Card {
    code: string;
    image: string;
    images: {
        svg: string;
        png: string;
    };
    value: string;
    suit: string;
}

export interface Pile {
    remaining: number;
    cards?: Cards;
}

export type PileList = Readonly<{
    success: boolean;
    deck_id: string;
    remaining: number;
    piles: {
        [key: string]: Pile;
    };
}>;

export type Cards = [Card];

export interface Player {
    id: string;
    name: string;
    avatar: string;
}

export interface CardsLeft {
    [key: string]: number;
}

export interface ServerToClientEvents {
    'game:start_game': () => void;
    'game:get_hand': (lobby: string) => void;
    'game:play_card': (cards: Cards) => void;
    'game:callout': () => void;
    'game:restart_game': (lobby: string) => void;
}

export interface ClientToServerEvents {}

export interface InterServerEvents {}

export interface SocketData {}
