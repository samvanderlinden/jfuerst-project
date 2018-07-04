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

export function callGetCalendarsFromDatabase() {
    return axios.get('/api/data/calendars')
    .then(response => response.data)
    .catch((error) => {
        throw error.response || error;
    });
}

export function callPopulateDatabaseCalendarsFromThirdPartyAPI() {
    return axios.get('api/acuity/calendars')
    .then(response => response.data)
    .catch((error) => {
        throw error.response || error;
    });
}

export function callPopulateDatabaseAppointmentsFromThirdPartyAPI(dateObject) {
    console.log('init CallPopulateDatabaseAppointmentsFromThirdPartyAPI with: ');
    const params = {
        minDate: dateObject.minDate,
        maxDate: dateObject.maxDate
    }
    console.log(params);
    return axios.get('/api/acuity/appointments', {params})
        .then(response => response.data)
        .catch((error) => {
            throw error.response || error;
        });
}

export function callPutUpdatedAppointmentToDatabase(updatedAppointment) {
    const params = updatedAppointment.databaseID;
    const body = updatedAppointment.updates;
    return axios.put(`/api/data/appointment/${params}`, body)
    .then(response => response.data)
    .catch((error) => {
        throw error.response || error;
    });
}

