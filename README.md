# Cheat Card Game
Commonly known as "Cheat" or "Bullshit." It is a fun and fast-paced game played with a standard deck of playing cards. The objective of the game is to get rid of all your cards by successfully bluffing or "cheating" your way through the rounds.

## This was not meant to be production ready. Only for PRACTICE:

- TDD with Cypress
- Web Sockets with Socket.IO
- Frontend in general with React and libraries
- API Design with Express
- Consuming external APIs like the Deck of Cards API
- Databases with MongoDB and Mongoose

## Design Decisions
- Frontend is pure, and the backend is the single source of truth. The frontend derives its game logic and state logic all from the backend.
- Frontend is mostly composed of creating lobbies, joining lobbies, and representing game state (cards, turn, discard pile, actions available).

- Backend is RESTful, which means it is stateless and pure. Given an action and a game state, it will output the next game state to all users

## Why TDD + Unique Advantage
- Allows to make sure that the game logic is always correct. Important because there are many moving pieces, like move history, discard pile, cards in hand, hand size, and actions.
- **Unique advantage:** This allows me to simulate multiple players doing many actions synchronously. This would be nearly impossible to do manually.


