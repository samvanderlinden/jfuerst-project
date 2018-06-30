const moment = require('moment');

// HARDCODED DATA TO BE REPLACED BY LIVE GETS FROM THIRD-PARTY SCHEDULING API
const originalAcuityArray = [
{
      id: 212214338,
      firstName: 'Sheri',
      lastName: 'Wessel',
      phone: '6512707157',
      email: 'sheriwessel@kw.com',
      date: 'June 22, 2018',
      time: '3:30pm',
      endTime: '4:30pm',
      dateCreated: 'June 19, 2018',
      datetimeCreated: '2018-06-19T09:26:42-0500',
      datetime: '2018-06-22T15:30:00-0500',
      price: '149.00',
      priceSold: '149.00',
      paid: 'no',
      amountPaid: '0.00',
      type: 'MSP FusionTech™ Tour [1,601-2,500 sf]',
      appointmentTypeID: 151862,
      classID: null,
      addonIDs: [],
      category: 'MSP FusionTech™ Virtual Tours (Photography)',
      duration: '60',
      calendar: 'Photog 12',
      calendarID: 645334,
      certificate: null,
      confirmationPage: 'https://www.acuityscheduling.com/schedule.php?action=appt&owner=11229138&id%5B%5D=4a8d7052b04197c3aeb5f886b0de9174',
      formsText: 'Name: Sheri Wessel\nPhone: (651) 270-7157\nE-mail: sheriwessel@kw.com\nPrice: $149.00\n\nLocation\n============\n8105 Casper Way East, Inver Grove Heights, MN, USA\n\n\n*Auditing\n============\nMinneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A): z\n\nAndover - RT Mileage from 55304 (enter "z" for zero, na for N/A): z\n\nActual Listed Square Feet: \n\nShift in package price: \n\nMarket Center: \n\nPhotog Schedule: \n\n\n\n5 Simple Steps to Awesome!\n============\nIs the service start time flexible to occur at any point during the day you chose?: Yes - only within an hour\n\nHave you booked a shoot with us before?: yes\n\nWhich best describes you?: Agent\n\nBrokerage Name (if applicable): Keller Williams Premier Realty\n\nTeam / Group Name (to sync with customer portal): Sheri Wessel\n\nHow did you find us?: Referral (Please specify below)\n\nIf you chose Referral source not specified on the list, like a name, please tell us WHO! :): Lyn bockert agent\n\n\n\nStep 1: Details\n============\nWhat is the Full Address of the property?   For ease of use, please include zip code.: 8105 Casper Way East, Inver Grove Heights, MN, USA\n\nApartment / Unit / Suite #: \n\nZip code: 55076\n\nSquare Footage of Property to be listed: 1800\n\nPlease describe the home type:: Single Family\n\nHow will we access the property?: Lockbox\n\nDoes property owner have pets on site?: Yes - Dog\n\nWill an agent/homeowner be present during the shoot?: yes\n\nLockbox Combo & Location / Garage code / Name of person present: supra key\n\nPlease tell us a good phone number to call in case photographer gets lost:: 651-270-7157 sheri\n\nHow many bedrooms?: 3\n\nHow many bathrooms?: 2\n\nWhich best approximates the land acreage to property?: upto 1 acre\n\n\n\nStep 2: Freebies\n============\nFireplace Enhance  -  FREE: yes\n\nTV Screen Enhance  -  FREE: yes\n\nFOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. : \n\n\n\nStep 3: Add-ons\n============\nAdditional Condo / Association Common areas - Please describe in NOTES section  -  $10 each: no\n\nNeighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each: no\n\n\n\nStep 4: Notes\n============\nNotes:: Nice landscaping in the backyard - a few extra shots off the yard please\r\n\n\n\n\nStep 5: Terms and Conditions\n============\nIf I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.: I Agree and Understand\n\nDo you agree to terms and conditions?: I Agree - I have read and understand the terms and conditions\n\nI understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.: I Agree\n\n',
      forms: [
        {
          id: 223282,
          name: '*Auditing',
          values: [
            {
              id: 623146253,
              fieldID: 775651,
              value: 'z',
              name: 'Minneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A)'
            },
            {
              id: 623146256,
              fieldID: 1522005,
              value: 'z',
              name: 'Andover - RT Mileage from 55304 (enter "z" for zero, na for N/A)'
            },
            {
              id: 623146259,
              fieldID: 1522014,
              value: '',
              name: 'Actual Listed Square Feet'
            },
            {
              id: 623146262,
              fieldID: 1522017,
              value: '',
              name: 'Shift in package price'
            },
            {
              id: 623146265,
              fieldID: 1522230,
              value: '',
              name: 'Market Center'
            },
            {
              id: 623146268,
              fieldID: 1705326,
              value: '',
              name: 'Photog Schedule'
            }
          ]
        },
        {
          id: 109643,
          name: '5 Simple Steps to Awesome!',
          values: [
            {
              id: 623146271,
              fieldID: 1950559,
              value: 'Yes - only within an hour',
              name: 'Is the service start time flexible to occur at any point during the day you chose?'
            },
            {
              id: 623146274,
              fieldID: 704578,
              value: 'yes',
              name: 'Have you booked a shoot with us before?'
            },
            {
              id: 623146277,
              fieldID: 1226873,
              value: 'Agent',
              name: 'Which best describes you?'
            },
            {
              id: 623146280,
              fieldID: 704587,
              value: 'Keller Williams Premier Realty',
              name: 'Brokerage Name (if applicable)'
            },
            {
              id: 623146283,
              fieldID: 704596,
              value: 'Sheri Wessel',
              name: 'Team / Group Name (to sync with customer portal)'
            },
            {
              id: 623146286,
              fieldID: 1226879,
              value: 'Referral (Please specify below)',
              name: 'How did you find us?'
            },
            {
              id: 623146289,
              fieldID: 1226882,
              value: 'Lyn bockert agent',
              name: 'If you chose Referral source not specified on the list, like a name, please tell us WHO! :)'
            }
          ]
        },
        {
          id: 56418,
          name: 'Step 1: Details',
          values: [
            {
              id: 623146292,
              fieldID: 246985,
              value: '8105 Casper Way East, Inver Grove Heights, MN, USA',
              name: 'What is the Full Address of the property?   For ease of use, please include zip code.'
            },
            {
              id: 623146295,
              fieldID: 278343,
              value: '',
              name: 'Apartment / Unit / Suite #'
            },
            {
              id: 623146298,
              fieldID: 276700,
              value: '55076',
              name: 'Zip code'
            },
            {
              id: 623146301,
              fieldID: 196787,
              value: '1800',
              name: 'Square Footage of Property to be listed'
            },
            {
              id: 623146304,
              fieldID: 1305209,
              value: 'Single Family',
              name: 'Please describe the home type:'
            },
            {
              id: 623146307,
              fieldID: 196790,
              value: 'Lockbox',
              name: 'How will we access the property?'
            },
            {
              id: 623146310,
              fieldID: 3059253,
              value: 'Yes - Dog',
              name: 'Does property owner have pets on site?'
            },
            {
              id: 623146313,
              fieldID: 4428491,
              value: 'yes',
              name: 'Will an agent/homeowner be present during the shoot?'
            },
            {
              id: 623146316,
              fieldID: 196791,
              value: 'supra key',
              name: 'Lockbox Combo & Location / Garage code / Name of person present'
            },
            {
              id: 623146319,
              fieldID: 223238,
              value: '651-270-7157 sheri',
              name: 'Please tell us a good phone number to call in case photographer gets lost:'
            },
            {
              id: 623146322,
              fieldID: 247080,
              value: '3',
              name: 'How many bedrooms?'
            },
            {
              id: 623146325,
              fieldID: 247081,
              value: '2',
              name: 'How many bathrooms?'
            },
            {
              id: 623146328,
              fieldID: 314314,
              value: 'upto 1 acre',
              name: 'Which best approximates the land acreage to property?'
            }
          ]
        },
        {
          id: 56432,
          name: 'Step 2: Freebies',
          values: [
            {
              id: 623146331,
              fieldID: 248188,
              value: 'yes',
              name: 'Fireplace Enhance  -  FREE'
            },
            {
              id: 623146334,
              fieldID: 248189,
              value: 'yes',
              name: 'TV Screen Enhance  -  FREE'
            },
            {
              id: 623146337,
              fieldID: 372267,
              value: '',
              name: 'FOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. '
            }
          ]
        },
        {
          id: 109671,
          name: 'Step 3: Add-ons',
          values: [
            {
              id: 623146340,
              fieldID: 379334,
              value: 'no',
              name: 'Additional Condo / Association Common areas - Please describe in NOTES section  -  $10 each'
            },
            {
              id: 623146343,
              fieldID: 379333,
              value: 'no',
              name: 'Neighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each'
            }
          ]
        },
        {
          id: 56422,
          name: 'Step 4: Notes',
          values: [
            {
              id: 623146346,
              fieldID: 247083,
              value: 'Nice landscaping in the backyard - a few extra shots off the yard please\r\n',
              name: 'Notes:'
            }
          ]
        },
        {
          id: 56416,
          name: 'Step 5: Terms and Conditions',
          values: [
            {
              id: 623146349,
              fieldID: 4810558,
              value: 'I Agree and Understand',
              name: 'If I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.'
            },
            {
              id: 623146352,
              fieldID: 3038835,
              value: 'I Agree - I have read and understand the terms and conditions',
              name: 'Do you agree to terms and conditions?'
            },
            {
              id: 623146355,
              fieldID: 3038844,
              value: 'I Agree',
              name: 'I understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.'
            }
          ]
        }
      ],
      location: '8105 Casper Way East, Inver Grove Heights, MN, USA',
      notes: 'm\r\nIGH\r\nS',
      timezone: 'America/Chicago',
      calendarTimezone: 'America/Chicago',
      canceled: false,
      canClientCancel: false,
      canClientReschedule: false
    },
    {
      id: 212064649,
      firstName: 'Heather',
      lastName: 'Peterson',
      phone: '7632180708',
      email: 'heatherpeterson@edinarealty.com',
      date: 'June 22, 2018',
      time: '3:30pm',
      endTime: '4:15pm',
      dateCreated: 'June 18, 2018',
      datetimeCreated: '2018-06-18T19:07:11-0500',
      datetime: '2018-06-22T15:30:00-0500',
      price: '129.00',
      priceSold: '129.00',
      paid: 'no',
      amountPaid: '0.00',
      type: 'MSP FusionTech™ Tour [up to 1,600 sf]',
      appointmentTypeID: 151853,
      classID: null,
      addonIDs: [],
      category: 'MSP FusionTech™ Virtual Tours (Photography)',
      duration: '45',
      calendar: 'Photog 15',
      calendarID: 1179192,
      certificate: null,
      confirmationPage: 'https://www.acuityscheduling.com/schedule.php?action=appt&owner=11229138&id%5B%5D=9bb0ff02ce1ffc88e7ca2bf5820d0d5c',
      formsText: 'Name: Heather Peterson\nPhone: (763) 218-0708\nE-mail: heatherpeterson@edinarealty.com\nPrice: $129.00\n\nLocation\n============\n17188 Polk St NW, Elk River, MN, USA\n\n\n*Auditing\n============\nMinneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A): 64.350\n\nAndover - RT Mileage from 55304 (enter "z" for zero, na for N/A): z\n\nActual Listed Square Feet: \n\nShift in package price: \n\nMarket Center: \n\nPhotog Schedule: \n\n\n\n5 Simple Steps to Awesome!\n============\nIs the service start time flexible to occur at any point during the day you chose?: No - only in an emergency\n\nHave you booked a shoot with us before?: yes\n\nWhich best describes you?: Agent\n\nBrokerage Name (if applicable): \n\nTeam / Group Name (to sync with customer portal): Heather Peterson \n\nHow did you find us?: Repeat Customer\n\nIf you chose Referral source not specified on the list, like a name, please tell us WHO! :): \n\n\n\nStep 1: Details\n============\nWhat is the Full Address of the property?   For ease of use, please include zip code.: 17188 Polk St NW, Elk River, MN, USA\n\nApartment / Unit / Suite #: \n\nZip code: 55330\n\nSquare Footage of Property to be listed: 1472\n\nPlease describe the home type:: Townhome\n\nHow will we access the property?: Lockbox\n\nDoes property owner have pets on site?: No\n\nWill an agent/homeowner be present during the shoot?: no\n\nLockbox Combo & Location / Garage code / Name of person present: 0827 Lynn \n\nPlease tell us a good phone number to call in case photographer gets lost:: \n\nHow many bedrooms?: 2\n\nHow many bathrooms?: 2\n\nWhich best approximates the land acreage to property?: upto 1 acre\n\n\n\nStep 2: Freebies\n============\nFireplace Enhance  -  FREE: yes\n\nTV Screen Enhance  -  FREE: yes\n\nFOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. : \n\n\n\nStep 3: Add-ons\n============\nAdditional Condo / Association Common areas - Please describe in NOTES section  -  $10 each: no\n\nNeighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each: no\n\n\n\nStep 4: Notes\n============\nNotes:: \n\n\n\nStep 5: Terms and Conditions\n============\nIf I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.: I Agree and Understand\n\nDo you agree to terms and conditions?: I Agree - I have read and understand the terms and conditions\n\nI understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.: I Agree\n\n',
      forms: [
        {
          id: 223282,
          name: '*Auditing',
          values: [
            {
              id: 622642300,
              fieldID: 775651,
              value: '64.350',
              name: 'Minneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A)'
            },
            {
              id: 622642306,
              fieldID: 1522005,
              value: 'z',
              name: 'Andover - RT Mileage from 55304 (enter "z" for zero, na for N/A)'
            },
            {
              id: 622642312,
              fieldID: 1522014,
              value: '',
              name: 'Actual Listed Square Feet'
            },
            {
              id: 622642315,
              fieldID: 1522017,
              value: '',
              name: 'Shift in package price'
            },
            {
              id: 622642318,
              fieldID: 1522230,
              value: '',
              name: 'Market Center'
            },
            {
              id: 622642321,
              fieldID: 1705326,
              value: '',
              name: 'Photog Schedule'
            }
          ]
        },
        {
          id: 109643,
          name: '5 Simple Steps to Awesome!',
          values: [
            {
              id: 622642324,
              fieldID: 1950559,
              value: 'No - only in an emergency',
              name: 'Is the service start time flexible to occur at any point during the day you chose?'
            },
            {
              id: 622642327,
              fieldID: 704578,
              value: 'yes',
              name: 'Have you booked a shoot with us before?'
            },
            {
              id: 622642330,
              fieldID: 1226873,
              value: 'Agent',
              name: 'Which best describes you?'
            },
            {
              id: 622642333,
              fieldID: 704587,
              value: '',
              name: 'Brokerage Name (if applicable)'
            },
            {
              id: 622642336,
              fieldID: 704596,
              value: 'Heather Peterson ',
              name: 'Team / Group Name (to sync with customer portal)'
            },
            {
              id: 622642339,
              fieldID: 1226879,
              value: 'Repeat Customer',
              name: 'How did you find us?'
            },
            {
              id: 622642342,
              fieldID: 1226882,
              value: '',
              name: 'If you chose Referral source not specified on the list, like a name, please tell us WHO! :)'
            }
          ]
        },
        {
          id: 56418,
          name: 'Step 1: Details',
          values: [
            {
              id: 622642345,
              fieldID: 246985,
              value: '17188 Polk St NW, Elk River, MN, USA',
              name: 'What is the Full Address of the property?   For ease of use, please include zip code.'
            },
            {
              id: 622642348,
              fieldID: 278343,
              value: '',
              name: 'Apartment / Unit / Suite #'
            },
            {
              id: 622642351,
              fieldID: 276700,
              value: '55330',
              name: 'Zip code'
            },
            {
              id: 622642354,
              fieldID: 196787,
              value: '1472',
              name: 'Square Footage of Property to be listed'
            },
            {
              id: 622642357,
              fieldID: 1305209,
              value: 'Townhome',
              name: 'Please describe the home type:'
            },
            {
              id: 622642360,
              fieldID: 196790,
              value: 'Lockbox',
              name: 'How will we access the property?'
            },
            {
              id: 622642363,
              fieldID: 3059253,
              value: 'No',
              name: 'Does property owner have pets on site?'
            },
            {
              id: 622642366,
              fieldID: 4428491,
              value: 'no',
              name: 'Will an agent/homeowner be present during the shoot?'
            },
            {
              id: 622642369,
              fieldID: 196791,
              value: '0827 Lynn ',
              name: 'Lockbox Combo & Location / Garage code / Name of person present'
            },
            {
              id: 622642372,
              fieldID: 223238,
              value: '',
              name: 'Please tell us a good phone number to call in case photographer gets lost:'
            },
            {
              id: 622642375,
              fieldID: 247080,
              value: '2',
              name: 'How many bedrooms?'
            },
            {
              id: 622642378,
              fieldID: 247081,
              value: '2',
              name: 'How many bathrooms?'
            },
            {
              id: 622642381,
              fieldID: 314314,
              value: 'upto 1 acre',
              name: 'Which best approximates the land acreage to property?'
            }
          ]
        },
        {
          id: 56432,
          name: 'Step 2: Freebies',
          values: [
            {
              id: 622642384,
              fieldID: 248188,
              value: 'yes',
              name: 'Fireplace Enhance  -  FREE'
            },
            {
              id: 622642387,
              fieldID: 248189,
              value: 'yes',
              name: 'TV Screen Enhance  -  FREE'
            },
            {
              id: 622642390,
              fieldID: 372267,
              value: '',
              name: 'FOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. '
            }
          ]
        },
        {
          id: 109671,
          name: 'Step 3: Add-ons',
          values: [
            {
              id: 622642393,
              fieldID: 379334,
              value: 'no',
              name: 'Additional Condo / Association Common areas - Please describe in NOTES section  -  $10 each'
            },
            {
              id: 622642396,
              fieldID: 379333,
              value: 'no',
              name: 'Neighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each'
            }
          ]
        },
        {
          id: 56422,
          name: 'Step 4: Notes',
          values: [
            {
              id: 622642399,
              fieldID: 247083,
              value: '',
              name: 'Notes:'
            }
          ]
        },
        {
          id: 56416,
          name: 'Step 5: Terms and Conditions',
          values: [
            {
              id: 622642402,
              fieldID: 4810558,
              value: 'I Agree and Understand',
              name: 'If I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.'
            },
            {
              id: 622642405,
              fieldID: 3038835,
              value: 'I Agree - I have read and understand the terms and conditions',
              name: 'Do you agree to terms and conditions?'
            },
            {
              id: 622642408,
              fieldID: 3038844,
              value: 'I Agree',
              name: 'I understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.'
            }
          ]
        }
      ],
      location: '17188 Polk St NW, Elk River, MN, USA',
      notes: 'm\r\nElk River\r\nM',
      timezone: 'America/Chicago',
      calendarTimezone: 'America/Chicago',
      canceled: false,
      canClientCancel: false,
      canClientReschedule: false
    },
    {
      id: 212119212,
      firstName: 'Jason',
      lastName: 'Bestler',
      phone: '6129860899',
      email: 'jason.bestler@gmail.com',
      date: 'June 22, 2018',
      time: '2:00pm',
      endTime: '3:00pm',
      dateCreated: 'June 18, 2018',
      datetimeCreated: '2018-06-18T23:10:09-0500',
      datetime: '2018-06-22T14:00:00-0500',
      price: '149.00',
      priceSold: '149.00',
      paid: 'no',
      amountPaid: '0.00',
      type: 'MSP FusionTech™ Tour [1,601-2,500 sf]',
      appointmentTypeID: 151862,
      classID: null,
      addonIDs: [],
      category: 'MSP FusionTech™ Virtual Tours (Photography)',
      duration: '60',
      calendar: 'Photog 12',
      calendarID: 645334,
      certificate: null,
      confirmationPage: 'https://www.acuityscheduling.com/schedule.php?action=appt&owner=11229138&id%5B%5D=a0faa0ba81abb1290e23a1915103181e',
      formsText: 'Name: Jason Bestler\nPhone: (612) 986-0899\nE-mail: jason.bestler@gmail.com\nPrice: $149.00\n\nLocation\n============\n5500 11th Ave S\n\n\n*Auditing\n============\nMinneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A): z\n\nAndover - RT Mileage from 55304 (enter "z" for zero, na for N/A): z\n\nActual Listed Square Feet: \n\nShift in package price: \n\nMarket Center: \n\nPhotog Schedule: \n\n\n\n5 Simple Steps to Awesome!\n============\nIs the service start time flexible to occur at any point during the day you chose?: Yes - Any time\n\nHave you booked a shoot with us before?: yes\n\nWhich best describes you?: Agent\n\nBrokerage Name (if applicable): Bridge Realty\n\nTeam / Group Name (to sync with customer portal): No team\n\nHow did you find us?: Preferred Vendor List\n\nIf you chose Referral source not specified on the list, like a name, please tell us WHO! :): \n\n\n\nStep 1: Details\n============\nWhat is the Full Address of the property?   For ease of use, please include zip code.: 5500 11th Ave S\n\nApartment / Unit / Suite #: \n\nZip code: 55417\n\nSquare Footage of Property to be listed: 2500\n\nPlease describe the home type:: Single Family\n\nHow will we access the property?: Agent is present\n\nDoes property owner have pets on site?: No\n\nWill an agent/homeowner be present during the shoot?: yes\n\nLockbox Combo & Location / Garage code / Name of person present: 0806\n\nPlease tell us a good phone number to call in case photographer gets lost:: 6129860899\n\nHow many bedrooms?: 4\n\nHow many bathrooms?: 2\n\nWhich best approximates the land acreage to property?: upto 1 acre\n\n\n\nStep 2: Freebies\n============\nFireplace Enhance  -  FREE: yes\n\nTV Screen Enhance  -  FREE: no\n\nFOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. : \n\n\n\nStep 3: Add-ons\n============\nAdditional Condo / Association Common areas - Please describe in NOTES section  -  $10 each: \n\nNeighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each: \n\n\n\nStep 4: Notes\n============\nNotes:: \n\n\n\nStep 5: Terms and Conditions\n============\nIf I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.: I Agree and Understand\n\nDo you agree to terms and conditions?: I Agree - I have read and understand the terms and conditions\n\nI understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.: I Agree\n\n',
      forms: [
        {
          id: 223282,
          name: '*Auditing',
          values: [
            {
              id: 622812645,
              fieldID: 775651,
              value: 'z',
              name: 'Minneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A)'
            },
            {
              id: 622812648,
              fieldID: 1522005,
              value: 'z',
              name: 'Andover - RT Mileage from 55304 (enter "z" for zero, na for N/A)'
            },
            {
              id: 622812651,
              fieldID: 1522014,
              value: '',
              name: 'Actual Listed Square Feet'
            },
            {
              id: 622812654,
              fieldID: 1522017,
              value: '',
              name: 'Shift in package price'
            },
            {
              id: 622812657,
              fieldID: 1522230,
              value: '',
              name: 'Market Center'
            },
            {
              id: 622812660,
              fieldID: 1705326,
              value: '',
              name: 'Photog Schedule'
            }
          ]
        },
        {
          id: 109643,
          name: '5 Simple Steps to Awesome!',
          values: [
            {
              id: 622812663,
              fieldID: 1950559,
              value: 'Yes - Any time',
              name: 'Is the service start time flexible to occur at any point during the day you chose?'
            },
            {
              id: 622812666,
              fieldID: 704578,
              value: 'yes',
              name: 'Have you booked a shoot with us before?'
            },
            {
              id: 622812669,
              fieldID: 1226873,
              value: 'Agent',
              name: 'Which best describes you?'
            },
            {
              id: 622812672,
              fieldID: 704587,
              value: 'Bridge Realty',
              name: 'Brokerage Name (if applicable)'
            },
            {
              id: 622812675,
              fieldID: 704596,
              value: 'No team',
              name: 'Team / Group Name (to sync with customer portal)'
            },
            {
              id: 622812678,
              fieldID: 1226879,
              value: 'Preferred Vendor List',
              name: 'How did you find us?'
            },
            {
              id: 622812681,
              fieldID: 1226882,
              value: '',
              name: 'If you chose Referral source not specified on the list, like a name, please tell us WHO! :)'
            }
          ]
        },
        {
          id: 56418,
          name: 'Step 1: Details',
          values: [
            {
              id: 622812684,
              fieldID: 246985,
              value: '5500 11th Ave S',
              name: 'What is the Full Address of the property?   For ease of use, please include zip code.'
            },
            {
              id: 622812687,
              fieldID: 278343,
              value: '',
              name: 'Apartment / Unit / Suite #'
            },
            {
              id: 622812690,
              fieldID: 276700,
              value: '55417',
              name: 'Zip code'
            },
            {
              id: 622812693,
              fieldID: 196787,
              value: '2500',
              name: 'Square Footage of Property to be listed'
            },
            {
              id: 622812696,
              fieldID: 1305209,
              value: 'Single Family',
              name: 'Please describe the home type:'
            },
            {
              id: 622812699,
              fieldID: 196790,
              value: 'Agent is present',
              name: 'How will we access the property?'
            },
            {
              id: 622812702,
              fieldID: 3059253,
              value: 'No',
              name: 'Does property owner have pets on site?'
            },
            {
              id: 622812705,
              fieldID: 4428491,
              value: 'yes',
              name: 'Will an agent/homeowner be present during the shoot?'
            },
            {
              id: 622812708,
              fieldID: 196791,
              value: '0806',
              name: 'Lockbox Combo & Location / Garage code / Name of person present'
            },
            {
              id: 622812711,
              fieldID: 223238,
              value: '6129860899',
              name: 'Please tell us a good phone number to call in case photographer gets lost:'
            },
            {
              id: 622812714,
              fieldID: 247080,
              value: '4',
              name: 'How many bedrooms?'
            },
            {
              id: 622812717,
              fieldID: 247081,
              value: '2',
              name: 'How many bathrooms?'
            },
            {
              id: 622812720,
              fieldID: 314314,
              value: 'upto 1 acre',
              name: 'Which best approximates the land acreage to property?'
            }
          ]
        },
        {
          id: 56432,
          name: 'Step 2: Freebies',
          values: [
            {
              id: 622812723,
              fieldID: 248188,
              value: 'yes',
              name: 'Fireplace Enhance  -  FREE'
            },
            {
              id: 622812726,
              fieldID: 248189,
              value: 'no',
              name: 'TV Screen Enhance  -  FREE'
            },
            {
              id: 622812729,
              fieldID: 372267,
              value: '',
              name: 'FOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. '
            }
          ]
        },
        {
          id: 109671,
          name: 'Step 3: Add-ons',
          values: [
            {
              id: 622812744,
              fieldID: 379334,
              value: '',
              name: 'Additional Condo / Association Common areas - Please describe in NOTES section  -  $10 each'
            },
            {
              id: 622812747,
              fieldID: 379333,
              value: '',
              name: 'Neighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each'
            }
          ]
        },
        {
          id: 56422,
          name: 'Step 4: Notes',
          values: [
            {
              id: 622812732,
              fieldID: 247083,
              value: '',
              name: 'Notes:'
            }
          ]
        },
        {
          id: 56416,
          name: 'Step 5: Terms and Conditions',
          values: [
            {
              id: 622812735,
              fieldID: 4810558,
              value: 'I Agree and Understand',
              name: 'If I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.'
            },
            {
              id: 622812738,
              fieldID: 3038835,
              value: 'I Agree - I have read and understand the terms and conditions',
              name: 'Do you agree to terms and conditions?'
            },
            {
              id: 622812741,
              fieldID: 3038844,
              value: 'I Agree',
              name: 'I understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.'
            }
          ]
        }
      ],
      location: '5500 11th Ave S',
      notes: 'm\r\nS MPLS\r\nS',
      timezone: 'America/Chicago',
      calendarTimezone: 'America/Chicago',
      canceled: false,
      canClientCancel: false,
      canClientReschedule: false
    },
    {
      id: 212386653,
      firstName: 'Kirstie',
      lastName: 'Tessier',
      phone: '6125088836',
      email: 'kirstietessier@edinarealty.com',
      date: 'June 22, 2018',
      time: '12:30pm',
      endTime: '1:15pm',
      dateCreated: 'June 19, 2018',
      datetimeCreated: '2018-06-19T15:13:28-0500',
      datetime: '2018-06-22T12:30:00-0500',
      price: '129.00',
      priceSold: '129.00',
      paid: 'no',
      amountPaid: '0.00',
      type: 'MSP FusionTech™ Tour [up to 1,600 sf]',
      appointmentTypeID: 151853,
      classID: null,
      addonIDs: [],
      category: 'MSP FusionTech™ Virtual Tours (Photography)',
      duration: '45',
      calendar: 'Photog 15',
      calendarID: 1179192,
      certificate: null,
      confirmationPage: 'https://www.acuityscheduling.com/schedule.php?action=appt&owner=11229138&id%5B%5D=011f4ebecaf86a82362ccf80414943ab',
      formsText: 'Name: Kirstie Tessier\nPhone: (612) 508-8836\nE-mail: kirstietessier@edinarealty.com\nPrice: $129.00\n\nLocation\n============\n1715 West Jefferson Avenue, Saint Paul, MN, USA\n\n\n*Auditing\n============\nMinneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A): z\n\nAndover - RT Mileage from 55304 (enter "z" for zero, na for N/A): z\n\nActual Listed Square Feet: \n\nShift in package price: \n\nMarket Center: \n\nPhotog Schedule: \n\n\n\n5 Simple Steps to Awesome!\n============\nIs the service start time flexible to occur at any point during the day you chose?: No - only in an emergency\n\nHave you booked a shoot with us before?: yes\n\nWhich best describes you?: Agent\n\nBrokerage Name (if applicable): Edina Realty\n\nTeam / Group Name (to sync with customer portal): McAlpinTeam\n\nHow did you find us?: Repeat Customer\n\nIf you chose Referral source not specified on the list, like a name, please tell us WHO! :): \n\n\n\nStep 1: Details\n============\nWhat is the Full Address of the property?   For ease of use, please include zip code.: 1715 West Jefferson Avenue, Saint Paul, MN, USA\n\nApartment / Unit / Suite #: \n\nZip code: 55105\n\nSquare Footage of Property to be listed: 1000\n\nPlease describe the home type:: Single Family\n\nHow will we access the property?: Owner is present\n\nDoes property owner have pets on site?: No\n\nWill an agent/homeowner be present during the shoot?: yes\n\nLockbox Combo & Location / Garage code / Name of person present: Mary Strong\n\nPlease tell us a good phone number to call in case photographer gets lost:: 651-690-9108\n\nHow many bedrooms?: 3\n\nHow many bathrooms?: 2\n\nWhich best approximates the land acreage to property?: upto 1 acre\n\n\n\nStep 2: Freebies\n============\nFireplace Enhance  -  FREE: no\n\nTV Screen Enhance  -  FREE: yes\n\nFOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. : \n\n\n\nStep 3: Add-ons\n============\nAdditional Condo / Association Common areas - Please describe in NOTES section  -  $10 each: no\n\nNeighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each: no\n\n\n\nStep 4: Notes\n============\nNotes:: \n\n\n\nStep 5: Terms and Conditions\n============\nIf I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.: I Agree and Understand\n\nDo you agree to terms and conditions?: I Agree - I have read and understand the terms and conditions\n\nI understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.: I Agree\n\n',
      forms: [
        {
          id: 223282,
          name: '*Auditing',
          values: [
            {
              id: 623825688,
              fieldID: 775651,
              value: 'z',
              name: 'Minneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A)'
            },
            {
              id: 623825691,
              fieldID: 1522005,
              value: 'z',
              name: 'Andover - RT Mileage from 55304 (enter "z" for zero, na for N/A)'
            },
            {
              id: 623825694,
              fieldID: 1522014,
              value: '',
              name: 'Actual Listed Square Feet'
            },
            {
              id: 623825697,
              fieldID: 1522017,
              value: '',
              name: 'Shift in package price'
            },
            {
              id: 623825700,
              fieldID: 1522230,
              value: '',
              name: 'Market Center'
            },
            {
              id: 623825703,
              fieldID: 1705326,
              value: '',
              name: 'Photog Schedule'
            }
          ]
        },
        {
          id: 109643,
          name: '5 Simple Steps to Awesome!',
          values: [
            {
              id: 623825706,
              fieldID: 1950559,
              value: 'No - only in an emergency',
              name: 'Is the service start time flexible to occur at any point during the day you chose?'
            },
            {
              id: 623825709,
              fieldID: 704578,
              value: 'yes',
              name: 'Have you booked a shoot with us before?'
            },
            {
              id: 623825712,
              fieldID: 1226873,
              value: 'Agent',
              name: 'Which best describes you?'
            },
            {
              id: 623825715,
              fieldID: 704587,
              value: 'Edina Realty',
              name: 'Brokerage Name (if applicable)'
            },
            {
              id: 623825718,
              fieldID: 704596,
              value: 'McAlpinTeam',
              name: 'Team / Group Name (to sync with customer portal)'
            },
            {
              id: 623825721,
              fieldID: 1226879,
              value: 'Repeat Customer',
              name: 'How did you find us?'
            },
            {
              id: 623825724,
              fieldID: 1226882,
              value: '',
              name: 'If you chose Referral source not specified on the list, like a name, please tell us WHO! :)'
            }
          ]
        },
        {
          id: 56418,
          name: 'Step 1: Details',
          values: [
            {
              id: 623825727,
              fieldID: 246985,
              value: '1715 West Jefferson Avenue, Saint Paul, MN, USA',
              name: 'What is the Full Address of the property?   For ease of use, please include zip code.'
            },
            {
              id: 623825730,
              fieldID: 278343,
              value: '',
              name: 'Apartment / Unit / Suite #'
            },
            {
              id: 623825733,
              fieldID: 276700,
              value: '55105',
              name: 'Zip code'
            },
            {
              id: 623825736,
              fieldID: 196787,
              value: '1000',
              name: 'Square Footage of Property to be listed'
            },
            {
              id: 623825739,
              fieldID: 1305209,
              value: 'Single Family',
              name: 'Please describe the home type:'
            },
            {
              id: 623825742,
              fieldID: 196790,
              value: 'Owner is present',
              name: 'How will we access the property?'
            },
            {
              id: 623825745,
              fieldID: 3059253,
              value: 'No',
              name: 'Does property owner have pets on site?'
            },
            {
              id: 623825748,
              fieldID: 4428491,
              value: 'yes',
              name: 'Will an agent/homeowner be present during the shoot?'
            },
            {
              id: 623825751,
              fieldID: 196791,
              value: 'Mary Strong',
              name: 'Lockbox Combo & Location / Garage code / Name of person present'
            },
            {
              id: 623825754,
              fieldID: 223238,
              value: '651-690-9108',
              name: 'Please tell us a good phone number to call in case photographer gets lost:'
            },
            {
              id: 623825757,
              fieldID: 247080,
              value: '3',
              name: 'How many bedrooms?'
            },
            {
              id: 623825760,
              fieldID: 247081,
              value: '2',
              name: 'How many bathrooms?'
            },
            {
              id: 623825763,
              fieldID: 314314,
              value: 'upto 1 acre',
              name: 'Which best approximates the land acreage to property?'
            }
          ]
        },
        {
          id: 56432,
          name: 'Step 2: Freebies',
          values: [
            {
              id: 623825766,
              fieldID: 248188,
              value: 'no',
              name: 'Fireplace Enhance  -  FREE'
            },
            {
              id: 623825769,
              fieldID: 248189,
              value: 'yes',
              name: 'TV Screen Enhance  -  FREE'
            },
            {
              id: 623825772,
              fieldID: 372267,
              value: '',
              name: 'FOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. '
            }
          ]
        },
        {
          id: 109671,
          name: 'Step 3: Add-ons',
          values: [
            {
              id: 623825775,
              fieldID: 379334,
              value: 'no',
              name: 'Additional Condo / Association Common areas - Please describe in NOTES section  -  $10 each'
            },
            {
              id: 623825778,
              fieldID: 379333,
              value: 'no',
              name: 'Neighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each'
            }
          ]
        },
        {
          id: 56422,
          name: 'Step 4: Notes',
          values: [
            {
              id: 623825781,
              fieldID: 247083,
              value: '',
              name: 'Notes:'
            }
          ]
        },
        {
          id: 56416,
          name: 'Step 5: Terms and Conditions',
          values: [
            {
              id: 623825784,
              fieldID: 4810558,
              value: 'I Agree and Understand',
              name: 'If I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.'
            },
            {
              id: 623825787,
              fieldID: 3038835,
              value: 'I Agree - I have read and understand the terms and conditions',
              name: 'Do you agree to terms and conditions?'
            },
            {
              id: 623825790,
              fieldID: 3038844,
              value: 'I Agree',
              name: 'I understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.'
            }
          ]
        }
      ],
      location: '1715 West Jefferson Avenue, Saint Paul, MN, USA',
      notes: 'm\r\nSTP\r\nS',
      timezone: 'America/Chicago',
      calendarTimezone: 'America/Chicago',
      canceled: false,
      canClientCancel: false,
      canClientReschedule: false
    },
    {
      id: 212370954,
      firstName: 'Cindy',
      lastName: 'Welu',
      phone: '9524842953',
      email: 'cindy@weluhometeam.com',
      date: 'June 22, 2018',
      time: '12:00pm',
      endTime: '1:00pm',
      dateCreated: 'June 19, 2018',
      datetimeCreated: '2018-06-19T14:38:09-0500',
      datetime: '2018-06-22T12:00:00-0500',
      price: '149.00',
      priceSold: '149.00',
      paid: 'no',
      amountPaid: '0.00',
      type: 'MSP FusionTech™ Tour [1,601-2,500 sf]',
      appointmentTypeID: 151862,
      classID: null,
      addonIDs: [],
      category: 'MSP FusionTech™ Virtual Tours (Photography)',
      duration: '60',
      calendar: 'Photog 12',
      calendarID: 645334,
      certificate: null,
      confirmationPage: 'https://www.acuityscheduling.com/schedule.php?action=appt&owner=11229138&id%5B%5D=5f98b4079200f494e99038c31ff9b730',
      formsText: 'Name: Cindy Welu\nPhone: (952) 484-2953\nE-mail: cindy@weluhometeam.com\nPrice: $149.00\n\nLocation\n============\n8955 Southwest Village Loop, Chanhassen, MN, USA\n\n\n*Auditing\n============\nMinneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A): z\n\nAndover - RT Mileage from 55304 (enter "z" for zero, na for N/A): z\n\nActual Listed Square Feet: \n\nShift in package price: \n\nMarket Center: \n\nPhotog Schedule: \n\n\n\n5 Simple Steps to Awesome!\n============\nIs the service start time flexible to occur at any point during the day you chose?: No - only in an emergency\n\nHave you booked a shoot with us before?: yes\n\nWhich best describes you?: Agent\n\nBrokerage Name (if applicable): Keller Williams Realty Elite\n\nTeam / Group Name (to sync with customer portal): Welu Home Team\n\nHow did you find us?: Repeat Customer\n\nIf you chose Referral source not specified on the list, like a name, please tell us WHO! :): \n\n\n\nStep 1: Details\n============\nWhat is the Full Address of the property?   For ease of use, please include zip code.: 8955 Southwest Village Loop, Chanhassen, MN, USA\n\nApartment / Unit / Suite #: \n\nZip code: 55317\n\nSquare Footage of Property to be listed: 2250\n\nPlease describe the home type:: Townhome\n\nHow will we access the property?: Lockbox\n\nDoes property owner have pets on site?: No\n\nWill an agent/homeowner be present during the shoot?: no\n\nLockbox Combo & Location / Garage code / Name of person present: 1560 Front Door\n\nPlease tell us a good phone number to call in case photographer gets lost:: 952-454-6093\n\nHow many bedrooms?: 3\n\nHow many bathrooms?: 4\n\nWhich best approximates the land acreage to property?: upto 1 acre\n\n\n\nStep 2: Freebies\n============\nFireplace Enhance  -  FREE: yes\n\nTV Screen Enhance  -  FREE: yes\n\nFOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. : \n\n\n\nStep 3: Add-ons\n============\nAdditional Condo / Association Common areas - Please describe in NOTES section  -  $10 each: no\n\nNeighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each: no\n\n\n\nStep 4: Notes\n============\nNotes:: Please call ASAP if photographer is running late. \n\n\n\nStep 5: Terms and Conditions\n============\nIf I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.: I Agree and Understand\n\nDo you agree to terms and conditions?: I Agree - I have read and understand the terms and conditions\n\nI understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.: I Agree\n\n',
      forms: [
        {
          id: 223282,
          name: '*Auditing',
          values: [
            {
              id: 623750430,
              fieldID: 775651,
              value: 'z',
              name: 'Minneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A)'
            },
            {
              id: 623750433,
              fieldID: 1522005,
              value: 'z',
              name: 'Andover - RT Mileage from 55304 (enter "z" for zero, na for N/A)'
            },
            {
              id: 623750436,
              fieldID: 1522014,
              value: '',
              name: 'Actual Listed Square Feet'
            },
            {
              id: 623750439,
              fieldID: 1522017,
              value: '',
              name: 'Shift in package price'
            },
            {
              id: 623750442,
              fieldID: 1522230,
              value: '',
              name: 'Market Center'
            },
            {
              id: 623750445,
              fieldID: 1705326,
              value: '',
              name: 'Photog Schedule'
            }
          ]
        },
        {
          id: 109643,
          name: '5 Simple Steps to Awesome!',
          values: [
            {
              id: 623750448,
              fieldID: 1950559,
              value: 'No - only in an emergency',
              name: 'Is the service start time flexible to occur at any point during the day you chose?'
            },
            {
              id: 623750451,
              fieldID: 704578,
              value: 'yes',
              name: 'Have you booked a shoot with us before?'
            },
            {
              id: 623750454,
              fieldID: 1226873,
              value: 'Agent',
              name: 'Which best describes you?'
            },
            {
              id: 623750457,
              fieldID: 704587,
              value: 'Keller Williams Realty Elite',
              name: 'Brokerage Name (if applicable)'
            },
            {
              id: 623750460,
              fieldID: 704596,
              value: 'Welu Home Team',
              name: 'Team / Group Name (to sync with customer portal)'
            },
            {
              id: 623750463,
              fieldID: 1226879,
              value: 'Repeat Customer',
              name: 'How did you find us?'
            },
            {
              id: 623750466,
              fieldID: 1226882,
              value: '',
              name: 'If you chose Referral source not specified on the list, like a name, please tell us WHO! :)'
            }
          ]
        },
        {
          id: 56418,
          name: 'Step 1: Details',
          values: [
            {
              id: 623750469,
              fieldID: 246985,
              value: '8955 Southwest Village Loop, Chanhassen, MN, USA',
              name: 'What is the Full Address of the property?   For ease of use, please include zip code.'
            },
            {
              id: 623750472,
              fieldID: 278343,
              value: '',
              name: 'Apartment / Unit / Suite #'
            },
            {
              id: 623750475,
              fieldID: 276700,
              value: '55317',
              name: 'Zip code'
            },
            {
              id: 623750478,
              fieldID: 196787,
              value: '2250',
              name: 'Square Footage of Property to be listed'
            },
            {
              id: 623750481,
              fieldID: 1305209,
              value: 'Townhome',
              name: 'Please describe the home type:'
            },
            {
              id: 623750484,
              fieldID: 196790,
              value: 'Lockbox',
              name: 'How will we access the property?'
            },
            {
              id: 623750487,
              fieldID: 3059253,
              value: 'No',
              name: 'Does property owner have pets on site?'
            },
            {
              id: 623750490,
              fieldID: 4428491,
              value: 'no',
              name: 'Will an agent/homeowner be present during the shoot?'
            },
            {
              id: 623750493,
              fieldID: 196791,
              value: '1560 Front Door',
              name: 'Lockbox Combo & Location / Garage code / Name of person present'
            },
            {
              id: 623750496,
              fieldID: 223238,
              value: '952-454-6093',
              name: 'Please tell us a good phone number to call in case photographer gets lost:'
            },
            {
              id: 623750499,
              fieldID: 247080,
              value: '3',
              name: 'How many bedrooms?'
            },
            {
              id: 623750502,
              fieldID: 247081,
              value: '4',
              name: 'How many bathrooms?'
            },
            {
              id: 623750505,
              fieldID: 314314,
              value: 'upto 1 acre',
              name: 'Which best approximates the land acreage to property?'
            }
          ]
        },
        {
          id: 56432,
          name: 'Step 2: Freebies',
          values: [
            {
              id: 623750508,
              fieldID: 248188,
              value: 'yes',
              name: 'Fireplace Enhance  -  FREE'
            },
            {
              id: 623750511,
              fieldID: 248189,
              value: 'yes',
              name: 'TV Screen Enhance  -  FREE'
            },
            {
              id: 623750514,
              fieldID: 372267,
              value: '',
              name: 'FOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. '
            }
          ]
        },
        {
          id: 109671,
          name: 'Step 3: Add-ons',
          values: [
            {
              id: 623750517,
              fieldID: 379334,
              value: 'no',
              name: 'Additional Condo / Association Common areas - Please describe in NOTES section  -  $10 each'
            },
            {
              id: 623750520,
              fieldID: 379333,
              value: 'no',
              name: 'Neighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each'
            }
          ]
        },
        {
          id: 56422,
          name: 'Step 4: Notes',
          values: [
            {
              id: 623750523,
              fieldID: 247083,
              value: 'Please call ASAP if photographer is running late. ',
              name: 'Notes:'
            }
          ]
        },
        {
          id: 56416,
          name: 'Step 5: Terms and Conditions',
          values: [
            {
              id: 623750526,
              fieldID: 4810558,
              value: 'I Agree and Understand',
              name: 'If I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.'
            },
            {
              id: 623750529,
              fieldID: 3038835,
              value: 'I Agree - I have read and understand the terms and conditions',
              name: 'Do you agree to terms and conditions?'
            },
            {
              id: 623750532,
              fieldID: 3038844,
              value: 'I Agree',
              name: 'I understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.'
            }
          ]
        }
      ],
      location: '8955 Southwest Village Loop, Chanhassen, MN, USA',
      notes: 'm\r\nChanhassen\r\nS\r\nPhotog: Notify office if you think you\'ll at all be late to this one',
      timezone: 'America/Chicago',
      calendarTimezone: 'America/Chicago',
      canceled: false,
      canClientCancel: false,
      canClientReschedule: false
    },
    {
      id: 212773368,
      firstName: 'KRISTINA',
      lastName: 'MOSLOSKI',
      phone: '6518152949',
      email: 'KRISTINA@LIONHEARTSTAGING.COM',
      date: 'June 22, 2018',
      time: '10:30am',
      endTime: '11:15am',
      dateCreated: 'June 20, 2018',
      datetimeCreated: '2018-06-20T15:12:17-0500',
      datetime: '2018-06-22T10:30:00-0500',
      price: '129.00',
      priceSold: '129.00',
      paid: 'no',
      amountPaid: '0.00',
      type: 'MSP FusionTech™ Tour [up to 1,600 sf]',
      appointmentTypeID: 151853,
      classID: null,
      addonIDs: [],
      category: 'MSP FusionTech™ Virtual Tours (Photography)',
      duration: '45',
      calendar: 'Photog 15',
      calendarID: 1179192,
      certificate: null,
      confirmationPage: 'https://www.acuityscheduling.com/schedule.php?action=appt&owner=11229138&id%5B%5D=c58a6a65a23bb2d7d214ce47a77aef9f',
      formsText: 'Name: KRISTINA MOSLOSKI\nPhone: (651) 815-2949\nE-mail: KRISTINA@LIONHEARTSTAGING.COM\nPrice: $129.00\n\nLocation\n============\n3431 Vincent Avenue North, Minneapolis, MN, USA\n\n\n*Auditing\n============\nMinneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A): z\n\nAndover - RT Mileage from 55304 (enter "z" for zero, na for N/A): z\n\nActual Listed Square Feet: \n\nShift in package price: \n\nMarket Center: \n\nPhotog Schedule: \n\n\n\n5 Simple Steps to Awesome!\n============\nIs the service start time flexible to occur at any point during the day you chose?: Yes - Any time\n\nHave you booked a shoot with us before?: yes\n\nWhich best describes you?: Designer\n\nBrokerage Name (if applicable): LIONHEART HOME STAGING\n\nTeam / Group Name (to sync with customer portal): LIONHEART HOME STAGING\n\nHow did you find us?: Repeat Customer\n\nIf you chose Referral source not specified on the list, like a name, please tell us WHO! :): \n\n\n\nStep 1: Details\n============\nWhat is the Full Address of the property?   For ease of use, please include zip code.: 3431 Vincent Avenue North, Minneapolis, MN, USA\n\nApartment / Unit / Suite #: \n\nZip code: 55412\n\nSquare Footage of Property to be listed: 1280\n\nPlease describe the home type:: Single Family\n\nHow will we access the property?: Supra eKey (FREE!)\n\nDoes property owner have pets on site?: No\n\nWill an agent/homeowner be present during the shoot?: no\n\nLockbox Combo & Location / Garage code / Name of person present: SUPRA KEY\n\nPlease tell us a good phone number to call in case photographer gets lost:: \n\nHow many bedrooms?: 3\n\nHow many bathrooms?: 1\n\nWhich best approximates the land acreage to property?: upto 1 acre\n\n\n\nStep 2: Freebies\n============\nFireplace Enhance  -  FREE: yes\n\nTV Screen Enhance  -  FREE: yes\n\nFOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. : \n\n\n\nStep 3: Add-ons\n============\nAdditional Condo / Association Common areas - Please describe in NOTES section  -  $10 each: no\n\nNeighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each: no\n\n\n\nStep 4: Notes\n============\nNotes:: We are staging on THURSDAY, JUNE 21ST at 2:00 pm.  The property will be ready to photograph any time after 3:30 pm on Thursday.\n\n\n\nStep 5: Terms and Conditions\n============\nIf I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.: I Agree and Understand\n\nDo you agree to terms and conditions?: I Agree - I have read and understand the terms and conditions\n\nI understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.: I Agree\n\n',
      forms: [
        {
          id: 223282,
          name: '*Auditing',
          values: [
            {
              id: 625225197,
              fieldID: 775651,
              value: 'z',
              name: 'Minneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A)'
            },
            {
              id: 625225200,
              fieldID: 1522005,
              value: 'z',
              name: 'Andover - RT Mileage from 55304 (enter "z" for zero, na for N/A)'
            },
            {
              id: 625225203,
              fieldID: 1522014,
              value: '',
              name: 'Actual Listed Square Feet'
            },
            {
              id: 625225206,
              fieldID: 1522017,
              value: '',
              name: 'Shift in package price'
            },
            {
              id: 625225209,
              fieldID: 1522230,
              value: '',
              name: 'Market Center'
            },
            {
              id: 625225212,
              fieldID: 1705326,
              value: '',
              name: 'Photog Schedule'
            }
          ]
        },
        {
          id: 109643,
          name: '5 Simple Steps to Awesome!',
          values: [
            {
              id: 625225215,
              fieldID: 1950559,
              value: 'Yes - Any time',
              name: 'Is the service start time flexible to occur at any point during the day you chose?'
            },
            {
              id: 625225218,
              fieldID: 704578,
              value: 'yes',
              name: 'Have you booked a shoot with us before?'
            },
            {
              id: 625225221,
              fieldID: 1226873,
              value: 'Designer',
              name: 'Which best describes you?'
            },
            {
              id: 625225224,
              fieldID: 704587,
              value: 'LIONHEART HOME STAGING',
              name: 'Brokerage Name (if applicable)'
            },
            {
              id: 625225227,
              fieldID: 704596,
              value: 'LIONHEART HOME STAGING',
              name: 'Team / Group Name (to sync with customer portal)'
            },
            {
              id: 625225230,
              fieldID: 1226879,
              value: 'Repeat Customer',
              name: 'How did you find us?'
            },
            {
              id: 625225233,
              fieldID: 1226882,
              value: '',
              name: 'If you chose Referral source not specified on the list, like a name, please tell us WHO! :)'
            }
          ]
        },
        {
          id: 56418,
          name: 'Step 1: Details',
          values: [
            {
              id: 625225236,
              fieldID: 246985,
              value: '3431 Vincent Avenue North, Minneapolis, MN, USA',
              name: 'What is the Full Address of the property?   For ease of use, please include zip code.'
            },
            {
              id: 625225239,
              fieldID: 278343,
              value: '',
              name: 'Apartment / Unit / Suite #'
            },
            {
              id: 625225242,
              fieldID: 276700,
              value: '55412',
              name: 'Zip code'
            },
            {
              id: 625225245,
              fieldID: 196787,
              value: '1280',
              name: 'Square Footage of Property to be listed'
            },
            {
              id: 625225248,
              fieldID: 1305209,
              value: 'Single Family',
              name: 'Please describe the home type:'
            },
            {
              id: 625225251,
              fieldID: 196790,
              value: 'Supra eKey (FREE!)',
              name: 'How will we access the property?'
            },
            {
              id: 625225254,
              fieldID: 3059253,
              value: 'No',
              name: 'Does property owner have pets on site?'
            },
            {
              id: 625225257,
              fieldID: 4428491,
              value: 'no',
              name: 'Will an agent/homeowner be present during the shoot?'
            },
            {
              id: 625225260,
              fieldID: 196791,
              value: 'SUPRA KEY',
              name: 'Lockbox Combo & Location / Garage code / Name of person present'
            },
            {
              id: 625225263,
              fieldID: 223238,
              value: '',
              name: 'Please tell us a good phone number to call in case photographer gets lost:'
            },
            {
              id: 625225266,
              fieldID: 247080,
              value: '3',
              name: 'How many bedrooms?'
            },
            {
              id: 625225269,
              fieldID: 247081,
              value: '1',
              name: 'How many bathrooms?'
            },
            {
              id: 625225272,
              fieldID: 314314,
              value: 'upto 1 acre',
              name: 'Which best approximates the land acreage to property?'
            }
          ]
        },
        {
          id: 56432,
          name: 'Step 2: Freebies',
          values: [
            {
              id: 625225275,
              fieldID: 248188,
              value: 'yes',
              name: 'Fireplace Enhance  -  FREE'
            },
            {
              id: 625225278,
              fieldID: 248189,
              value: 'yes',
              name: 'TV Screen Enhance  -  FREE'
            },
            {
              id: 625225281,
              fieldID: 372267,
              value: '',
              name: 'FOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. '
            }
          ]
        },
        {
          id: 109671,
          name: 'Step 3: Add-ons',
          values: [
            {
              id: 625225284,
              fieldID: 379334,
              value: 'no',
              name: 'Additional Condo / Association Common areas - Please describe in NOTES section  -  $10 each'
            },
            {
              id: 625225287,
              fieldID: 379333,
              value: 'no',
              name: 'Neighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each'
            }
          ]
        },
        {
          id: 56422,
          name: 'Step 4: Notes',
          values: [
            {
              id: 625225290,
              fieldID: 247083,
              value: 'We are staging on THURSDAY, JUNE 21ST at 2:00 pm.  The property will be ready to photograph any time after 3:30 pm on Thursday.',
              name: 'Notes:'
            }
          ]
        },
        {
          id: 56416,
          name: 'Step 5: Terms and Conditions',
          values: [
            {
              id: 625225293,
              fieldID: 4810558,
              value: 'I Agree and Understand',
              name: 'If I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.'
            },
            {
              id: 625225296,
              fieldID: 3038835,
              value: 'I Agree - I have read and understand the terms and conditions',
              name: 'Do you agree to terms and conditions?'
            },
            {
              id: 625225299,
              fieldID: 3038844,
              value: 'I Agree',
              name: 'I understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.'
            }
          ]
        }
      ],
      location: '3431 Vincent Avenue North, Minneapolis, MN, USA',
      notes: 'm\r\nRobbinsdale\r\nM',
      timezone: 'America/Chicago',
      calendarTimezone: 'America/Chicago',
      canceled: false,
      canClientCancel: false,
      canClientReschedule: false
    },
    {
      id: 213125985,
      firstName: 'Collin',
      lastName: 'Vold',
      phone: '6513959268',
      email: 'Collin@CollinVold.com',
      date: 'June 22, 2018',
      time: '9:30am',
      endTime: '10:30am',
      dateCreated: 'June 21, 2018',
      datetimeCreated: '2018-06-21T12:37:30-0500',
      datetime: '2018-06-22T09:30:00-0500',
      price: '149.00',
      priceSold: '149.00',
      paid: 'no',
      amountPaid: '0.00',
      type: 'MSP FusionTech™ Tour [1,601-2,500 sf]',
      appointmentTypeID: 151862,
      classID: null,
      addonIDs: [],
      category: 'MSP FusionTech™ Virtual Tours (Photography)',
      duration: '60',
      calendar: 'Photog 22',
      calendarID: 1950543,
      certificate: null,
      confirmationPage: 'https://www.acuityscheduling.com/schedule.php?action=appt&owner=11229138&id%5B%5D=17eacdb9017a5b6d3237cbd2eb71c6c3',
      formsText: 'Name: Collin Vold\nPhone: (651) 395-9268\nE-mail: Collin@CollinVold.com\nPrice: $149.00\n\nLocation\n============\n7659 49th Avenue North, New Hope, MN 55428, USA\n\n\n*Auditing\n============\nMinneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A): \n\nAndover - RT Mileage from 55304 (enter "z" for zero, na for N/A): \n\nActual Listed Square Feet: \n\nShift in package price: \n\nMarket Center: \n\nPhotog Schedule: \n\n\n\n5 Simple Steps to Awesome!\n============\nIs the service start time flexible to occur at any point during the day you chose?: Yes - only within an hour\n\nHave you booked a shoot with us before?: yes\n\nWhich best describes you?: Agent\n\nBrokerage Name (if applicable): Keller Williams Classic Realty\n\nTeam / Group Name (to sync with customer portal): Team Vold\n\nHow did you find us?: Repeat Customer\n\nIf you chose Referral source not specified on the list, like a name, please tell us WHO! :): \n\n\n\nStep 1: Details\n============\nWhat is the Full Address of the property?   For ease of use, please include zip code.: 7659 49th Avenue North, New Hope, MN 55428, USA\n\nApartment / Unit / Suite #: \n\nZip code: 55428\n\nSquare Footage of Property to be listed: 1920\n\nPlease describe the home type:: Single Family\n\nHow will we access the property?: Agent is present\n\nDoes property owner have pets on site?: No\n\nWill an agent/homeowner be present during the shoot?: yes\n\nLockbox Combo & Location / Garage code / Name of person present: Collin will be present \n\nPlease tell us a good phone number to call in case photographer gets lost:: 651-395-9268\n\nHow many bedrooms?: 4\n\nHow many bathrooms?: 2\n\nWhich best approximates the land acreage to property?: upto 1 acre\n\n\n\nStep 2: Freebies\n============\nFireplace Enhance  -  FREE: yes\n\nTV Screen Enhance  -  FREE: yes\n\nFOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. : \n\n\n\nStep 3: Add-ons\n============\nAdditional Condo / Association Common areas - Please describe in NOTES section  -  $10 each: no\n\nNeighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each: no\n\n\n\nStep 4: Notes\n============\nNotes:: \n\n\n\nStep 5: Terms and Conditions\n============\nIf I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.: I Agree and Understand\n\nDo you agree to terms and conditions?: I Agree - I have read and understand the terms and conditions\n\nI understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.: I Agree\n\n',
      forms: [
        {
          id: 223282,
          name: '*Auditing',
          values: [
            {
              id: 626327745,
              fieldID: 775651,
              value: '',
              name: 'Minneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A)'
            },
            {
              id: 626327748,
              fieldID: 1522005,
              value: '',
              name: 'Andover - RT Mileage from 55304 (enter "z" for zero, na for N/A)'
            },
            {
              id: 626327751,
              fieldID: 1522014,
              value: '',
              name: 'Actual Listed Square Feet'
            },
            {
              id: 626327754,
              fieldID: 1522017,
              value: '',
              name: 'Shift in package price'
            },
            {
              id: 626327757,
              fieldID: 1522230,
              value: '',
              name: 'Market Center'
            },
            {
              id: 626327760,
              fieldID: 1705326,
              value: '',
              name: 'Photog Schedule'
            }
          ]
        },
        {
          id: 109643,
          name: '5 Simple Steps to Awesome!',
          values: [
            {
              id: 626327763,
              fieldID: 1950559,
              value: 'Yes - only within an hour',
              name: 'Is the service start time flexible to occur at any point during the day you chose?'
            },
            {
              id: 626327766,
              fieldID: 704578,
              value: 'yes',
              name: 'Have you booked a shoot with us before?'
            },
            {
              id: 626327769,
              fieldID: 1226873,
              value: 'Agent',
              name: 'Which best describes you?'
            },
            {
              id: 626327772,
              fieldID: 704587,
              value: 'Keller Williams Classic Realty',
              name: 'Brokerage Name (if applicable)'
            },
            {
              id: 626327775,
              fieldID: 704596,
              value: 'Team Vold',
              name: 'Team / Group Name (to sync with customer portal)'
            },
            {
              id: 626327778,
              fieldID: 1226879,
              value: 'Repeat Customer',
              name: 'How did you find us?'
            },
            {
              id: 626327781,
              fieldID: 1226882,
              value: '',
              name: 'If you chose Referral source not specified on the list, like a name, please tell us WHO! :)'
            }
          ]
        },
        {
          id: 56418,
          name: 'Step 1: Details',
          values: [
            {
              id: 626327784,
              fieldID: 246985,
              value: '7659 49th Avenue North, New Hope, MN 55428, USA',
              name: 'What is the Full Address of the property?   For ease of use, please include zip code.'
            },
            {
              id: 626327787,
              fieldID: 278343,
              value: '',
              name: 'Apartment / Unit / Suite #'
            },
            {
              id: 626327790,
              fieldID: 276700,
              value: '55428',
              name: 'Zip code'
            },
            {
              id: 626327793,
              fieldID: 196787,
              value: '1920',
              name: 'Square Footage of Property to be listed'
            },
            {
              id: 626327796,
              fieldID: 1305209,
              value: 'Single Family',
              name: 'Please describe the home type:'
            },
            {
              id: 626327799,
              fieldID: 196790,
              value: 'Agent is present',
              name: 'How will we access the property?'
            },
            {
              id: 626327802,
              fieldID: 3059253,
              value: 'No',
              name: 'Does property owner have pets on site?'
            },
            {
              id: 626327805,
              fieldID: 4428491,
              value: 'yes',
              name: 'Will an agent/homeowner be present during the shoot?'
            },
            {
              id: 626327808,
              fieldID: 196791,
              value: 'Collin will be present ',
              name: 'Lockbox Combo & Location / Garage code / Name of person present'
            },
            {
              id: 626327811,
              fieldID: 223238,
              value: '651-395-9268',
              name: 'Please tell us a good phone number to call in case photographer gets lost:'
            },
            {
              id: 626327814,
              fieldID: 247080,
              value: '4',
              name: 'How many bedrooms?'
            },
            {
              id: 626327817,
              fieldID: 247081,
              value: '2',
              name: 'How many bathrooms?'
            },
            {
              id: 626327820,
              fieldID: 314314,
              value: 'upto 1 acre',
              name: 'Which best approximates the land acreage to property?'
            }
          ]
        },
        {
          id: 56432,
          name: 'Step 2: Freebies',
          values: [
            {
              id: 626327823,
              fieldID: 248188,
              value: 'yes',
              name: 'Fireplace Enhance  -  FREE'
            },
            {
              id: 626327826,
              fieldID: 248189,
              value: 'yes',
              name: 'TV Screen Enhance  -  FREE'
            },
            {
              id: 626327829,
              fieldID: 372267,
              value: '',
              name: 'FOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. '
            }
          ]
        },
        {
          id: 109671,
          name: 'Step 3: Add-ons',
          values: [
            {
              id: 626327832,
              fieldID: 379334,
              value: 'no',
              name: 'Additional Condo / Association Common areas - Please describe in NOTES section  -  $10 each'
            },
            {
              id: 626327835,
              fieldID: 379333,
              value: 'no',
              name: 'Neighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each'
            }
          ]
        },
        {
          id: 56422,
          name: 'Step 4: Notes',
          values: [
            {
              id: 626327838,
              fieldID: 247083,
              value: '',
              name: 'Notes:'
            }
          ]
        },
        {
          id: 56416,
          name: 'Step 5: Terms and Conditions',
          values: [
            {
              id: 626327841,
              fieldID: 4810558,
              value: 'I Agree and Understand',
              name: 'If I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.'
            },
            {
              id: 626327844,
              fieldID: 3038835,
              value: 'I Agree - I have read and understand the terms and conditions',
              name: 'Do you agree to terms and conditions?'
            },
            {
              id: 626327847,
              fieldID: 3038844,
              value: 'I Agree',
              name: 'I understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.'
            }
          ]
        }
      ],
      location: '7659 49th Avenue North, New Hope, MN 55428, USA',
      notes: 'New Hope',
      timezone: 'America/Chicago',
      calendarTimezone: 'America/Chicago',
      canceled: false,
      canClientCancel: false,
      canClientReschedule: false
    },
    {
      id: 212241045,
      firstName: 'Laurie',
      lastName: 'Macko',
      phone: '6512384848',
      email: 'laurie@minnesotahomeco.com',
      date: 'June 22, 2018',
      time: '9:00am',
      endTime: '10:00am',
      dateCreated: 'June 19, 2018',
      datetimeCreated: '2018-06-19T10:31:03-0500',
      datetime: '2018-06-22T09:00:00-0500',
      price: '169.00',
      priceSold: '169.00',
      paid: 'no',
      amountPaid: '0.00',
      type: 'MSP FusionTech™ Tour [2,501-3,500 sf]',
      appointmentTypeID: 151863,
      classID: null,
      addonIDs: [],
      category: 'MSP FusionTech™ Virtual Tours (Photography)',
      duration: '60',
      calendar: 'Photog 12',
      calendarID: 645334,
      certificate: null,
      confirmationPage: 'https://www.acuityscheduling.com/schedule.php?action=appt&owner=11229138&id%5B%5D=eb26b21720f74f9b35df3de6db0aa36f',
      formsText: 'Name: Laurie Macko\nPhone: (651) 238-4848\nE-mail: laurie@minnesotahomeco.com\nPrice: $169.00\n\nLocation\n============\n15412 Bryant Ave S, Burnsville, MN, USA\n\n\n*Auditing\n============\nMinneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A): z\n\nAndover - RT Mileage from 55304 (enter "z" for zero, na for N/A): z\n\nActual Listed Square Feet: \n\nShift in package price: \n\nMarket Center: \n\nPhotog Schedule: \n\n\n\n5 Simple Steps to Awesome!\n============\nIs the service start time flexible to occur at any point during the day you chose?: Yes - only within an hour\n\nHave you booked a shoot with us before?: yes\n\nWhich best describes you?: Agent\n\nBrokerage Name (if applicable): Keller Williams\n\nTeam / Group Name (to sync with customer portal): Home Team MN\n\nHow did you find us?: Repeat Customer\n\nIf you chose Referral source not specified on the list, like a name, please tell us WHO! :): \n\n\n\nStep 1: Details\n============\nWhat is the Full Address of the property?   For ease of use, please include zip code.: 15412 Bryant Ave S, Burnsville, MN, USA\n\nApartment / Unit / Suite #: \n\nZip code: 55306\n\nSquare Footage of Property to be listed: 2768\n\nPlease describe the home type:: Single Family\n\nHow will we access the property?: Supra eKey (FREE!)\n\nDoes property owner have pets on site?: No\n\nWill an agent/homeowner be present during the shoot?: no\n\nLockbox Combo & Location / Garage code / Name of person present: Electronic - front door\n\nPlease tell us a good phone number to call in case photographer gets lost:: 651-238-4848\n\nHow many bedrooms?: 4\n\nHow many bathrooms?: 3\n\nWhich best approximates the land acreage to property?: upto 1 acre\n\n\n\nStep 2: Freebies\n============\nFireplace Enhance  -  FREE: yes\n\nTV Screen Enhance  -  FREE: no\n\nFOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. : \n\n\n\nStep 3: Add-ons\n============\nAdditional Condo / Association Common areas - Please describe in NOTES section  -  $10 each: \n\nNeighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each: \n\n\n\nStep 4: Notes\n============\nNotes:: \n\n\n\nStep 5: Terms and Conditions\n============\nIf I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.: I Agree and Understand\n\nDo you agree to terms and conditions?: I Agree - I have read and understand the terms and conditions\n\nI understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.: I Agree\n\n',
      forms: [
        {
          id: 223282,
          name: '*Auditing',
          values: [
            {
              id: 623268903,
              fieldID: 775651,
              value: 'z',
              name: 'Minneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A)'
            },
            {
              id: 623268906,
              fieldID: 1522005,
              value: 'z',
              name: 'Andover - RT Mileage from 55304 (enter "z" for zero, na for N/A)'
            },
            {
              id: 623268909,
              fieldID: 1522014,
              value: '',
              name: 'Actual Listed Square Feet'
            },
            {
              id: 623268912,
              fieldID: 1522017,
              value: '',
              name: 'Shift in package price'
            },
            {
              id: 623268915,
              fieldID: 1522230,
              value: '',
              name: 'Market Center'
            },
            {
              id: 623268918,
              fieldID: 1705326,
              value: '',
              name: 'Photog Schedule'
            }
          ]
        },
        {
          id: 109643,
          name: '5 Simple Steps to Awesome!',
          values: [
            {
              id: 623268921,
              fieldID: 1950559,
              value: 'Yes - only within an hour',
              name: 'Is the service start time flexible to occur at any point during the day you chose?'
            },
            {
              id: 623268924,
              fieldID: 704578,
              value: 'yes',
              name: 'Have you booked a shoot with us before?'
            },
            {
              id: 623268927,
              fieldID: 1226873,
              value: 'Agent',
              name: 'Which best describes you?'
            },
            {
              id: 623268930,
              fieldID: 704587,
              value: 'Keller Williams',
              name: 'Brokerage Name (if applicable)'
            },
            {
              id: 623268933,
              fieldID: 704596,
              value: 'Home Team MN',
              name: 'Team / Group Name (to sync with customer portal)'
            },
            {
              id: 623268936,
              fieldID: 1226879,
              value: 'Repeat Customer',
              name: 'How did you find us?'
            },
            {
              id: 623268939,
              fieldID: 1226882,
              value: '',
              name: 'If you chose Referral source not specified on the list, like a name, please tell us WHO! :)'
            }
          ]
        },
        {
          id: 56418,
          name: 'Step 1: Details',
          values: [
            {
              id: 623268942,
              fieldID: 246985,
              value: '15412 Bryant Ave S, Burnsville, MN, USA',
              name: 'What is the Full Address of the property?   For ease of use, please include zip code.'
            },
            {
              id: 623268945,
              fieldID: 278343,
              value: '',
              name: 'Apartment / Unit / Suite #'
            },
            {
              id: 623268948,
              fieldID: 276700,
              value: '55306',
              name: 'Zip code'
            },
            {
              id: 623268951,
              fieldID: 196787,
              value: '2768',
              name: 'Square Footage of Property to be listed'
            },
            {
              id: 623268954,
              fieldID: 1305209,
              value: 'Single Family',
              name: 'Please describe the home type:'
            },
            {
              id: 623268957,
              fieldID: 196790,
              value: 'Supra eKey (FREE!)',
              name: 'How will we access the property?'
            },
            {
              id: 623268960,
              fieldID: 3059253,
              value: 'No',
              name: 'Does property owner have pets on site?'
            },
            {
              id: 623268963,
              fieldID: 4428491,
              value: 'no',
              name: 'Will an agent/homeowner be present during the shoot?'
            },
            {
              id: 623268966,
              fieldID: 196791,
              value: 'Electronic - front door',
              name: 'Lockbox Combo & Location / Garage code / Name of person present'
            },
            {
              id: 623268969,
              fieldID: 223238,
              value: '651-238-4848',
              name: 'Please tell us a good phone number to call in case photographer gets lost:'
            },
            {
              id: 623268972,
              fieldID: 247080,
              value: '4',
              name: 'How many bedrooms?'
            },
            {
              id: 623268975,
              fieldID: 247081,
              value: '3',
              name: 'How many bathrooms?'
            },
            {
              id: 623268978,
              fieldID: 314314,
              value: 'upto 1 acre',
              name: 'Which best approximates the land acreage to property?'
            }
          ]
        },
        {
          id: 56432,
          name: 'Step 2: Freebies',
          values: [
            {
              id: 623268981,
              fieldID: 248188,
              value: 'yes',
              name: 'Fireplace Enhance  -  FREE'
            },
            {
              id: 623268984,
              fieldID: 248189,
              value: 'no',
              name: 'TV Screen Enhance  -  FREE'
            },
            {
              id: 623268987,
              fieldID: 372267,
              value: '',
              name: 'FOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. '
            }
          ]
        },
        {
          id: 109671,
          name: 'Step 3: Add-ons',
          values: [
            {
              id: 623269002,
              fieldID: 379334,
              value: '',
              name: 'Additional Condo / Association Common areas - Please describe in NOTES section  -  $10 each'
            },
            {
              id: 623269005,
              fieldID: 379333,
              value: '',
              name: 'Neighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each'
            }
          ]
        },
        {
          id: 56422,
          name: 'Step 4: Notes',
          values: [
            {
              id: 623268990,
              fieldID: 247083,
              value: '',
              name: 'Notes:'
            }
          ]
        },
        {
          id: 56416,
          name: 'Step 5: Terms and Conditions',
          values: [
            {
              id: 623268993,
              fieldID: 4810558,
              value: 'I Agree and Understand',
              name: 'If I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.'
            },
            {
              id: 623268996,
              fieldID: 3038835,
              value: 'I Agree - I have read and understand the terms and conditions',
              name: 'Do you agree to terms and conditions?'
            },
            {
              id: 623268999,
              fieldID: 3038844,
              value: 'I Agree',
              name: 'I understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.'
            }
          ]
        }
      ],
      location: '15412 Bryant Ave S, Burnsville, MN, USA',
      notes: 'm\r\nBurnsville\r\nM',
      timezone: 'America/Chicago',
      calendarTimezone: 'America/Chicago',
      canceled: false,
      canClientCancel: false,
      canClientReschedule: false
    },
    {
      id: 212255813,
      firstName: 'Julie',
      lastName: 'Hubbell',
      phone: '6128450624',
      email: 'hubbelljuliem@gmail.com',
      date: 'June 22, 2018',
      time: '9:00am',
      endTime: '10:15am',
      dateCreated: 'June 19, 2018',
      datetimeCreated: '2018-06-19T11:05:24-0500',
      datetime: '2018-06-22T09:00:00-0500',
      price: '189.00',
      priceSold: '189.00',
      paid: 'no',
      amountPaid: '0.00',
      type: 'MSP FusionTech™ Tour [up to 1,600 sf] + SDD',
      appointmentTypeID: 151853,
      classID: null,
      addonIDs: [
        15616
      ],
      category: 'MSP FusionTech™ Virtual Tours (Photography)',
      duration: '75',
      calendar: 'Photog 15',
      calendarID: 1179192,
      certificate: null,
      confirmationPage: 'https://www.acuityscheduling.com/schedule.php?action=appt&owner=11229138&id%5B%5D=cca1422a0885d6596eb7f1b18981cc68',
      formsText: 'Name: Julie Hubbell\nPhone: (612) 845-0624\nE-mail: hubbelljuliem@gmail.com\nPrice: $189.00\n\nLocation\n============\n8812 2nd Avenue S\n\nAdd Ons\n============\nSDD\n\n\n*Auditing\n============\nMinneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A): z\n\nAndover - RT Mileage from 55304 (enter "z" for zero, na for N/A): z\n\nActual Listed Square Feet: \n\nShift in package price: \n\nMarket Center: \n\nPhotog Schedule: \n\n\n\n5 Simple Steps to Awesome!\n============\nIs the service start time flexible to occur at any point during the day you chose?: No - only in an emergency\n\nHave you booked a shoot with us before?: yes\n\nWhich best describes you?: Agent\n\nBrokerage Name (if applicable): \n\nTeam / Group Name (to sync with customer portal): Dona Properties\n\nHow did you find us?: Repeat Customer\n\nIf you chose Referral source not specified on the list, like a name, please tell us WHO! :): \n\n\n\nStep 1: Details\n============\nWhat is the Full Address of the property?   For ease of use, please include zip code.: 8812 2nd Avenue S\n\nApartment / Unit / Suite #: \n\nZip code: 55420\n\nSquare Footage of Property to be listed: 1140\n\nPlease describe the home type:: Single Family\n\nHow will we access the property?: Lockbox\n\nDoes property owner have pets on site?: No\n\nWill an agent/homeowner be present during the shoot?: no\n\nLockbox Combo & Location / Garage code / Name of person present: 7018\n\nPlease tell us a good phone number to call in case photographer gets lost:: \n\nHow many bedrooms?: 2\n\nHow many bathrooms?: 1\n\nWhich best approximates the land acreage to property?: upto 1 acre\n\n\n\nStep 2: Freebies\n============\nFireplace Enhance  -  FREE: yes\n\nTV Screen Enhance  -  FREE: yes\n\nFOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. : \n\n\n\nStep 3: Add-ons\n============\nAdditional Condo / Association Common areas - Please describe in NOTES section  -  $10 each: \n\nNeighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each: \n\n\n\nStep 4: Notes\n============\nNotes:: \n\n\n\nStep 5: Terms and Conditions\n============\nIf I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.: I Agree and Understand\n\nDo you agree to terms and conditions?: I Agree - I have read and understand the terms and conditions\n\nI understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.: I Agree\n\n',
      forms: [
        {
          id: 223282,
          name: '*Auditing',
          values: [
            {
              id: 623334518,
              fieldID: 775651,
              value: 'z',
              name: 'Minneapolis - RT Mileage from 55108 (enter "z" for zero, na for N/A)'
            },
            {
              id: 623334521,
              fieldID: 1522005,
              value: 'z',
              name: 'Andover - RT Mileage from 55304 (enter "z" for zero, na for N/A)'
            },
            {
              id: 623334524,
              fieldID: 1522014,
              value: '',
              name: 'Actual Listed Square Feet'
            },
            {
              id: 623334527,
              fieldID: 1522017,
              value: '',
              name: 'Shift in package price'
            },
            {
              id: 623334530,
              fieldID: 1522230,
              value: '',
              name: 'Market Center'
            },
            {
              id: 623334533,
              fieldID: 1705326,
              value: '',
              name: 'Photog Schedule'
            }
          ]
        },
        {
          id: 109643,
          name: '5 Simple Steps to Awesome!',
          values: [
            {
              id: 623334536,
              fieldID: 1950559,
              value: 'No - only in an emergency',
              name: 'Is the service start time flexible to occur at any point during the day you chose?'
            },
            {
              id: 623334539,
              fieldID: 704578,
              value: 'yes',
              name: 'Have you booked a shoot with us before?'
            },
            {
              id: 623334542,
              fieldID: 1226873,
              value: 'Agent',
              name: 'Which best describes you?'
            },
            {
              id: 623334545,
              fieldID: 704587,
              value: '',
              name: 'Brokerage Name (if applicable)'
            },
            {
              id: 623334548,
              fieldID: 704596,
              value: 'Dona Properties',
              name: 'Team / Group Name (to sync with customer portal)'
            },
            {
              id: 623334551,
              fieldID: 1226879,
              value: 'Repeat Customer',
              name: 'How did you find us?'
            },
            {
              id: 623334554,
              fieldID: 1226882,
              value: '',
              name: 'If you chose Referral source not specified on the list, like a name, please tell us WHO! :)'
            }
          ]
        },
        {
          id: 56418,
          name: 'Step 1: Details',
          values: [
            {
              id: 623334557,
              fieldID: 246985,
              value: '8812 2nd Avenue S',
              name: 'What is the Full Address of the property?   For ease of use, please include zip code.'
            },
            {
              id: 623334560,
              fieldID: 278343,
              value: '',
              name: 'Apartment / Unit / Suite #'
            },
            {
              id: 623334563,
              fieldID: 276700,
              value: '55420',
              name: 'Zip code'
            },
            {
              id: 623334566,
              fieldID: 196787,
              value: '1140',
              name: 'Square Footage of Property to be listed'
            },
            {
              id: 623334569,
              fieldID: 1305209,
              value: 'Single Family',
              name: 'Please describe the home type:'
            },
            {
              id: 623334572,
              fieldID: 196790,
              value: 'Lockbox',
              name: 'How will we access the property?'
            },
            {
              id: 623334575,
              fieldID: 3059253,
              value: 'No',
              name: 'Does property owner have pets on site?'
            },
            {
              id: 623334578,
              fieldID: 4428491,
              value: 'no',
              name: 'Will an agent/homeowner be present during the shoot?'
            },
            {
              id: 623334581,
              fieldID: 196791,
              value: '7018',
              name: 'Lockbox Combo & Location / Garage code / Name of person present'
            },
            {
              id: 623334584,
              fieldID: 223238,
              value: '',
              name: 'Please tell us a good phone number to call in case photographer gets lost:'
            },
            {
              id: 623334587,
              fieldID: 247080,
              value: '2',
              name: 'How many bedrooms?'
            },
            {
              id: 623334590,
              fieldID: 247081,
              value: '1',
              name: 'How many bathrooms?'
            },
            {
              id: 623334593,
              fieldID: 314314,
              value: 'upto 1 acre',
              name: 'Which best approximates the land acreage to property?'
            }
          ]
        },
        {
          id: 56432,
          name: 'Step 2: Freebies',
          values: [
            {
              id: 623334596,
              fieldID: 248188,
              value: 'yes',
              name: 'Fireplace Enhance  -  FREE'
            },
            {
              id: 623334599,
              fieldID: 248189,
              value: 'yes',
              name: 'TV Screen Enhance  -  FREE'
            },
            {
              id: 623334602,
              fieldID: 372267,
              value: '',
              name: 'FOR CONDO ONLY: Please describe up to 2 rooms / locations that that are Condo / Common Association areas you would like photographed. '
            }
          ]
        },
        {
          id: 109671,
          name: 'Step 3: Add-ons',
          values: [
            {
              id: 623334617,
              fieldID: 379334,
              value: '',
              name: 'Additional Condo / Association Common areas - Please describe in NOTES section  -  $10 each'
            },
            {
              id: 623334620,
              fieldID: 379333,
              value: '',
              name: 'Neighborhood Highlights (parks, etc) - Please describe in NOTES section  -  $39 each'
            }
          ]
        },
        {
          id: 56422,
          name: 'Step 4: Notes',
          values: [
            {
              id: 623334605,
              fieldID: 247083,
              value: '',
              name: 'Notes:'
            }
          ]
        },
        {
          id: 56416,
          name: 'Step 5: Terms and Conditions',
          values: [
            {
              id: 623334608,
              fieldID: 4810558,
              value: 'I Agree and Understand',
              name: 'If I pre-pay, I understand that my card may be automatically charged or refunded within 14 days of my scheduled service for associated addons or travel fees or listed square foot discrepancies between actual and booked.'
            },
            {
              id: 623334611,
              fieldID: 3038835,
              value: 'I Agree - I have read and understand the terms and conditions',
              name: 'Do you agree to terms and conditions?'
            },
            {
              id: 623334614,
              fieldID: 3038844,
              value: 'I Agree',
              name: 'I understand that the photographer will do no staging / cleaning and property will be assumed photo-ready.'
            }
          ]
        }
      ],
      location: '8812 2nd Avenue S',
      notes: 'm\r\nBloomington\r\nM',
      timezone: 'America/Chicago',
      calendarTimezone: 'America/Chicago',
      canceled: false,
      canClientCancel: false,
      canClientReschedule: false
    }
  ]

