import { combineReducers } from 'redux';

import siteReducer from './siteReducer';
import lobbyReducer from './lobbyReducer';
import gameReducer from './gameReducer';
import handReducer from './handReducer';

export default combineReducers({
    site: siteReducer,
    lobby: lobbyReducer,
    game: gameReducer,
    hand: handReducer,
});
