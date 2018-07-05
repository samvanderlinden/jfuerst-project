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


