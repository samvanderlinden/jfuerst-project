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
          if (counter == markers.length - 1) {
            counter = 0;
          } else {
            counter++;
          }

        } else {
          //marker is already assign to photog

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

//Mileage table logic to only show each photog only once with the marker img and add all the travel distance/mileages of that photog together
const milesViewData = (state = [], action) => {
  console.log('---------ACTIONNNNNN', action)
  switch (action.type) {
    case MAP_ACTIONS.SET_MILES_VIEW_DATA:

      let photogArray = [];
      let markers = [];
      for (let i = 1; i < 21; i++) {
        markers.push(i + '.png');
      }

      let counter = 0;

      for (let i = 0; i < action.payload.length; i++) {

        let photogExist = false;

        //check if travel distant is undefine, if so continue to next appointment
        if(action.payload[i].driveDistanceToNextAppointment == null){
          continue;
        }

        for (let j = 0; j < photogArray.length; j++) {
          if (photogArray[j].photog == action.payload[i].calendar) {
            photogExist = true;
            // photogArray[j].miles += action.payload[i].travel_distance;
            console.log('distant i at ' + i, action.payload[i].driveDistanceToNextAppointment)
            photogArray[j].miles += parseFloat(action.payload[i].driveDistanceToNextAppointment);

            break;
          }
        }

        if (!photogExist) {
          // photogArray.push({ photog: action.payload[i].calendar, marker: markers[counter], miles: action.payload[i].travel_distance })
          photogArray.push({ photog: action.payload[i].calendar, marker: markers[counter], miles: parseFloat(action.payload[i].driveDistanceToNextAppointment) })

          if (counter == markers.length - 1) {
            counter = 0;
          } else {
            counter++;
          }
        }

      }
//End of mileage table only allow one one marker to show and add all the travel distance/mileages of the photog together

for (let i = 0; i < photogArray.length ; i++) {
  photogArray[i].miles = photogArray[i].miles.toFixed(2);
}

      return photogArray;
    default:
      return state;
  }
};

export default combineReducers({
  mapData,
  milesViewData,
});