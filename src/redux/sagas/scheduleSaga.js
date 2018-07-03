import { put, takeLatest } from 'redux-saga/effects';
import { SCHEDULE_ACTIONS } from '../actions/scheduleActions';
import {
    convertAppointmentsFromDatabase,
    callGetAppointmentsFromDatabase,
    callGetDriveTime,
    callPopulateDatabaseAppointmentsFromThirdPartyAPI,
    extractResourcesFromAppointments
} from '../requests/scheduleRequests';

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

function* getAppointmentsFromThirdPartyAPI(action) {
    console.log('init populateDatabaseAppointmentsFromThirdPartyAPI');
    console.log(action.payload);
    let dateObject = (action.payload)
    try {
        yield callPopulateDatabaseAppointmentsFromThirdPartyAPI(dateObject);
        const rawAppointmentsFromDataBase = yield callGetAppointmentsFromDatabase();
        const resourceList = yield extractResourcesFromAppointments(rawAppointmentsFromDataBase);
        const convertedAppointmentsFromDataBase = yield convertAppointmentsFromDatabase(rawAppointmentsFromDataBase);
        yield put({
            type: SCHEDULE_ACTIONS.SET_RESOURCES,
            payload: resourceList,
        })
        yield put({
            type: SCHEDULE_ACTIONS.SET_APPOINTMENTS_FROM_DATABASE,
            payload: convertedAppointmentsFromDataBase,
        })
    } catch (error) {
        console.log('POPULATE DATABASE WITH THIRD-PARTY APPOINTMENTS FAILED', error);
    }
}


function* scheduleSaga() {
    yield takeLatest(SCHEDULE_ACTIONS.GET_DRIVE_TIME, initiateGetDriveTime);
    yield takeLatest(SCHEDULE_ACTIONS.GET_APPOINTMENTS_FROM_THIRDPARTY_API, getAppointmentsFromThirdPartyAPI)
}

export default scheduleSaga;