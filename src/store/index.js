import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';

export default (history) => {
    return createStore(
        createRootReducer(history), // root reducer with router state
        applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            thunkMiddleware
        )
    );
}