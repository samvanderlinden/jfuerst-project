import axios from 'axios';

export function getData() {
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      return axios.get('api/data/appointments', config)
        .then(response => response.data)
        .catch((error) => { throw error; });
}


export function getGeoCoordinates() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
  console.log(' getGeoCoordinates');
  return axios.get('/api/google/geocode', config)
  .then(response => response.data)
  .catch((error) => {
    throw error;
  });
}

// export function getTravelDistance() {
//   console.log(' getTravelDistance');
//   return axios.get('/api/google/distance',)
//   .then(response => response.data)
//   .catch((error) => {
//     throw error;
//   });
// }


