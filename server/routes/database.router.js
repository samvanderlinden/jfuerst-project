const express = require('express');
const Appointment = require('../models/Appointment');
const Calendar = require('../models/Calendar');

const router = express.Router();

router.get('/appointments', (req, res) => {
  Appointment.find({})
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      console.log('Error getting appointments from MongoDB: ', error);
      res.sendStatus(500);
    })
});

router.get('/calendars', (req, res) => {
  Calendar.find({})
    .then(response => {
      res.send(response)
    })
    .catch(error => {
      console.log('Error getting calendars from MongoDB: ', error);
      res.sendStatus(500);
    })
});



module.exports = router;
