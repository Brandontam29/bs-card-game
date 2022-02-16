import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const enahancers = compose(applyMiddleware(thunk));

const configureStore = () => createStore(reducers, enahancers);

export default configureStore;
