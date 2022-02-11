import { combineReducers } from 'redux';

import siteReducer from './siteReducer';
import lobbyReducer from './lobbyReducer';
import gameReducer from './gameReducer';
import handReducer from './handReducer';
import playerReducer from './playerReducer';

export default combineReducers({
    site: siteReducer,
    lobby: lobbyReducer,
    game: gameReducer,
    hand: handReducer,
    player: playerReducer,
});
