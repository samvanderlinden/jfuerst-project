// do this stuff
// add calendarId key to BigCalendar object when importing form acuity


import moment from 'moment';
import {callGetDriveTime} from '../redux/requests/scheduleRequests';

// PARSE EVENTS ARRAY AND GET DRIVE TIMES BETWEEN EVENTS
export function getInitialDriveTimes(appointmentsArray, resourcesArray) {
    console.log('init getInitialDriveTimes');
    const events = appointmentsArray;
    const resources = resourcesArray;
    console.log(events);
    const nextEvents = events;
    let end;
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
            let currentEvent = currentResourceEvents[j];
            let nextEvent = currentResourceEvents[j + 1];
            console.log('current event is: '+j+' of '+currentResourceEvents.length);
            console.log(currentEvent);
            console.log('Its index in events array is ' + idx);
            console.log('next event is:')
            console.log(nextEvent);
            // GET DRIVE TIME BETWEEN CURRENT EVENT AND NEXT EVENT
            let currentDriveTime = callGetDriveTime(currentEvent.appointmentAddress, nextEvent.appointmentAddress);
            console.log('confirming that scheduleReducer state has currentDriveTime of: ' + currentDriveTime);
            // UPDATE EVENT END TIME TO INCLUDE DRIVE TIME
            end = moment(currentEvent.end).add(currentDriveTime, 'm').toDate();
            console.log(`after drive time, currentEvent's end is ${end}`);
            // UPDATE CURRENT EVENT'S END TIME TO INCLUDE DRIVE TIME TO NEXT EVENT
            updatedEvent = { ...currentEvent, end };
            console.log('current event start is' + updatedEvent.start);
            console.log('current event duration: ' + updatedEvent.duration);
            console.log('currentDriveTime is ' + currentDriveTime);
            console.log('confirming that end time is updated to: ' + updatedEvent.end);
            console.log('updated event is: ');
            console.log(updatedEvent);
            // UPDATE ARRAY OF EVENTS TO SHOW CURRENT EVENT'S DRIVE TIME
            nextEvents.splice(idx, 1, updatedEvent);
            console.log('updated nextEvents array:');
            console.log(nextEvents);
            console.log('returning events array');
        }
    }  
    return nextEvents;
} // END PARSE EVENTS ARRAY AND GET DRIVE TIMES BETWEEN EVENTS

// COMPARE START TIMES OF EVENTS FOR SORTING WITHIN THEIR RESOURCE ARRAY
export function compareEventStartTimes (eventA, eventB) {
    const startTimeA = eventA.start;
    const startTimeB = eventB.start;
    let comparison = 0;
    if (startTimeA > startTimeB) {
        comparison = 1;
    } else if (startTimeA < startTimeB) {
        comparison = -1;
    }
    return comparison;
} // END COMPARE START TIMES OF EVENTS FOR SORTING WITHIN THEIR RESOURCE ARRAY

// CONVERT JSON OBJECT FROM DATABASE TO OBJECT FOR DIGESTION BY CALENDAR LIBRARY
export function convertAppointmentsFromDatabase(originalObject) {
    const objectConverter = originalObject => {
        let finalObject = {
            'id': originalObject.id,
            'databaseID': originalObject._id,
            'title': `${originalObject.firstName} ${originalObject.lastName}`,
            // 'title': 'Mmmmmmmmmmmmmmmmmm',
            'isRecurrence': false,
            'patientName': 'SSSSSSSSSSSSS',
            'clinicianImage': '../src/img/doctor.png',
            'clinicianName': 'Dr Emmaaaaaaaaa Anderson',
            'appointmentType': originalObject.type,
            // 'appointmentType': 'Regular appointment',
            'appointmentTime': '8:00 PM - 10:30 PM',
            'appointmentAddress': originalObject.location,
            // 'appointmentAddress': 'ROOM NO 228-230, FIRST FLOOR, DISTRICT ADMINISTRATIVE COMPLEX, SECTOR 76, Sahibzada Ajit Singh Nagar, Chandigarh, 160055',
            'coPay': '4000',
            'soapNoteTitle': 'View Soap Note',
            'setProfileTitle': 'setProfileTitleAccessor',
            'staffs': [{
                'staffName': 'Morgan',
                'image': '../src/img/doctor.png',
                'link': ''
            },
            {
                'staffName': 'Jason',
                'image': '../src/img/doctor.png',
                'link': ''
            },
            {
                'staffName': 'Charlee',
                'image': '../src/img/doctor.png',
                'link': ''
            }
            ],
            'resourceId': originalObject.calendar,
            'calendarID': originalObject.calendarID,
            'calendar': originalObject.calendar,
            'start': moment(originalObject.datetime, 'YYYY-MM-DDTHH:mm:ssZ').toDate(),
            // 'start': new Date(2018, 5, 27, 15, 0, 0, 0),
            'end': moment(originalObject.datetime).add(Number(originalObject.duration), 'm').toDate(),
            // 'end': new Date(2018, 5, 27, 18, 0, 0, 0),
            'duration': originalObject.duration,
            'isRecurrenceEdit': false,
            'isEdit': true,
            'isDelete': true,
            'isDragable': true,
        };
        return finalObject;
    }
    const convertedArrayOfAppointments = originalObject.map(objectConverter);
    return convertedArrayOfAppointments;
} // END CONVERT JSON OBJECT FROM DATABASE TO OBJECT FOR DIGESTION BY CALENDAR LIBRARY

export function convertAppointmentForSendingToDatabase(updatedObject) {
        let finalObject = {
                "databaseID": updatedObject.databaseID,
                "updates": {
                    "time": moment(updatedObject.start).format('h:mma'),
                    "endTime": moment(updatedObject.start).add(Number(updatedObject.duration), 'm').format('h:mma'),
                    "datetime": moment(updatedObject.start).toDate(),
                    "calendar": updatedObject.calendar,
                    "calendarID": updatedObject.calendarID,
                }                
        };
    return finalObject;
}

// PARSE EVENTS ARRAY FOR UNIQUE RESOURCES AND BUILD A UNIQUE-RESOURCES ARRAY
export function extractResourcesFromCalendars(originalObject) {
    const resourceList = originalObject.map(currentResource => {
        return {
            id: currentResource.name,
            title: currentResource.name,
            calendarID: currentResource.id,
        }
    });
    return resourceList;
} // END PARSE EVENTS ARRAY FOR UNIQUE RESOURCES AND BUILD A UNIQUE-RESOURCES ARRAY

// ORDER ARRAY OF EVENTS BY TIME IN SUB-ARRAYS DEFINED BY EVENT RESOURCE
export function orderEventsByResourceAndTime(resourcesArray, eventsArray) {
    console.log('init orderEventsByResourceAndTime, given resources:');
    console.log(resourcesArray);
    console.log('and events: ');
    console.log(eventsArray);
    // create array to contain an array of events for each resource
    let arrayOfArrays = [];
    // creates an array of events for each resource
    for (let i = 0; i < resourcesArray.length; i++) {
        let currentResource = resourcesArray[i];
        let newArray = [];
        // each event is checked by resource id and pushed into that resources' array of events
        for (let j = 0; j < eventsArray.length; j++) {
            if (eventsArray[j].resourceId === currentResource.id) {
                newArray.push(eventsArray[j])
            }
        }
        newArray.sort(compareEventStartTimes);
        arrayOfArrays.push(newArray);
    }
    return arrayOfArrays;
}// END ORDER ARRAY OF EVENTS BY TIME IN SUB-ARRAYS DEFINED BY EVENT RESOURCE