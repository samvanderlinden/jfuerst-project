import axios from 'axios';

export function callGetDriveTime(locationsObject) {
    const body = ({
        loactionA: locationsObject.locationA,
        locationB: locationsObject.locationB,
    });

    return Math.floor(Math.random() * 60) + 15;

    //   return axios.get('api/routeHere', body)
    //     .then(response => response.data)
    //     .catch((error) => {
    //       throw error.response || error;
    //     });
}