// SAMPLE EVENTS FROM LIBRARY DEMO
const sampleArray = [
  {
    'title': 'Mmmmmmmmmmmmmmmmmm',
    'isRecurrence': true,
    'patientName': 'SSSSSSSSSSSSS',
    'clinicianImage': '../src/img/doctor.png',
    'clinicianName': 'Dr Emmaaaaaaaaa Anderson',
    'appointmentType': 'Regular appointment',
    'appointmentTime': '8:00 PM - 10:30 PM',
    'appointmentAddress': 'ROOM NO 228-230, FIRST FLOOR, DISTRICT ADMINISTRATIVE COMPLEX, SECTOR 76, Sahibzada Ajit Singh Nagar, Chandigarh, 160055',
    'coPay': '4000',
    'soapNoteTitle': 'View Soap Note',
    'setProfileTitle': 'setProfileTitleAccessor',
    'staffs': [{
        'staffName': 'Morgan',
        'image': '../src/img/doctor.png',
        'link': ''
      },
      {
        'staffName': 'Jason',
        'image': '../src/img/doctor.png',
        'link': ''
      },
      {
        'staffName': 'Charlee',
        'image': '../src/img/doctor.png',
        'link': ''
      }
    ],
    'resourceId': 'sched01',
    'start': new Date(2018, 5, 27, 20, 0, 0, 0),
    'end': new Date(2018, 5, 27, 21, 0, 0, 0),
    'isRecurrenceEdit': false,
    'isEdit': true,
    'isDelete': true,
    'isDragable': true,
  }, {
    'title': 'Bbbbbbbbbbbbbb',
    'isRecurrence': true,
    'patientName': 'SSSSSSSSSSSSS',
    'clinicianImage': '../src/img/doctor.png',
    'clinicianName': 'Dr Emma Anderson',
    'appointmentType': 'Regular appointment',
    'appointmentTime': '8:00 - 10:30',
    'appointmentAddress': 'ROOM NO 228-230, FIRST FLOOR, DISTRICT ADMINISTRATIVE COMPLEX, SECTOR 76, Sahibzada Ajit Singh Nagar, Chandigarh, 160055',
    'coPay': '',
    'soapNoteTitle': 'Create Soap Note',
    'resourceId': 'sched01',
    'start': new Date(2018, 5, 27, 5, 30, 0, 0),
    'end': new Date(2018, 5, 27, 6, 30, 0, 0),
    'isRecurrenceEdit': false,
    'isEdit': false,
    'isDelete': true,
    'isCancel': false,
    'isAppointmentRendered': true,
    'isVideoCall': true,
    'isAppoinmentCancelled': true,
    'practitionerName': 'Bbbb singh',
    'isUnCancel': true,
    'cancellationReason': 'not defined',
    'isDragable': true,
  }, {
    'title': 'Aaaaaaaaa',
    'isRecurrence': false,
    'patientName': 'SSSSSSSSSSSSS',
    'clinicianImage': '../src/img/doctor.png',
    'clinicianName': 'Dr Emma Anderson',
    'appointmentType': 'Regular appointment',
    'appointmentTime': '8:00 - 8:30',
    'appointmentAddress': 'ROOM NO 228-230, FIRST FLOOR, DISTRICT ADMINISTRATIVE COMPLEX, SECTOR 76, Sahibzada Ajit Singh Nagar, Chandigarh, 160055',
    'coPay': '',
    'soapNoteTitle': 'View Soap Note',
    'resourceId': 'sched01',
    'start': new Date(2018, 5, 27, 6, 0, 0, 0),
    'end': new Date(2018, 5, 27, 6, 30, 0, 0),
    'isRecurrenceEdit': false,
    'isEdit': true,
    'isDelete': true,
    'isCancel': false,
    'isAppointmentRendered': true,
    'isVideoCall': true,
    'isAppoinmentCancelled': true,
    'practitionerName': 'Aaaa singh',
    'isUnCancel': true,
    'cancellationReason': 'Text is available under the Creative Commons Attribution-ShareAlike License; additional terms may apply. By using this site, you agree to the Terms of Use and Privacy Policy',
    'isDragable': false,
  }, {
    'title': 'Ccccccccccccc',
    'isRecurrence': true,
    'patientName': 'SSSSSSSSSSSSS',
    'clinicianImage': '../src/img/doctor.png',
    'clinicianName': 'Dr Emma Anderson',
    'appointmentType': 'Regular appointment',
    'appointmentTime': '8:00 - 8:30',
    'appointmentAddress': 'ROOM NO 228-230, FIRST FLOOR, DISTRICT ADMINISTRATIVE COMPLEX, SECTOR 76, Sahibzada Ajit Singh Nagar, Chandigarh, 160055',
    'coPay': '',
    soapNoteTitle: 'View Soap Note',
    'resourceId': 'sched01',
    'start': new Date(2018, 5, 27, 6, 0, 0, 0),
    'end': new Date(2018, 5, 27, 7, 30, 0, 0),
    'isDragable': false,
  }, {
    'title': 'Smartdata Events',
    'isRecurrence': false,
    'patientName': 'SSSSSSSSSSSSS',
    'clinicianImage': '../src/img/doctor.png',
    'clinicianName': 'Dr Emma Anderson',
    'appointmentType': 'Regular appointment',
    'appointmentTime': '8:00 - 8:30',
    'appointmentAddress': 'ROOM NO 228-230, FIRST FLOOR, DISTRICT ADMINISTRATIVE COMPLEX, SECTOR 76, Sahibzada Ajit Singh Nagar, Chandigarh, 160055',
    'coPay': '',
    'soapNoteTitle': 'Create Soap Note',
    'resourceId': 'sched01',
    'start': new Date(2018, 5, 27, 5, 30, 0, 0),
    'end': new Date(2018, 5, 27, 10, 30, 0, 0),
    'isDragable': false,
  }, {
    'title': 'Another Meeting',
    'isRecurrence': true,
    'patientName': 'SSSSSSSSSSSSS',
    'clinicianImage': '../src/img/doctor.png',
    'clinicianName': 'Dr Emma Anderson',
    'appointmentType': 'Regular appointment',
    'appointmentTime': '8:00 - 8:30',
    'appointmentAddress': 'ROOM NO 228-230, FIRST FLOOR, DISTRICT ADMINISTRATIVE COMPLEX, SECTOR 76, Sahibzada Ajit Singh Nagar, Chandigarh, 160055',
    'coPay': '',
    'soapNoteTitle': 'Soap Note',
    'resourceId': 'sched01',
    'statusId':1,
    'start': new Date(2018, 5, 27, 2, 30, 0, 0),
    'end': new Date(2018, 5, 27, 4, 30, 0, 0),
    'isDragable': false,
  },
  {
    'title': 'Another Meeting 1',
    'isRecurrence': false,
    'patientName': 'SSSSSSSSSSSSS',
    'clinicianImage': '../src/img/doctor.png',
    'clinicianName': 'Dr Emma Anderson',
    'appointmentType': 'Regular appointment',
    'appointmentTime': '8:00 PM - 8:30 PM',
    'appointmentAddress': 'ROOM NO 228-230, FIRST FLOOR, DISTRICT ADMINISTRATIVE COMPLEX, SECTOR 76, Sahibzada Ajit Singh Nagar, Chandigarh, 160055',
    'coPay': '',
    'resourceId': 'sched02',
    'statusId':1,
    'start': new Date(2018, 5, 27, 4, 0, 0, 0),
    'end': new Date(2018, 5, 27, 4, 15, 0, 0),
    'isDragable': false,
  },
  {
    'title': 'Another Meeting 2',
    'isRecurrence': true,
    'patientName': 'SSSSSSSSSSSSS',
    'clinicianImage': '../src/img/doctor.png',
    'clinicianName': 'Dr Emma Anderson',
    'appointmentType': 'Regular appointment',
    'appointmentTime': '8:00 PM - 8:30 PM',
    'appointmentAddress': 'ROOM NO 228-230, FIRST FLOOR, DISTRICT ADMINISTRATIVE COMPLEX, SECTOR 76, Sahibzada Ajit Singh Nagar, Chandigarh, 160055',
    'coPay': '',
    'resourceId': 'sched02',
    'start': new Date(2018, 5, 27, 4, 0, 0, 0),
    'end': new Date(2018, 5, 27, 4, 15, 0, 0),
    'isDragable': false,
  },
  {
    'title': 'Another Meeting 3',
    'isRecurrence': false,
    'patientName': 'SSSSSSSSSSSSS',
    'clinicianImage': '../src/img/doctor.png',
    'clinicianName': 'Dr Emma Anderson',
    'appointmentType': 'Regular appointment',
    'appointmentTime': '8:00 - 8:30',
    'coPay': '',
    'resourceId': 'c',
    'start': new Date(2018, 5, 27, 4, 0, 0, 0),
    'end': new Date(2018, 5, 27, 4, 15, 0, 0),
    'isDragable': false,
  },
  {
    'title': 'Another Meeting 4',
    'isRecurrence': false,
    'patientName': 'SSSSSSSSSSSSS',
    'clinicianImage': '../src/img/doctor.png',
    'clinicianName': 'Dr Emma Anderson',
    'appointmentType': 'Regular appointment',
    'appointmentTime': '8:00 - 8:30',
    'coPay': '',
    'resourceId': 'sched03',
    'start': new Date(2018, 5, 27, 3, 45, 0, 0),
    'end': new Date(2018, 5, 27, 4, 15, 0, 0),
    'isDragable': false,
  },
  {
    'title': 'Another Meeting 5',
    'isRecurrence': false,
    'patientName': 'SSSSSSSSSSSSS',
    'clinicianImage': '../src/img/doctor.png',
    'clinicianName': 'Dr Emma Anderson',
    'appointmentType': 'Regular appointment',
    'appointmentTime': '8:00 - 8:30',
    'coPay': '',
    'resourceId': 'sched03',
    'start': new Date(2018, 5, 27, 2, 10, 0, 0),
    'end': new Date(2018, 5, 27, 6, 30, 0, 0),
    'isDragable': false,
  },
  {
    'title': 'Another Meeting 6',
    'isRecurrence': false,
    'patientName': 'SSSSSSSSSSSSS',
    'clinicianImage': '../src/img/doctor.png',
    'clinicianName': 'Dr Emma Anderson',
    'appointmentType': 'Regular appointment',
    'appointmentTime': '8:00 - 8:30',
    'coPay': '',
    'resourceId': 'sched02',
    'start': new Date(2018, 5, 27, 1, 50, 0, 0),
    'end': new Date(2018, 5, 27, 5, 0, 0, 0),
    'isDragable': false,
  },
  {
    'title': 'Another Meeting',
    'isRecurrence': true,
    'patientName': 'SSSSSSSSSSSSS',
    'clinicianImage': '../src/img/doctor.png',
    'clinicianName': 'Dr Emma Anderson',
    'appointmentType': 'Regular appointment',
    'appointmentTime': '8:00 - 8:30',
    'coPay': '',
    'resourceId': 'sched02',
    'statusId':1,
    'start': new Date(2018, 5, 27, 2, 30, 0, 0),
    'end': new Date(2018, 5, 27, 4, 30, 0, 0),
    'isDragable': false,
  }
  ];

