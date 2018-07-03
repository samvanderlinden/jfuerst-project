import axios from 'axios';
import moment from 'moment';

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
    return convertedArrayOfAppointments;
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