import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authUser from './auth';
import days from './days';
import intervals from './intervals';

export default (history) => combineReducers({
  router: connectRouter(history),
  authUser,
  days,
  intervals
})