// EXTRACT CALENDAR FROM THIRD-PARTY SCHEDULING APPLICATION AS RESOURCE FOR THIS APPLICATION'S SCHEDULE DISPLAY
const resourceExtractor = originalObject => {
  let extractedResource =originalObject.calendar;
  return extractedResource;
}
const resourceArray = originalAcuityArray.map(resourceExtractor);
const uniqueResourcesArray = [...new Set(resourceArray)];
const resourceList = uniqueResourcesArray.map(currentResource => {
  return {id: currentResource,
  title: currentResource}
});
// END EXTRACT CALENDAR FROM THIRD-PARTY-SCHEDULING APPLICAITON AS RESOURCE FOR THIS APPLICATION'S SCHEDULE DISPLAY



  const objectConverter = originalObject => {
    let finalObject = {
        'id': originalObject.id,
        'title': `${originalObject.firstName} ${originalObject.lastName}`,
          // 'title': 'Mmmmmmmmmmmmmmmmmm',
        'isRecurrence': false,
        'patientName': 'SSSSSSSSSSSSS',
        'clinicianImage': '../src/img/doctor.png',
        'clinicianName': 'Dr Emmaaaaaaaaa Anderson',
        'appointmentType': originalObject.type,
        // 'appointmentType': 'Regular appointment',
        'appointmentTime': '8:00 PM - 10:30 PM',
        'appointmentAddress': originalObject.location,
        // 'appointmentAddress': 'ROOM NO 228-230, FIRST FLOOR, DISTRICT ADMINISTRATIVE COMPLEX, SECTOR 76, Sahibzada Ajit Singh Nagar, Chandigarh, 160055',
        'coPay': '4000',
        'soapNoteTitle': 'View Soap Note',
        'setProfileTitle': 'setProfileTitleAccessor',
        'staffs': [{
            'staffName': 'Morgan',
            'image': '../src/img/doctor.png',
            'link': ''
          },
          {
            'staffName': 'Jason',
            'image': '../src/img/doctor.png',
            'link': ''
          },
          {
            'staffName': 'Charlee',
            'image': '../src/img/doctor.png',
            'link': ''
          }
        ],
        'resourceId': originalObject.calendar,
        'start': moment(originalObject.datetime, 'YYYY-MM-DDTHH:mm:ssZ').toDate(),
        // 'start': new Date(2018, 5, 27, 15, 0, 0, 0),
        'end': moment(originalObject.datetime).add(Number(originalObject.duration), 'm').toDate(),
        // 'end': new Date(2018, 5, 27, 18, 0, 0, 0),
        'duration': originalObject.duration,
        'isRecurrenceEdit': false,
        'isEdit': true,
        'isDelete': true,
        'isDragable': true,
    };
    return finalObject;
}
const convertedArray = originalAcuityArray.map(objectConverter);

