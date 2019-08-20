import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authUser from './auth';
import days from './days';

export default (history) => combineReducers({
  router: connectRouter(history),
  authUser,
  days
})