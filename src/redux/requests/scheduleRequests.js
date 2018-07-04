import axios from 'axios';
import moment from 'moment';

export function callGetDriveTime(locationsObject) {
    const params = ({
        origins: `${locationsObject.origins.lat},${locationsObject.origins.lng}`,
        destinations: `${locationsObject.destinations.lat},${locationsObject.destinations.lon}`,
        departure_time: moment(locationsObject.origins.end).unix(),
        travel_mode: 'pessimistic',
        key: process.env.GOOGLE_API_KEY || null,
    });

    // TEMPORARY RANDOM NUMBER GENERATOR REPRESENTS MAPS API CALL FOR DRIVETIME
    // return Math.floor(Math.random() * 60) + 15;

      return axios.get('api/google/distance', {params})
        .then(response => response.data)
        .catch((error) => {
          throw error.response || error;
        });
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

