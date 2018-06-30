import { combineReducers } from 'redux';
import { SCHEDULE_ACTIONS } from '../actions/scheduleActions';

const currentDriveTime = (state = null, action) => {
  switch (action.type) {
    case SCHEDULE_ACTIONS.SET_CURRENT_DRIVE_TIME:
      return action.payload || state;
    default:
      return state;
  }
};

export default combineReducers({
  currentDriveTime,
});
