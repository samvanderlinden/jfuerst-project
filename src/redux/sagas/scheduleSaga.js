import { put, takeLatest } from 'redux-saga/effects';
import { SCHEDULE_ACTIONS } from '../actions/scheduleActions';
import { callGetDriveTime } from '../requests/scheduleRequests';

function* initiateGetDriveTime(locationsObject) {
    console.log('init initateGetDriveTime');
    try {
        const driveTime = yield callGetDriveTime(locationsObject);
        yield console.log(driveTime);
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
