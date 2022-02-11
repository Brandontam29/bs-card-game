import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';

const enahancers = composeWithDevTools(applyMiddleware(thunk));

const configureStore = () => createStore(reducers, enahancers);

export default configureStore;
