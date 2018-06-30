import { takeLatest } from 'redux-saga/effects';
import { SCHEDULE_ACTIONS } from '../actions/scheduleActions';
import {callGetDriveTime} from '../requests/scheduleRequests';

function* initiateGetDriveTime(locationsObject) {
    try {
        const driveTime = yield callGetDriveTime(locationsObject);
        return driveTime;
    } catch (error) {
        console.log('GET DRIVETIME FAILED', error);
    }
}

function* scheduleSaga() {
    yield takeLatest(SCHEDULE_ACTIONS.GET_DRIVE_TIME, initiateGetDriveTime);
}

export default scheduleSaga;
