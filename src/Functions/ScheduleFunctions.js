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
            'calendarID': originalObject.calendar,
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

export function convertAppointmentsFromCalendarForSendingToDatabase(updatedObject) {
    const objectConverter = updatedObject => {
        let finalObject = {
                "addonIDs": [],
                "forms": [
                    {
                        "id": 223282,
                        "name": "*Auditing",
                        "values": [
                            {
                                "id": 635047504,
                                "fieldID": 775651,
                                "value": "",
                                "name": "Minneapolis - RT Mileage from 55108 (enter \"z\" for zero, na for N/A)"
                            },
                            {
                                "id": 635047507,
                                "fieldID": 1522005,
                                "value": "",
                                "name": "Andover - RT Mileage from 55304 (enter \"z\" for zero, na for N/A)"
                            },
                            {
                                "id": 635047510,
                                "fieldID": 1522014,
                                "value": "",
                                "name": "Actual Listed Square Feet"
                            },
                            {
                                "id": 635047513,
                                "fieldID": 1522017,
                                "value": "",
                                "name": "Shift in package price"
                            },
                            {
                                "id": 635047516,
                                "fieldID": 1522230,
                                "value": "",
                                "name": "Market Center"
                            },
                            {
                                "id": 635047519,
                                "fieldID": 1705326,
                                "value": "",
                                "name": "Photog Schedule"
                            }
                        ]
                    },
                    {
                        "id": 109643,
                        "name": "5 Simple Steps to Awesome!",
                        "values": [
                            {
                                "id": 635047522,
                                "fieldID": 1950559,
                                "value": "No - only in an emergency",
                                "name": "Is the service start time flexible to occur at any point during the day you chose?"
                            },
                            {
                                "id": 635047525,
                                "fieldID": 704578,
                                "value": "no",
                                "name": "Have you booked a shoot with us before?"
                            },
                            {
                                "id": 635047528,
                                "fieldID": 1226873,
                                "value": "Agent",
                                "name": "Which best describes you?"
                            },
                            {
                                "id": 635047531,
                                "fieldID": 704587,
                                "value": "Bridge Realty",
                                "name": "Brokerage Name (if applicable)"
                            },
                            {
                                "id": 635047534,
                                "fieldID": 704596,
                                "value": "Team Espeland",
                                "name": "Team / Group Name (to sync with customer portal)"
                            },
                            {
                                "id": 635047537,
                                "fieldID": 1226879,
                                "value": "Referral (Please specify below)",
                                "name": "How did you find us?"
                            },
                            {
                                "id": 635047540,
                                "fieldID": 1226882,
                                "value": "Gail Wentzlaff",
                                "name": "If you chose Referral source not specified on the list, like a name, please tell us WHO! :)"
                            }
                        ]
                    },
                    {
                        "id": 56418,
                        "name": "Step 1: Details",
                        "values": [
                            {
                                "id": 635047543,
                                "fieldID": 246985,
                                "value": "2988 Victoria Street North, Roseville, MN, USA",
                                "name": "What is the Full Address of the property?   For ease of use, please include zip code."
                            },
                            {
                                "id": 635047546,
                                "fieldID": 278343,
                                "value": "",
                                "name": "Apartment / Unit / Suite #"
                            },
                            {
                                "id": 635047549,
                                "fieldID": 276700,
                                "value": "55113",
                                "name": "Zip code"
                            },
                            {
                                "id": 635047552,
                                "fieldID": 196787,
                                "value": "1755",
                                "name": "Square Footage of Property to be listed"
                            },
                            {
                                "id": 635047555,
                                "fieldID": 1305209,
                                "value": "Single Family",
                                "name": "Please describe the home type:"
                            },
                            {
                                "id": 635047558,
                                "fieldID": 196790,
                                "value": "Supra eKey (FREE!)",
                                "name": "How will we access the property?"
                            },
                            {
                                "id": 635047561,
                                "fieldID": 3059253,
                                "value": "No",
                                "name": "Does property owner have pets on site?"
                            },
                            {
                                "id": 635047564,
                                "fieldID": 4428491,
                                "value": "yes",
                                "name": "Will an agent/homeowner be present during the shoot?"
                            },
                            {
                                "id": 635047567,
                                "fieldID": 196791,
                                "value": "Josh Intemann",
                                "name": "Lockbox Combo & Location / Garage code / Name of person present"
                            },
                            {
                                "id": 635047570,
                                "fieldID": 223238,
                                "value": "6122743868",
                                "name": "Please tell us a good phone number to call in case photographer gets lost:"
                            },
                            {
                                "id": 635047573,
                                "fieldID": 247080,
                                "value": "3",
                                "name": "How many bedrooms?"
                            },
                            {
                                "id": 635047576,
                                "fieldID": 247081,
                                "value": "2",
                                "name": "How many bathrooms?"
                            },
                            {
                                "id": 635047579,
                                "fieldID": 314314,
                                "value": "upto 1 acre",
                                "name": "Which best approximates the land acreage to property?"
                            }
                        ]
                    },
                    {
                        "id": 56432,
                        "name": "Step 2: Freebies",
                        "values": [
                            {
                                "id": 635047582,
                                "fieldID": 248188,
                                "value": "no",
                                "name": "Fireplace Enhance  -  FREE"
                            },
                            {
                                "id": 635047585,
                                "fieldID": 248189,
                                "value": "yes",
                                "name": "TV Screen Enhance  -  FREE"
                            },
                            {
                                "id": 635047588,
                                "fieldID": 372267,
                                "value": "",
                                "name": "FOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. "
                            }
                        ]
                    },
                    {
                        "id": 109671,
                        "name": "Step 3: Add-ons",
                        "values": [
                            {
                                "id": 635047591,
                                "fieldID": 379334,
                                "value": "no",
                                "name": "Additional Condo / Association Common areas - Please describe in NOTES section  -  $10 each"
                            },
                            {
                                "id": 635047594,
                                "fieldID": 379333,
                                "value": "no",
                                "name": "Neighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each"
                            }
                        ]
                    },
                    {
                        "id": 56422,
                        "name": "Step 4: Notes",
                        "values": [
                            {
                                "id": 635047597,
                                "fieldID": 247083,
                                "value": "",
                                "name": "Notes:"
                            }
                        ]
                    },
                    {
                        "id": 56416,
                        "name": "Step 5: Terms and Conditions",
                        "values": [
                            {
                                "id": 635047600,
                                "fieldID": 4810558,
                                "value": "I Agree and Understand",
                                "name": "If I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked."
                            },
                            {
                                "id": 635047603,
                                "fieldID": 3038835,
                                "value": "I Agree - I have read and understand the terms and conditions",
                                "name": "Do you agree to terms and conditions?"
                            },
                            {
                                "id": 635047606,
                                "fieldID": 3038844,
                                "value": "I Agree",
                                "name": "I understand that the photographer will do no staging / cleaning and property will be assumed photo-ready."
                            }
                        ]
                    }
                ],
                "_id": "5b3a97269e5cbbe2f85810de",
                "id": 215664745,
                "firstName": "Josh",
                "lastName": "Intemann",
                "phone": "6122743868",
                "email": "josh@tcjosh.com",
                "date": "July 2, 2018",
                "time": "4:00pm",
                "endTime": "5:00pm",
                "dateCreated": "June 28, 2018",
                "datetimeCreated": "2018-06-28T22:39:37.000Z",
                "datetime": moment(updatedObject.start).format('YYYY-MM-DDTHH:mm:ss:SSSZ'),
                "price": "149.00",
                "priceSold": "149.00",
                "paid": "yes",
                "amountPaid": "149.00",
                "type": "MSP FusionTech™ Tour [1,601-2,500 sf]",
                "appointmentTypeID": 151862,
                "category": "MSP FusionTech™ Virtual Tours (Photography)",
                "duration": "60",
                "calendar": updatedObject.resourceId,
                "calendarID": updatedObject.resourceId,
                "location": "2988 Victoria Street North, Roseville, MN, USA",
                "notes": "Roseville\r\nS",
                "timezone": "America/Chicago",
                "calendarTimezone": "America/Chicago",
                "canceled": false,
                "canClientCancel": false,
                "canClientReschedule": false,
                "__v": 0
        };
        return finalObject;
    }
    const convertedArrayOfAppointments = updatedObject.map(objectConverter);
    return convertedArrayOfAppointments;
}

// PARSE EVENTS ARRAY FOR UNIQUE RESOURCES AND BUILD A UNIQUE-RESOURCES ARRAY
export function extractResourcesFromCalendars(originalObject) {
    // const resourceExtractor = originalObject => {
    //     let extractedResource = originalObject.calendar;
    //     return extractedResource;
    // }
    // const resourceArray = originalObject.map(resourceExtractor);
    // const uniqueResourcesArray = [...new Set(resourceArray)];
    const resourceList = originalObject.map(currentResource => {
        return {
            id: (currentResource.id).toString(),
            title: currentResource.name,
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