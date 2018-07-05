const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const axios = require('axios');


//Google Distance Matrix API call - calculates drive time from point A to point B based on time and traffic
router.get('/distance', (req, res) => {
  if (req.isAuthenticated()) {
  axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial`,
      params: {
          origins: '44.9780806,-93.2634508', //lat and long separated by , with no spaces
          destinations: '45.0626425,-93.20983', //lat and long separated by , with no spaces
          departure_time: '1530826200', //convert to Epoch time in seconds
          travel_mode: 'pessimistic',
          key: process.env.GOOGLE_API_KEY || NULL,
      }
  })
  .then((response) => {
      res.send(response.data.rows)
      console.log(response.data.rows)
  })
  .catch((error) => {
      console.log('error with distance GET to API', error);
  });
}
else {
  res.sendStatus(401);
  }
});

//Google Geocoding API - converts addresses to latitude and longitude
router.get('/geocode', (req, res) => {
  if (req.isAuthenticated()) {
  axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/geocode/json?`,
      params: {
          address: '5942 2nd Street NE, Fridley, MN', //street # street name, city, state - no suites, floors, or buildings
          key: process.env.GOOGLE_API_KEY || NULL,
      }
  })
  .then((response) => {
    console.log('',response.data.results)
      res.send(response.data.results)
  })
  .catch((error) => {
      console.log('error with geocode GET to API', error);
  });
}
else {
  res.sendStatus(401);
  }
});

//Post lat and lng to the database
router.post('/geocode', (req, res) => {
  if (req.isAuthenticated()) {
  const Appointment = req.body;
  console.log('POST: /geocode');
  Appointment.findByIdAndUpdate(req.body._id, req.body.lat, req.body.lng)
  .then(() => {
      res.sendStatus(200);
  })
  .catch((error) => {
      console.log('POST \'/geocode\' error:', error); 
      res.sendStatus(500); 
  })
  
}
else {
  res.sendStatus(401);
  }
});

//Get request to database for appointment locations
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
  console.log('GET /api/appointment');
  Appointment.findById(req.body.id, req.body.location).then((result) => {
  res.send(result);
  }).catch((error) => {
  console.log('Error GET /api/appointment locations', error)
  res.sendStatus(500);
  });
  } else {
  res.sendStatus(401);
  }
  })
  


module.exports = router;
