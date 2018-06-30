import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import schedule from './scheduleReducer';

const store = combineReducers({
  user,
  login,
  schedule,
});

export default store;
