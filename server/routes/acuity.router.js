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
  let ignoredCalendars = ['*members', '*placeHolder', 'zPhotog', 'zSched'];
  unfilteredCalendars.forEach(calendar => {
    if (!ignoredCalendars.some(ignoredString => calendar.name.includes(ignoredString))) {
      filteredCalendars.push(calendar);
    }
  });
  return filteredCalendars;
}

router.get('/appointments', (req, res) => {
  if (req.isAuthenticated) {
    let appointmentsOptions = {
      // QUERY MUST INCLUDE MIN AND MAX DATES. FORMAT DATES AS STRING: 'MM/DD/YY'
      qs: {
        minDate: req.query.minDate,
        maxDate: req.query.maxDate,
      },
    };
    acuity.request('appointments', appointmentsOptions, function (error, response, appointments) {
      if (error) return console.error(error);
      (async () => {
        try {
          await Appointment.remove({});
          await Appointment.create(appointments);
          res.sendStatus(201);
        } catch (error) {
          throw error;
        }
      })().catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
    });
  } else {
    res.sendStatus(401);
  }
});

router.get('/calendars', (req, res) => {
  if (req.isAuthenticated) {
    acuity.request('calendars', function (error, response, calendars) {
      if (error) return console.error(error);
      (async () => {
        try {
          await Calendar.remove({});
          const filteredCalendars = await filterCalendars(calendars);
          await Calendar.create(filteredCalendars);
          res.sendStatus(201);
        } catch (error) {
          throw error;
        }
      })().catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
