import { combineReducers } from 'redux';
import { SCHEDULE_ACTIONS } from '../actions/scheduleActions';

const currentDriveTime = (state = 35, action) => {
  switch (action.type) {
    case SCHEDULE_ACTIONS.SET_CURRENT_DRIVE_TIME:
      console.log('scheduleReducer is returning SET_CURRENT_DRIVE_TIME case with: ' + action.payload);
      return action.payload;
    default:
      console.log('scheduleReducer is returning default case.');
      return state;
  }
};

export default combineReducers({
  currentDriveTime,
});
