import { put, takeLatest } from 'redux-saga/effects';
import { SCHEDULE_ACTIONS } from '../actions/scheduleActions';
import {
    callGetAppointmentsFromDatabase,
    callGetDriveTime,
    callGetCalendarsFromDatabase,
    callPopulateDatabaseAppointmentsFromThirdPartyAPI,
    callPopulateDatabaseCalendarsFromThirdPartyAPI,
    callPutAppointmentsFromDatabaseToThirdPartyAPI,
    callPutUpdatedAppointmentToDatabase,
} from '../requests/scheduleRequests';
import {
    convertAppointmentsFromDatabase,
    convertAppointmentForSendingToDatabase,
    extractResourcesFromCalendars,
    getInitialDriveTimes,
} from '../../Functions/ScheduleFunctions';

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
        // POPULATE THE DATABASE WITH DATA FROM THIRD-PARTY SCHEDULING API
        yield callPopulateDatabaseAppointmentsFromThirdPartyAPI(dateObject);
        yield callPopulateDatabaseCalendarsFromThirdPartyAPI();
        // END POPULATE THE DATABASE WITH DATA FROM THIRD-PARTY SCHEDULING API
        // GET DATA FROM DATABASE
        const rawAppointmentsFromDataBase = yield callGetAppointmentsFromDatabase();
        const rawCalendarListFromDatabase = yield callGetCalendarsFromDatabase();
        // END GET DATA FROM DATABASE
        // CONVERT DATA TO FORMAT USEABLE BY DRANG-AND-DORPCALENDAR LIBRARY
        const convertedCalendarsFromDatabase = yield extractResourcesFromCalendars(rawCalendarListFromDatabase);
        console.log('raw resource list is:');
        console.log(rawCalendarListFromDatabase);
        console.log('converted resource list is:');
        console.log(convertedCalendarsFromDatabase);
        const convertedAppointmentsFromDataBase = yield convertAppointmentsFromDatabase(rawAppointmentsFromDataBase);
        // END CONVERT DATA TO FORMAT USEABLE BY DRANG-AND-DORPCALENDAR LIBRARY
        // UPDATE SCHEDULE REDUCER WITH CONVERTED DATA
        yield put({
            type: SCHEDULE_ACTIONS.SET_RESOURCES,
            payload: convertedCalendarsFromDatabase,
        })
        const appointmentsWithInitialDriveTimes = yield getInitialDriveTimes(convertedAppointmentsFromDataBase, convertedCalendarsFromDatabase);
        yield put({
            type: SCHEDULE_ACTIONS.SET_APPOINTMENTS_FROM_DATABASE,
            payload: appointmentsWithInitialDriveTimes,
        })
        // END UPDATE SCHEDULE REDUCER WITH CONVERTED DATA
    } catch (error) {
        console.log('POPULATE DATABASE WITH THIRD-PARTY APPOINTMENTS FAILED', error);
    }
}

function* putAppointmentToDataBase(action) {
    console.log('init putAppointmentsInDatabase');
    const updatedAppointmentObject = yield convertAppointmentForSendingToDatabase(action.payload);
    console.log('sending updated appointment to database:');
    console.log(updatedAppointmentObject);
    yield callPutUpdatedAppointmentToDatabase(updatedAppointmentObject);
}

function* initiatePutAppointmentsToThirdPartyAPI(action) {
    console.log('init putAppointmentsToThirdPartyAPI');
    try {
        const response = yield callPutAppointmentsFromDatabaseToThirdPartyAPI();
        console.log(response);
    } catch (error) {
        console.log('UPDATE THIRD-PARTY API WITH APPOINTMENTS FAILED', error);
    }

}

function* scheduleSaga() {
    yield takeLatest(SCHEDULE_ACTIONS.GET_DRIVE_TIME, initiateGetDriveTime);
    yield takeLatest(SCHEDULE_ACTIONS.GET_APPOINTMENTS_FROM_THIRDPARTY_API, getAppointmentsFromThirdPartyAPI);
    yield takeLatest(SCHEDULE_ACTIONS.PUT_APPOINTMENT_TO_DATABASE, putAppointmentToDataBase);
    yield takeLatest(SCHEDULE_ACTIONS.PUT_APPOINTMENTS_TO_THIRDPARTY_API, initiatePutAppointmentsToThirdPartyAPI);
}

export default scheduleSaga;