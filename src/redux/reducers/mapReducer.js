import { combineReducers } from 'redux';
import { MAP_ACTIONS } from '../actions/mapActions';

const mapData = (state= [], action) => {
    switch (action.type) {
        case MAP_ACTIONS.SET_DATA:
          return action.payload;
        default:
          return state;
    }
};

export default combineReducers({
    mapData,
  });