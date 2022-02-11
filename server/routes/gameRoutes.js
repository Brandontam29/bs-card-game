const gameControllers = require('../controllers/gameControllers');

const routes = (io, socket) => {
    socket.on('game:joinRoom', gameControllers.joinRoom(io));
    socket.on('game:startGame', gameControllers.startGame(io));
    socket.on('game:playCard', gameControllers.playCard(io));
    socket.on('game:callBS', gameControllers.callBS(io));
    socket.on('game:winGame', gameControllers.winGame(io));
    socket.on('game:restartGame', gameControllers.restartGame(io));
};

module.exports = routes;
