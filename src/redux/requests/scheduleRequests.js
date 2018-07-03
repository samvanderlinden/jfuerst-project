import axios from 'axios';
import moment from 'moment';
import {orderEventsByResourceAndTime} from '../../Functions/ScheduleFunctions';

export function callGetDriveTime(locationsObject) {
    const body = ({
        loactionA: locationsObject.locationA,
        locationB: locationsObject.locationB,
    });

    // TEMPORARY RANDOM NUMBER GENERATOR REPRESENTS MAPS API CALL FOR DRIVETIME
    return Math.floor(Math.random() * 60) + 15;

    //   return axios.get('api/routeHere', body)
    //     .then(response => response.data)
    //     .catch((error) => {
    //       throw error.response || error;
    //     });
}

export function callGetAppointmentsFromDatabase() {
    return axios.get('/api/data/appointments')
        .then(response => response.data)
        .catch((error) => {
            throw error.response || error;
        });
}

export function callGetInitialDriveTimes(appointmentsArray, resourcesArray) {
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
}

export function callPopulateDatabaseAppointmentsFromThirdPartyAPI(dateObject) {
    const params = {
        minDate: dateObject.minDate,
        maxDate: dateObject.maxDate
    }
    return axios.get('/api/acuity/appointments', {params})
        .then(response => response.data)
        .catch((error) => {
            throw error.response || error;
        });
}

export function convertAppointmentsFromDatabase(originalObject) {
    const objectConverter = originalObject => {
        let finalObject = {
            'id': originalObject.id,
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
    return convertedArrayOfAppointments
}

export function extractResourcesFromAppointments(originalObject) {
    const resourceExtractor = originalObject => {
        let extractedResource = originalObject.calendar;
        return extractedResource;
    }
    const resourceArray = originalObject.map(resourceExtractor);
    const uniqueResourcesArray = [...new Set(resourceArray)];
    const resourceList = uniqueResourcesArray.map(currentResource => {
        return {
            id: currentResource,
            title: currentResource
        }
    });
    return resourceList;
}