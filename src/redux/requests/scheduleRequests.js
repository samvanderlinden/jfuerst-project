import axios from 'axios';

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
    return axios.get('/api/acuity/appointments' , {params})
        .then(response => response.data)
        .catch((error) => {
            throw error.response || error;
        });
}