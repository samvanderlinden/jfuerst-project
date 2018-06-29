const express = require('express');
const Acuity = require('acuityscheduling');
const Appointment = require('../models/Appointment');
const Calendar = require('../models/Calendar');

const acuity = Acuity.basic({
  userId: process.env.ACUITY_USER_ID,
  apiKey: process.env.ACUITY_API_KEY
});

const router = express.Router();

const filterCalendars = (unfilteredCalendars) => {
  let filteredCalendars = [];
  unfilteredCalendars.forEach(calendar => {
    if(!calendar.name.includes('zPhotog') && !calendar.name.includes('zSched')) {
      filteredCalendars.push(calendar);
    }
  });
  return filteredCalendars;
}

router.get('/appointments', (req, res) => {
  let appointmentsOptions = {
    qs: {
      minDate: req.query.minDate,
      maxDate: req.query.maxDate,
    },
  };
  acuity.request('appointments', appointmentsOptions, function(error, response, appointments) {
    if (error) return console.error(error);
    (async () => {
      try {
        await Appointment.remove({});
        await Appointment.create(appointments);
        res.sendStatus(201);
      } catch(error) {
        throw error;
      }
    })().catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
  });
});

router.get('/calendars', (req, res) => {
  acuity.request('calendars', function(error, response, calendars) {
    if (error) return console.error(error);
    (async () => {
      try {
        await Calendar.remove({});
        const filteredCalendars = await filterCalendars(calendars);
        await Calendar.create(filteredCalendars);
        res.sendStatus(201);
      } catch(error) {
        throw error;
      }
    })().catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
  });
});

module.exports = router;