//HARDCODED EVENT FOR TESTING
// convertedArray.push({
//   'id': '123456',
//   'title': 'Mmmmmmmmmmmmmmmmmm',
//   'isRecurrence': true,
//   'patientName': 'SSSSSSSSSSSSS',
//   'clinicianImage': '../src/img/doctor.png',
//   'clinicianName': 'Dr Emmaaaaaaaaa Anderson',
//   'appointmentType': 'Regular appointment',
//   'appointmentTime': '8:00 PM - 10:30 PM',
//   'appointmentAddress': 'ROOM NO 228-230, FIRST FLOOR, DISTRICT ADMINISTRATIVE COMPLEX, SECTOR 76, Sahibzada Ajit Singh Nagar, Chandigarh, 160055',
//   'coPay': '4000',
//   'soapNoteTitle': 'View Soap Note',
//   'setProfileTitle': 'setProfileTitleAccessor',
//   'staffs': [{
//       'staffName': 'Morgan',
//       'image': '../src/img/doctor.png',
//       'link': ''
//     },
//     {
//       'staffName': 'Jason',
//       'image': '../src/img/doctor.png',
//       'link': ''
//     },
//     {
//       'staffName': 'Charlee',
//       'image': '../src/img/doctor.png',
//       'link': ''
//     }
//   ],
//   'resourceId': 'sched01',
//   'start': new Date(2018, 5, 27, 20, 0, 0, 0),
//   'end': new Date(2018, 5, 27, 21, 0, 0, 0),
//   'isRecurrenceEdit': false,
//   'isEdit': true,
//   'isDelete': true,
//   'isDragable': true,
// });

export default {
  events: convertedArray,

  list: resourceList,
}
