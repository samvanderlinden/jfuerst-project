import { put, takeLatest } from 'redux-saga/effects';
import { SCHEDULE_ACTIONS } from '../actions/scheduleActions';
import { callGetDriveTime } from '../requests/scheduleRequests';

function* initiateGetDriveTime(locationsObject) {
    console.log('init initateGetDriveTime');
    try {
        const driveTime = yield callGetDriveTime(locationsObject);
        yield console.log('response from server is drive time of: ' + driveTime + ' minutes');
        yield put({
            type: SCHEDULE_ACTIONS.SET_CURRENT_DRIVE_TIME,
            payload: driveTime,
        });
    } catch (error) {
        console.log('GET DRIVETIME FAILED', error);
    }
}

function* scheduleSaga() {
    yield takeLatest(SCHEDULE_ACTIONS.GET_DRIVE_TIME, initiateGetDriveTime);
}

export default scheduleSaga;



// TEST CASES
// NO EVENT BEFORE IN PREVIOUS ARRAY, NO EVENT AFTER IN PREVIOUS ARRAY 
// &&
// NO EVENT BEFORE IN NEW ARRAY, NO EVENT AFTER IN NEW ARRAY (passes)
// NO EVENT BEFORE IN NEW ARRAY, YES EVENT AFTER IN NEW ARRAY (passes)
// YES EVENT BEFORE IN NEW ARRAY, YES EVENT AFTER IN NEW ARRAY (passes);

// NO EVENT BEFORE IN PREVIOUS ARRAY, YES EVENT AFTER IN PREVIOUS ARRRAY
// &&
// NO EVENT BEFORE IN NEW ARRAY, NO EVENT AFTER IN NEW ARRAY   (passes)
// NO EVENT BEFORE IN NEW ARRAY, YES EVENT AFTER IN NEW ARRAY   (passes)
// YES EVENT BEFORE IN NEW ARRAY, YES EVENT AFTER IN NEW ARRAY (passes)


// YES EVENT BEFORE IN PREVIOUS ARRAY, YES EVENT AFTER IN PREVIOUS ARRAY
// &&
// NO EVENT BEFORE IN NEW ARRAY, NO EVENT AFTER IN NEW ARRAY (passes)
// NO EVENT BEFORE IN NEW ARRAY, YES EVENT AFTER IN NEW ARRAY (passes)
// YES EVENT BEFORE IN NEW ARRAY, YES EVENT AFTER IN NEW ARRAY (passes)

// MOVE TO END WITHIN OWN ARRAY
//&&
// NO EVENT BEFORE IN OWN ARRAY, NO EVENT AFTER IN OWN ARRAY  (passes)
// NO EVENT BEFORE IN OWN ARRAY, YES EVENT AFTER IN OWN ARRAY (configuration not possible by definition)
// YES EVENT BEFORE IN OWN ARRAY, NO EVENT AFTER IN OWN ARRAY (passes)

// MOVE TO BEGINNING WITHIN OWN ARRAY 
// &&
// NO EVENT BEFORE IN OWN ARRAY, NO EVENT AFTER IN OWN ARRAY (passes)
// NO EVENT BEFORE IN OWN ARRAY, YES EVENT AFTER IN OWN ARRAY (passes)

// MOVE TO IN-BETWEEN WITHIN OWN ARRAY
// &&
// YES EVENT BEFORE IN OWN ARRAY, YES EVENT AFTER ON OWN ARRAY   (fails - drive times update)