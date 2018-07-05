const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const Appointment = require('../models/Appointment');
const Calendar = require('../models/Calendar');

const router = express.Router();

router.get('/appointments', rejectUnauthenticated, (req, res) => {
    Appointment.find({})
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      console.log('Error getting appointments from MongoDB: ', error);
      res.sendStatus(500);
    })
});

router.get('/calendars', rejectUnauthenticated, (req, res) => {
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
