import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const enahancers = compose(applyMiddleware(thunk)) || window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const configureStore = () => createStore(
    reducers,
    enahancers,
);

export default configureStore;
