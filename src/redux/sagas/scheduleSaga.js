import { put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { SCHEDULE_ACTIONS } from '../actions/scheduleActions';
import {
    callGetAppointmentsFromDatabase,
    callGetDriveData,
    callGetCalendarsFromDatabase,
    callPopulateDatabaseAppointmentsFromThirdPartyAPI,
    callPopulateDatabaseAppointmentsWithGeoCoordinates,
    callPopulateDatabaseCalendarsFromThirdPartyAPI,
    callPutAppointmentsFromDatabaseToThirdPartyAPI,
    callPutUpdatedAppointmentToDatabase,
} from '../requests/scheduleRequests';
import {
    convertAppointmentsFromDatabase,
    convertAppointmentForSendingToDatabase,
    extractResourcesFromCalendars,
    orderEventsByResourceAndTime,
    resetEventEndTime,
    updateOriginsEventWithDriveData,
    updateScheduleReducerWithNewEvents,
} from '../../Functions/ScheduleFunctions';

function* initiateGetDriveData(locationsObject) {
    console.log('init initiateGetDriveData with locationsObject:');
    console.log(locationsObject)
    try {
        const driveData = yield callGetDriveData(locationsObject);
        yield console.log('response from server is drive data:');
        yield console.log(driveData)
        yield put({
            type: SCHEDULE_ACTIONS.SET_CURRENT_DRIVE_DATA,
            payload: driveData,
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
        yield callPopulateDatabaseAppointmentsWithGeoCoordinates();
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
        const appointmentsWithInitialDriveTimes = yield getInitialDriveData(convertedAppointmentsFromDataBase, convertedCalendarsFromDatabase);
        yield put({
            type: SCHEDULE_ACTIONS.SET_APPOINTMENTS_FROM_DATABASE,
            payload: appointmentsWithInitialDriveTimes,
        })
        // END UPDATE SCHEDULE REDUCER WITH CONVERTED DATA
    } catch (error) {
        console.log('POPULATE DATABASE WITH THIRD-PARTY APPOINTMENTS FAILED', error);
    }
}

function* getInitialDriveData(appointmentsArray, resourcesArray) {
    console.log('init getInitialDriveTimes');
    const events = appointmentsArray;
    const resources = resourcesArray;
    console.log(events);
    const nextEvents = events;
    let currentEvent;
    let locationsObject;
    let nextEvent;
    let updatedEvent;
    const arrayOfResourcesWithOrderedArraysOfEvents = orderEventsByResourceAndTime(resources, events);
    console.log('the array of resources with arrays of events is:');
    console.log(arrayOfResourcesWithOrderedArraysOfEvents);
    // loop through each resource array
    for (let i = 0; i < arrayOfResourcesWithOrderedArraysOfEvents.length; i++) {
        let currentResourceEvents = arrayOfResourcesWithOrderedArraysOfEvents[i];
        console.log('the current resource events array is: ');
        console.log(currentResourceEvents);
        // loop through event array
        for (let j = 0; j < currentResourceEvents.length - 1; j++) {
            const idx = events.indexOf(currentResourceEvents[j]);
            currentEvent = currentResourceEvents[j];
            // CASE: CURRENT EVENT IS IN THE PAST
            if (currentEvent.end < new Date()) {
                console.log('current event ends in the past. Drive data cannot be fetched');
            } else {
                nextEvent = currentResourceEvents[j + 1];
                console.log('current event is: ' + j + ' of ' + currentResourceEvents.length);
                console.log(currentEvent);
                console.log('Its index in events array is ' + idx);
                console.log('next event is:')
                console.log(nextEvent);
                locationsObject = {
                    origins: currentEvent,
                    destinations: nextEvent,
                }
                // GET DRIVE TIME BETWEEN CURRENT EVENT AND NEXT EVENT
                let currentDriveData = yield callGetDriveData(locationsObject);
                updatedEvent = yield updateOriginsEventWithDriveData(currentDriveData, currentEvent)
                nextEvents.splice(idx, 1, updatedEvent);
                console.log('updated nextEvents array:');
                console.log(nextEvents);
                console.log('returning events array');
            }
        }
    }
    return nextEvents;
} // END PARSE EVENTS ARRAY AND GET DRIVE TIMES BETWEEN EVENTS


function* putAppointmentToDataBase(action) {
    console.log('init putAppointmentsInDatabase');
    const updatedAppointmentObject = yield convertAppointmentForSendingToDatabase(action.payload);
    console.log('sending updated appointment to database:');
    console.log(updatedAppointmentObject);
    yield callPutUpdatedAppointmentToDatabase(updatedAppointmentObject);
}

function* initiatePutAppointmentsToThirdPartyAPI() {
    console.log('init putAppointmentsToThirdPartyAPI');
    try {
        const response = yield callPutAppointmentsFromDatabaseToThirdPartyAPI();
        console.log(response);
    } catch (error) {
        console.log('UPDATE THIRD-PARTY API WITH APPOINTMENTS FAILED', error);
    }

}

function* updateCurrentDate(action) {
    console.log('init updateCurrentDate');
    const newDate = action.payload;
    const dateObject = {
        minDate: action.payload,
        maxDate: action.payload
    }
    try {
        yield put({
            type: SCHEDULE_ACTIONS.SET_CURRENT_DATE,
            payload: newDate,
        })
        yield put({
            type: SCHEDULE_ACTIONS.GET_APPOINTMENTS_FROM_THIRDPARTY_API,
            payload: dateObject
        })
    } catch (error) {
        console.log('UPDATE CURRENT DATE FAILED', error);
    }
}

function* updateEventDriveDataUponEventMove(action) {
    console.log('init saga updateMovedEventWithDriveTime');
    const eventToUpdate = action.payload.originEvent;
    const eventAfterMovedEvent = action.payload.destinationEvent;
    const events = action.payload.events;
    let idx = events.indexOf(eventToUpdate);

    const locationsObject = {
        origins: eventToUpdate,
        destinations: eventAfterMovedEvent,
    };

    try {
        // RESET EVENT END TIME
        const end = yield resetEventEndTime(eventToUpdate.start, eventToUpdate.duration);
        yield console.log(`reset end time to ${end}`)
        let updatedEvent = { ...eventToUpdate, end};
        // END RESET EVENT END TIME

        // CALCULATE DRIVE DATA BETWEEN THE MOVED EVENT AND THE EVENT AFTER THE MOVED EVENT
        const currentDriveData = yield callGetDriveData(locationsObject);
        // END CALCULATE DRIVE DATA BETWEEN MOVED EVENT AND THE EVENT AFTER THE MOVED EVENT

        // UPDATE EVENT END TIME TO INCLUDE DRIVE TIME AND DISTANCE
        yield console.log('updating event with currentDriveData');
        updatedEvent = yield updateOriginsEventWithDriveData(currentDriveData, updatedEvent)
        // END UPDATE EVENT END TIME TO INCLUDE DRIVE TIME AND DISTANCE

        // UPDATE EVENTS ARRAY WITH UPDATED EVENT
        yield events.splice(idx, 1, updatedEvent);
        // END UPDATE EVENTS ARRAY WITH UPDATED EVENT

        yield console.log(updatedEvent);
        yield console.log('setting appointments to reducer from scheduleSaga');
        yield put({
            type: SCHEDULE_ACTIONS.SET_APPOINTMENTS_AFTER_DRAG_AND_DROP,
            payload: events
        })
        yield console.log('putting appointment to database from scheduleSaga:');
        yield put({
            type: SCHEDULE_ACTIONS.PUT_APPOINTMENT_TO_DATABASE,
            payload: updatedEvent
        })

    } catch (error) {
        console.log('UPDATE UPON EVENT MOVE FAILED', error);
    }
}

    function* updateDriveDataForMovedEventAndEventBeforeMovedEvent(action) {
        console.log('init saga updateDriveDataForMovedEventAndEventBeforeMovedEvent');
        const eventBeforeMovedEvent = action.payload.eventBeforeMovedEvent;
        const updatedMovedEvent = action.payload.updatedMovedEvent;
        const eventAfterMovedEvent = action.payload.eventAfterMovedEvent
        const events = action.payload.events;
        let currentDriveData;
        let end;
        let eventToUpdate;
        let idx;
        let locationsObject;
        let updatedEvent;
    
        try {

            // UPDATE MOVED EVENT
            eventToUpdate = updatedMovedEvent;
            locationsObject = {
                origins: eventToUpdate,
                destinations: eventAfterMovedEvent
            }
            idx = events.indexOf(eventToUpdate)
            // RESET EVENT END TIME
            end = yield resetEventEndTime(eventToUpdate.start, eventToUpdate.duration);
            yield console.log(`reset end time to ${end}`)
            updatedEvent = { ...eventToUpdate, end};
            // END RESET EVENT END TIME
    
            // CALCULATE DRIVE DATA BETWEEN THE MOVED EVENT AND THE EVENT AFTER THE MOVED EVENT
            currentDriveData = yield callGetDriveData(locationsObject);
            // END CALCULATE DRIVE DATA BETWEEN MOVED EVENT AND THE EVENT AFTER THE MOVED EVENT
    
            // UPDATE EVENT END TIME TO INCLUDE DRIVE TIME AND DISTANCE
            yield console.log('updating event with currentDriveData');
            updatedEvent = yield updateOriginsEventWithDriveData(currentDriveData, updatedEvent)
            // END UPDATE EVENT END TIME TO INCLUDE DRIVE TIME AND DISTANCE
    
            // UPDATE EVENTS ARRAY WITH UPDATED EVENT
            yield events.splice(idx, 1, updatedEvent);
            // END UPDATE EVENTS ARRAY WITH UPDATED EVENT
    
            yield console.log(updatedEvent);
            yield console.log('setting appointments to reducer from scheduleSaga');

            yield console.log('putting appointment to database from scheduleSaga:');
            yield put({
                type: SCHEDULE_ACTIONS.PUT_APPOINTMENT_TO_DATABASE,
                payload: updatedEvent
            })
            // END UPDATE MOVED EVENT

            // UPDATED EVENT BEFORE MOVED EVENT
            eventToUpdate = eventBeforeMovedEvent;
            locationsObject = {
                origins: eventBeforeMovedEvent,
                destinations: updatedMovedEvent
            }
            idx = events.indexOf(eventToUpdate)
            // RESET EVENT END TIME
            end = yield resetEventEndTime(eventToUpdate.start, eventToUpdate.duration);
            yield console.log(`reset end time to ${end}`)
            updatedEvent = { ...eventToUpdate, end};
            // END RESET EVENT END TIME
    
            // CALCULATE DRIVE DATA BETWEEN THE MOVED EVENT AND THE EVENT AFTER THE MOVED EVENT
            currentDriveData = yield callGetDriveData(locationsObject);
            // END CALCULATE DRIVE DATA BETWEEN MOVED EVENT AND THE EVENT AFTER THE MOVED EVENT
    
            // UPDATE EVENT END TIME TO INCLUDE DRIVE TIME AND DISTANCE
            yield console.log('updating event with currentDriveData');
            updatedEvent = yield updateOriginsEventWithDriveData(currentDriveData, updatedEvent)
            // END UPDATE EVENT END TIME TO INCLUDE DRIVE TIME AND DISTANCE
    
            // UPDATE EVENTS ARRAY WITH UPDATED EVENT
            yield events.splice(idx, 1, updatedEvent);
            // END UPDATE EVENTS ARRAY WITH UPDATED EVENT
    
            yield console.log(updatedEvent);
            yield console.log('setting appointments to reducer from scheduleSaga');

            yield console.log('putting appointment to database from scheduleSaga:');
            yield put({
                type: SCHEDULE_ACTIONS.PUT_APPOINTMENT_TO_DATABASE,
                payload: updatedEvent
            })
            // END UPDTAE EVENT BEFORE MOVED EVENT

            // INITIATE RE-RENDER OF UPDATED EVENTS
            yield put({
                type: SCHEDULE_ACTIONS.SET_APPOINTMENTS_AFTER_DRAG_AND_DROP,
                payload: events
            }) // END INITIATE RE-RENDER OF UPDATED EVENTS
        } catch (error) {
            console.log('UPDATE UPON EVENT MOVE FAILED', error);
        }
}

function* scheduleSaga() {
    yield takeLatest(SCHEDULE_ACTIONS.GET_DRIVE_DATA, initiateGetDriveData);
    yield takeLatest(SCHEDULE_ACTIONS.GET_APPOINTMENTS_FROM_THIRDPARTY_API, getAppointmentsFromThirdPartyAPI);
    yield takeLatest(SCHEDULE_ACTIONS.PUT_APPOINTMENT_TO_DATABASE, putAppointmentToDataBase);
    yield takeLatest(SCHEDULE_ACTIONS.PUT_APPOINTMENTS_TO_THIRDPARTY_API, initiatePutAppointmentsToThirdPartyAPI);
    yield takeLatest(SCHEDULE_ACTIONS.UPDATE_CURRENT_DATE, updateCurrentDate);
    yield takeLatest(SCHEDULE_ACTIONS.UPDATE_EVENT_UPON_MOVE, updateEventDriveDataUponEventMove);
    yield takeLatest(SCHEDULE_ACTIONS.UPDATE_MOVED_AND_BEFORE_MOVED, updateDriveDataForMovedEventAndEventBeforeMovedEvent);
}

export default scheduleSaga;