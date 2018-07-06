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
  console.log(' getGeoCoordinates');
  return axios.get('/api/google/geocode',)
  .then(response => response.data)
  .catch((error) => {
      throw error.response || error;
  });
}


