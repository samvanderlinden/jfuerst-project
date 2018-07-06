import { combineReducers } from 'redux';
import { MAP_ACTIONS } from '../actions/mapActions';

const mapData = (state = [], action) => {
  switch (action.type) {
    case MAP_ACTIONS.SET_DATA:

    //Logic for marker to display per photog
      let photogMarker = [];// contain objects == {photog, marker}
      let markers = [];// store marker image name
      for (let i = 1; i < 21; i++) {
        markers.push(i + '.png');
      }

      let counter = 0;// use to change the marker image for photog

      //looping through the appointment/action.payload data(array)
      for (let i = 0; i < action.payload.length; i++) {

        let photogMarkerIndex = -1;// initialize variable to -1 (false/out of bound)

        //looping thought the photogMarker to check if a marker is assign to the photog already
        for (let j = 0; j < photogMarker.length; j++) {
          if (photogMarker[j].photog == action.payload[i].calendar) {
            //if photog is assign set the photogMarkerIndex to the current index of j (which represent where the photog marker is store in photogMarker)
            photogMarkerIndex = j;
            break;
          }
        }

        //If no marker is assign to photog (-1 == does not exist in array)
        if (photogMarkerIndex == -1) {

          //Assign a new marker to current photog at i

          photogMarker.push({ photog: action.payload[i].calendar, marker: markers[counter] })// save assign marker to photog

          action.payload[i].marker = markers[counter];// adding the marker to the appointment/action.payload data(array) for photog at position i;

          //logic to increment counter so it dont go out of bound
          if(counter == markers.length - 1){
            counter = 0;
          }else{
            counter++; 
          }

        } else {
          //marker is alread assign to photog

          // adding the marker at photogMarkerIndex to the appointment/action.payload data(array) for photog at position i;
          action.payload[i].marker = photogMarker[photogMarkerIndex].marker;
        }

      }
      //End of logic for marker to display per photog

      return action.payload;
    default:
      return state;
  }
};

const milesViewData = (state = [], action) => {
  switch (action.type) {
    case MAP_ACTIONS.SET_MILES_VIEW_DATA:

    let photogArray = [];// contain objects == {photog, marker, miles}
    let markers = [];// store marker image name
    for (let i = 1; i < 21; i++) {
      markers.push(i + '.png');
    }

    let counter = 0;// use to change the marker image for photog

    //looping through the appointment/action.payload data(array)
    for (let i = 0; i < action.payload.length; i++) {

      let photogExist = false;

      //looping thought the photogMarker to check if a marker is assign to the photog already
      for (let j = 0; j < photogArray.length; j++) {
        if (photogArray[j].photog == action.payload[i].calendar) {
          //if photog is assign set the photogMarkerIndex to the current index of j (which represent where the photog marker is store in photogMarker)
          photogExist = true;
          photogArray[j].miles += action.payload[i].travel_distance;
          break;
        }
      }

      //If no marker is assign to photog (-1 == does not exist in array)
      if (!photogExist) {
        //Assign a new marker to current photog at i
        photogArray.push({ photog: action.payload[i].calendar, marker: markers[counter], miles: action.payload[i].travel_distance })// save assign marker to photog
        //logic to increment counter so it dont go out of bound
        if(counter == markers.length - 1){
          counter = 0;
        }else{
          counter++; 
        }
      }

    }
    //End of logic for marker to display per photog


      return photogArray;
    default:
      return state;
  }
};

export default combineReducers({
  mapData,
  milesViewData,
});