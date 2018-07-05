import { combineReducers } from 'redux';
import { MAP_ACTIONS } from '../actions/mapActions';

const mapData = (state= [], action) => {
    switch (action.type) {
        case MAP_ACTIONS.SET_DATA:
          console.log('data reducer return', action.payload);
          return action.payload;
        default:
          console.log('data default');
          return state;
    }
};

export default combineReducers({
    mapData,
  });