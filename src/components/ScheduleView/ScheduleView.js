import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// dnd library imports //
import localizer from '../../drag-and-drop-library/src/localizers/globalize';
import globalize from 'globalize';

import '../../drag-and-drop-library/src/less/styles.less';
import '../../drag-and-drop-library/examples/styles.less';
import '../../drag-and-drop-library/examples/prism.less';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import BigCalendar from '../../drag-and-drop-library/src/index';
import withDragAndDrop from '../../drag-and-drop-library/src/addons/dragAndDrop';
// import resources from '../../drag-and-drop-library/stories/resourceEvents';
// end dnd library imports //

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';
import { SCHEDULE_ACTIONS } from '../../redux/actions/scheduleActions';

// FUNCTION IMPORTS
import {
    orderEventsByResourceAndTime,
    putUpdatedEventToDatabase,
    resetEventEndTime,
    updateOriginsEventWithDriveData,
    updateScheduleReducerWithNewEvents,
} from '../../Functions/ScheduleFunctions';
// END FUNCTION IMPORTS

localizer(globalize);

const mapStateToProps = state => ({
    currentAppointments: state.schedule.currentAppointments,
    currentDate: state.schedule.currentDate,
    currentDriveData: state.schedule.currentDriveData,
    resources: state.schedule.resources,
    user: state.user,
});

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class ScheduleView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [...this.props.currentAppointments],
            usersAvailability: {},
        }
        this.moveEvent = this.moveEvent.bind(this)
    }

    componentDidMount() {
        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER
        });
        this.getInitialAppointments();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    // DISPATCH ACTION TO GET DRIVE TIME BETWEEN DROPPED LOCATION AND NEXT LOCATION
    getDriveData = (currentEvent, nextEvent) => {
        console.log('init getDriveData with payload:');
        const payload = {
            origins: currentEvent,
            destinations: nextEvent,
        };
        console.log(payload);
        this.props.dispatch({
            type: SCHEDULE_ACTIONS.GET_DRIVE_DATA,
            payload
        });
    } // END DISPATCH ACTION TO GET DRIVE TIME BETWEEN DROPPED LOCATION AND NEXT LOCATION

    // GET INITIAL APPOINTMENTS
    getInitialAppointments = () => {
        const date = this.props.currentDate;
        // const today = moment(new Date(2018, 6, 3, 0, 0, 0, 0)).format('MM/DD/YY');

        console.log('init getInitialAppointments');
        console.log('with today as: ' + date)
        const dateObject = {
            minDate: date,
            maxDate: date
        }
        this.props.dispatch({
            type: SCHEDULE_ACTIONS.GET_APPOINTMENTS_FROM_THIRDPARTY_API,
            payload: dateObject
        })
    }

    logout = () => {
        this.props.dispatch({
            type: LOGIN_ACTIONS.LOGOUT
        });
        // this.props.history.push('home');
    }

    // UPDATE DOM UPON MOVING EVENT
    moveEvent({ event, start, end, ...rest }) {
        console.log('init moveEvent for event:');
        console.log(event);
        let events = [...this.props.currentAppointments];
        console.log(events === this.props.currentAppointments);
        let idx = events.indexOf(event);
        // PARSE NEW RESOURCE TO LOCAL VARIABLES
        console.log('new resource is:');
        const newResource = this.props.resources.find(resource => resource.title === rest.resource);
        console.log(newResource);
        const resourceId = newResource.id;
        const calendarID = newResource.calendarID;
        const calendar = newResource.title
        let driveDistanceToNextAppointment;
        let driveTimeToNextAppointment;
        let updatedEvent;
        // END PARSE NEW RESOURCE TO LOCAL VARIABLES

        // UPDATE MOVED EVENT
        let updatedMovedEvent = { ...event, start, end, resourceId, calendar, calendarID };
        console.log(updatedMovedEvent);
        console.log('event and updatedEvent have similar data?');
        console.log(updatedMovedEvent === event);
        console.log(idx);
        console.log(events[idx] === updatedMovedEvent);
        // END UPDATE MOVED EVENT

        // INSERT UPDATED MOVED EVENT INTO EVENTS ARRAY
        let nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedMovedEvent);
        // END INSERT UPDATED MOVED EVENT INTO EVENTS ARRAY

        console.log('this.props.currentAppointments:');
        console.log(this.props.currentAppointments);
        console.log('events:');
        console.log(events);
        console.log('nextEvents:');
        console.log(nextEvents);
        console.log('events and nextEvents are equal arrays?')
        console.log(events === nextEvents);

        // ORDER EVENTS BY TIME WITHIN AN ARRAY FOR EACH RESOURCE
        // AND PUT THOSE ARRAYS OF EVENTS IN A PARENT ARRAY
        const previousArrayOfResourcesWithOrderedArraysOfEvents = orderEventsByResourceAndTime(this.props.resources, events);
        console.log('previousArrayOfResourcesWithOrderedArraysOfEvents:');
        console.log(previousArrayOfResourcesWithOrderedArraysOfEvents);
        const arrayOfResourcesWithOrderedArraysOfEvents = orderEventsByResourceAndTime(this.props.resources, nextEvents);
        console.log('arrayOfResourcesWithOrderedArraysOfEvents');
        console.log(arrayOfResourcesWithOrderedArraysOfEvents);
        // END ORDERING EVENTS

        // FIND THE EVENT BEFORE AND AFTER THE MOVED EVENT IN ITS ORDERED ARRAY BEFORE IT WAS MOVED
        const eventBeforeMovedEventInPreviousArray = this.selectEventBeforeMovedEventInOrderedArrayOfEvents(previousArrayOfResourcesWithOrderedArraysOfEvents, event.id);
        console.log('eventBeforeMovedEventInPreviousArray is:');
        console.log(eventBeforeMovedEventInPreviousArray);
        const eventAfterMovedEventInPreviousArray = this.selectEventAfterMovedEventInOrderedArrayOfEvents(previousArrayOfResourcesWithOrderedArraysOfEvents, event.id);
        console.log('eventAfterMovedEventInPreviousArray is:');
        console.log(eventAfterMovedEventInPreviousArray);
        // END FIND THE EVENT BEFORE AND AFTER THE MOVED EVENT IN ITS ORDERED ARRAY BEFORE IT WAS MOVED

        // FIND THE EVENT BEFORE AND AFTER THE MOVED EVENT IN ITS ORDERED ARRAY AFTER IT WAS MOVED
        const eventBeforeMovedEvent = this.selectEventBeforeMovedEventInOrderedArrayOfEvents(arrayOfResourcesWithOrderedArraysOfEvents, event.id);
        const eventAfterMovedEvent = this.selectEventAfterMovedEventInOrderedArrayOfEvents(arrayOfResourcesWithOrderedArraysOfEvents, event.id);
        // END FIND THE EVENT BEFORE AND AFTER THE MOVED EVENT IN ITS ORDERED ARRAY AFTER IT WAS MOVED

        // CASE: MOVED EVENT IS LAST IN SCHEDULE:
        if (!eventAfterMovedEvent) {
            console.log('Case 1: moved event is the last event in the schedule');

            // *UPDATE MOVED EVENT* //
            // RESET EVENT END TIME
            end = resetEventEndTime(start, updatedMovedEvent.duration);
            console.log(`reset end time to ${end}`);
            // END RESET EVENT END TIME
            // RESET DRIVE DATA
            driveDistanceToNextAppointment = '';
            driveTimeToNextAppointment = '';
            // END RESET DRIVE DATA
            // UPDATE MOVED EVENT PROPERTIES WITH UPDATED INFORMATION
            updatedMovedEvent = { ...updatedMovedEvent, driveDistanceToNextAppointment, driveTimeToNextAppointment, end };
            // END UPDATE MOVED EVENT PROPERTIES WITH UPDATED INFORMATION
            // *END UPDATE MOVED EVENT* //

            // UPDATE LOCAL EVENTS ARRAY WITH UPDATED MOVED EVENT
            nextEvents.splice(idx, 1, updatedMovedEvent);
            this.setState({
                events: nextEvents
            })
            // END UPDATE LOCAL EVENTS ARRAY WITH UPDATED MOVED EVENT     
            console.log('updating schedule reducer from ScheduleView.js with local state events:');
            updateScheduleReducerWithNewEvents(this.state.events, this.props);       

            // CASE: MOVED EVENT'S NEW ARRAY HAS AN EVENT BEFORE THE MOVED EVENT
            // *HANDLE UPDATING EVENT BEFORE THE MOVED EVENT* //
            if (eventBeforeMovedEvent) {
                console.log('Case 1.1A: there is an event before the moved event: ');
                console.log(eventBeforeMovedEvent);

                // CASE: MOVED EVENT HAS A NEW PREVIOUS EVENT
                if (eventBeforeMovedEvent !== eventBeforeMovedEventInPreviousArray) {
                    console.log('Case 1.1A.1: moved event has a new previous event')
                    // UPDATE THE EVENT BEFORE THE MOVED EVENT & THE EVENTS ARRAY ON THE REDUCER
                    this.updateEventWithDriveData(eventBeforeMovedEvent, updatedMovedEvent, nextEvents);
                    // END UPDATE THE EVENT BEFORE THE MOVED EVENT & THE EVENTS ARRAY ON THE REDUCER
                } // END CASE: MOVED EVENT HAS A NEW PREVIOUS EVENT

                // CASE: EVENT ORDER DID NOT CHANGE
                else {
                    console.log('Case 1.1A.2 event order did not change');
                    console.log('updating schedule reducer from ScheduleView.js with local state events:');
                    updateScheduleReducerWithNewEvents(this.state.events, this.props);
                } // END CASE: EVENT ORDER DID NOT CHANGE
                // *END HANDLE UPDATING EVENT BEFORE THE MOVED EVENT* //
                // END CASE MOVED EVENT'S NEW ARRAY HAS AN EVENT BEFORE THE MOVED EVENT

                // CASE: EVENT IS FIRST IN THE SCHEDULE
            } else {
                console.log('Case 1.1B: the moved event is the first in the schedule');
                console.log('updating schedule reducer from ScheduleView.js with local state events:');
                updateScheduleReducerWithNewEvents(this.state.events, this.props);
            } // END CASE: EVENT IS FIRST IN SCHEDULE
            // END HANDLE UPDATING MOVED EVENT
            
            // HANDLE MOVED EVENT'S PREVIOUS ARRAY
            this.handleMovedEventsPreviousArray(
                nextEvents,
                eventBeforeMovedEventInPreviousArray,
                eventAfterMovedEventInPreviousArray,
                eventBeforeMovedEvent,
                eventAfterMovedEvent,
            );
            // END HANDLE MOVED EVENT'S PREVIOUS ARRAY

        } // END CASE: MOVED EVENT IS LAST IN SCHEDULE

        // CASE: EVENT AFTER MOVED EVENT EXISTS
        else if (eventAfterMovedEvent) {
            console.log('next event is: ' + eventAfterMovedEvent.title);

            // CASE: EVENT ORDER CHANGED AND MOVED EVENT IS FIRST
            if (!eventBeforeMovedEvent && eventAfterMovedEvent
                && eventAfterMovedEvent !== eventAfterMovedEventInPreviousArray) {
                console.log('Moved event is now first, and event order changed.');

                // UPDATE THE MOVED EVENT & UPDATE EVENT ARRAY ON THE REDUCER
                this.updateEventWithDriveData(updatedMovedEvent, eventAfterMovedEvent, nextEvents)
                // END UPDATE THE MOVED EVENT & UPDATE THE EVENT ARRAY ON THE REDUCER
            } // END CASE: EVENT ORDER CHANGED AND MOVED EVENT IS FIRST

            // CASE: EVENT ORDER CHANGED AND MOVED EVENT IS NOT FIRST
            else if (eventBeforeMovedEvent && eventAfterMovedEvent
                && eventAfterMovedEvent !== eventAfterMovedEventInPreviousArray) {
                console.log('Moved event is not first, and event order changed.')
                console.log('Before the moved event is the event: ');
                console.log(eventBeforeMovedEvent);
                console.log('After the moved event is the event: ');
                console.log(eventAfterMovedEvent);

                // TRY THIS 1.1.1
                // UPDATE EVENT BEFORE THE MOVED EVENT AND THE MOVED EVENT
                this.updateDriveDataForMovedEventAndEventBeforeMovedEvent(
                    eventBeforeMovedEvent, updatedMovedEvent, eventAfterMovedEvent, nextEvents
                );
                // END TRY THIS 1.1.1

                // COMMENT OUT THIS 1.1.1
                // // UPDATE EVENT BEFORE THE MOVED EVENT
                // console.log('updating event before moved event');
                // this.updateEventWithDriveData(eventBeforeMovedEvent, updatedMovedEvent, nextEvents);

                // // UPDATE THE MOVED EVENT
                // console.log('updating the moved event');
                // this.updateEventWithDriveData(updatedMovedEvent, eventAfterMovedEvent, nextEvents);
                // console.log('updating drive data for moved event and event before moved event');
                // END COMMENT OUT THIS 1.1.1

            } // END CASE: EVENT ORDER CHANGED AND MOVED EVENT IS NOT FIRST

            // CASE: EVENT ORDER DID NOT CHANGE AND MOVED EVENT IS FIRST 
            else if (!eventBeforeMovedEvent && eventAfterMovedEvent
                && eventAfterMovedEvent === eventAfterMovedEventInPreviousArray) {
                console.log('Moved event is now first, and event order did not change.');
                console.log('updating schedule reducer from ScheduleView.js with local state events:');
                this.setState({
                    events: nextEvents
                })
                updateScheduleReducerWithNewEvents(this.state.events, this.props);
                // UPDATE DATABASE WITH UPDATED EVENT
                putUpdatedEventToDatabase(updatedMovedEvent, this.props);
                // END UPDATE DATABASE WITH UPDATED EVENT
            } // END CASE: EVENT ORDER DID NOT CHANGE AND MOVED EVENT IS FIRST 

            // CASE: EVENT ORDER DID NOT CHANGE AND MOVED EVENT IS NOT FIRST
            else if (eventBeforeMovedEvent && eventAfterMovedEvent
                && eventAfterMovedEvent === eventAfterMovedEventInPreviousArray) {
                console.log('Moved event is not first, and event order did not change.');
                console.log('updating schedule reducer from ScheduleView.js with local state events:');
                updateScheduleReducerWithNewEvents(this.state.events, this.props);
                // UPDATE DATABASE WITH UPDATED EVENT
                putUpdatedEventToDatabase(updatedMovedEvent, this.props);
                // END UPDATE DATABASE WITH UPDATED EVENT

            } // END CASE: EVENT ORDER DID NOT CHANGE AND MOVED EVENT IS NOT FIRST

            // HANDLE MOVED EVENT'S PREVIOUS ARRAY:
            this.handleMovedEventsPreviousArray(
                nextEvents,
                eventBeforeMovedEventInPreviousArray,
                eventAfterMovedEventInPreviousArray,
                eventBeforeMovedEvent,
                eventAfterMovedEvent,
            );
            // END HANDLE MOVED EVENT'S PREVIOUS ARRAY

        }// END CASE: EVENT AFTER MOVED EVENT EXISTS
    } // END UPDATE DOM UPON MOVING EVENT

    // ORDER EVENTS IN ARRAYS SORTED BY RESOURCE AND TIME
    orderEventsByResourceAndTime = (resourcesArray, eventsArray) => {
        console.log('init orderEventsByResourceAndTime, given resources and events:');
        console.log(resourcesArray);
        console.log(eventsArray);
        // create array to contain an array of events for each resource
        let arrayOfArrays = [];
        // creates an array of events for each resource
        for (let i = 0; i < resourcesArray.length; i++) {
            let currentResource = resourcesArray[i];
            let newArray = [];
            // each event is checked by resource id and pushed into that resources' array of events
            for (let j = 0; j < eventsArray.length; j++) {
                if (eventsArray[j].resourceId === currentResource.id) {
                    newArray.push(eventsArray[j])
                }
            }
            newArray.sort(this.compareEventStartTimes);
            arrayOfArrays.push(newArray);
        }
        return arrayOfArrays;
    } // END ORDER EVENTS IN ARRAYS SORTED BY RESOURCE AND TIME


    handleMovedEventsPreviousArray = (
        nextEvents,
        eventBeforeMovedEventInPreviousArray,
        eventAfterMovedEventInPreviousArray,
        eventBeforeMovedEvent,
        eventAfterMovedEvent,
    ) => {
        console.log('init handleMovedEventsPreviousArray');
        let driveDistanceToNextAppointment;
        let driveTimeToNextAppointment;
        let end;
        let idx;
        // CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT AND AN EVENT AFTER THE MOVED EVENT
        if (eventBeforeMovedEventInPreviousArray && eventAfterMovedEventInPreviousArray
            && eventBeforeMovedEventInPreviousArray !== eventBeforeMovedEvent
            && eventAfterMovedEventInPreviousArray !== eventAfterMovedEvent) 
            {
                console.log('the event is in the same array as before it moved');
            }
        else if (eventBeforeMovedEventInPreviousArray && eventAfterMovedEventInPreviousArray
            && eventBeforeMovedEventInPreviousArray !== eventBeforeMovedEvent
            && eventAfterMovedEventInPreviousArray !== eventAfterMovedEvent) 
            {
            console.log('the moved event had an event before and after it in the previous array. Updating the event before the moved event in previous array');
            this.updateEventWithDriveData(eventBeforeMovedEventInPreviousArray, eventAfterMovedEventInPreviousArray, nextEvents);
        } // END CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT AND AN EVENT AFTER THE MOVED EVENT

        // CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT BUT NOT AFTER THE MOVED EVENT
        else if (eventBeforeMovedEventInPreviousArray && !eventAfterMovedEventInPreviousArray
            && eventBeforeMovedEventInPreviousArray !== eventBeforeMovedEvent) {
            console.log('the moved event had an event before it but not after it in the previous array. Updating the event before the moved event in the previous array');

            // RESET END TIME OF EVENTBEFOREMOVEDEVENTINPREVIOUSARRAY
            end = resetEventEndTime(eventBeforeMovedEventInPreviousArray.start, eventBeforeMovedEventInPreviousArray.duration);
            console.log(`reset eventBeforeMovedEvent end time to ${end}`)
            // END RESET END TIME OF EVENTBEFOREMOVEDEVENTINPREVIOUSARRAY

            // RESET DRIVE DATA
            driveDistanceToNextAppointment = '';
            driveTimeToNextAppointment = '';
            // END RESET DRIVE DATA

            // UPDATE EVENTBEFOREMOVEDEVENTINPREVIOUSARRAY WITH NEW END TIME
            let updatedEventBeforeMovedEventInPreviousArray = {
                ...eventBeforeMovedEventInPreviousArray,
                driveDistanceToNextAppointment,
                driveTimeToNextAppointment,
                end
            };
            // END UPDATE EVENTBEFOREMOVEDEVENTINPREVIOUSARRAY WITH NEW END TIME

            console.log('eventBeforeMovedEventInPreviousArray end time reset. That event is now:');
            console.log(updatedEventBeforeMovedEventInPreviousArray);

            // FIND UPDATED EVENT IN ARRAY OF EVENTS
            idx = nextEvents.indexOf(eventBeforeMovedEventInPreviousArray);
            // END FIND UPDATED EVENT IN ARRAY OF EVENTS

            // UPDATE EVENTS ARRAY WITH UPDATED EVENT
            nextEvents.splice(idx, 1, updatedEventBeforeMovedEventInPreviousArray);
            // END UPDATE EVENTS ARRAY WITH UPDATED EVENT

            // UPDATE DATABASE WITH UPDATED EVENT
            putUpdatedEventToDatabase(updatedEventBeforeMovedEventInPreviousArray, this.props);
            // END UPDATE DATABASE WITH UPDATED EVENT

            this.setState({
                events: nextEvents
            });
        } // END CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT BUT NOT AFTER THE MOVED EVENT
    }

    // updateEventBeforeMovedEvent = (event, eventBeforeMovedEvent, events) => {
    //     console.log('init updatEventBeforeMovedEvent:');
    //     console.log(eventBeforeMovedEvent);
    //     this.getDriveData(eventBeforeMovedEvent, event);
    //     console.log('drive time between eventBeforeMovedEvent and movedEvent is now: ' + this.props.currentDriveTime);
    //     let idx = events.indexOf(eventBeforeMovedEvent);

    //     // RESET EVENTBEFOREMOVEDEVENT END TIME
    //     let end = resetEventEndTime(eventBeforeMovedEvent.start, eventBeforeMovedEvent.duration);
    //     console.log(`reset eventBeforeMovedEvent end time to ${end}`)
    //     let updatedEvent = { ...eventBeforeMovedEvent, end };

    //     // UPDATE EVENT END TIME TO INCLUDE DRIVE TIME AND DISTANCE
    //     updatedEvent = updateOriginsEventWithDriveData(this.props.currentDriveData, updatedEvent)
    //     // END UPDATE EVENT END TIME TO INCLUDE DRIVE TIME AND DISTANCE
    //     console.log(updatedEvent);

    //     // UPDATE EVENTS ARRAY WITH UPDATED EVENTBEFOREMOVEDEVENT
    //     events.splice(idx, 1, updatedEvent);
    //     // END UPDATE EVENTS ARRAY WITH UPDATED EVENTBEFOREMOVEDEVENT

    //     // UPDATE DATABASE WITH UPDATED EVENTBEFOREMOVEDEVENT
    //     putUpdatedEventToDatabase(updatedEvent, this.props);
    //     // END UPDATE DATABASE WITH UPDATED EVENTBEFOREMOVEDEVENT

    //     console.log(events);
    //     this.setState({
    //         events: events
    //     })
    // }

    // updateEventBeforeMovedEventInPreviousArray = (eventBeforeMovedEvent, eventAfterMovedEvent, events) => {
    //     console.log('init updatEventBeforeMovedEventInPreviousArray:');
    //     console.log(eventBeforeMovedEvent);
    //     this.getDriveData(eventBeforeMovedEvent, eventAfterMovedEvent);
    //     console.log('drive time between eventBeforeMovedEvent and movedEvent is now: ' + this.props.currentDriveTime);
    //     let idx = events.indexOf(eventBeforeMovedEvent);

    //     // RESET EVENTBEFOREMOVEDEVENT END TIME
    //     let end = resetEventEndTime(eventBeforeMovedEvent.start, eventBeforeMovedEvent.duration);
    //     console.log(`reset eventBeforeMovedEvent end time to ${end}`)
    //     let updatedEvent = { ...eventBeforeMovedEvent, end };

    //     // UPDATE EVENT END TIME TO INCLUDE DRIVE TIME AND DISTANCE
    //     updatedEvent = updateOriginsEventWithDriveData(this.props.currentDriveData, updatedEvent)
    //     // END UPDATE EVENT END TIME TO INCLUDE DRIVE TIME AND DISTANCE
    //     console.log(updatedEvent);

    //     // UPDATE EVENTS ARRAY WITH UPDATED EVENTBEFOREMOVEDEVENT
    //     events.splice(idx, 1, updatedEvent);
    //     // END UPDATE EVENTS ARRAY WITH UPDATED EVENTBEFOREMOVEDEVENT

    //     // UPDATE DATABASE WITH UPDATED EVENTBEFOREMOVEDEVENT
    //     putUpdatedEventToDatabase(updatedEvent, this.props);
    //     // END UPDATE DATABASE WITH UPDATED EVENTBEFOREMOVEDEVENT
    //     console.log(events);
    //     this.setState({
    //         events: events
    //     })
    // }

    updateEventWithDriveData = (originEvent, destinationEvent, events) => {
        console.log('init updateEventWithDriveData');
        const payload = {
            originEvent: originEvent,
            destinationEvent: destinationEvent,
            events: events
        }
        this.props.dispatch({
            type: SCHEDULE_ACTIONS.UPDATE_EVENT_UPON_MOVE,
            payload
        })
    }

    updateDriveDataForMovedEventAndEventBeforeMovedEvent = (
        eventBeforeMovedEvent, updatedMovedEvent, eventAfterMovedEvent, events
    ) => {
        console.log('init updateDriveDataForMovedEventAndEventBeforeMovedEvent')
        const payload = {
            eventBeforeMovedEvent: eventBeforeMovedEvent,
            updatedMovedEvent: updatedMovedEvent,
            eventAfterMovedEvent: eventAfterMovedEvent,
            events: events,
        }
        this.props.dispatch({
            type: SCHEDULE_ACTIONS.UPDATE_MOVED_AND_BEFORE_MOVED,
            payload
        })
    }

    selectEventAfterMovedEventInOrderedArrayOfEvents = (arrayOfArrays, movedEventId) => {
        let eventAfterMovedEvent = {};
        for (let i = 0; i < arrayOfArrays.length; i++) {
            let currentEventsArray = arrayOfArrays[i];
            for (let j = 0; j < currentEventsArray.length; j++) {
                let currentEvent = currentEventsArray[j]
                if (currentEvent.id === movedEventId) {
                    eventAfterMovedEvent = currentEventsArray[j + 1];
                }
            }
        }
        return eventAfterMovedEvent;
    }

    selectEventBeforeMovedEventInOrderedArrayOfEvents = (arrayOfArrays, movedEventId) => {
        let eventBeforeMovedEvent = {};
        for (let i = 0; i < arrayOfArrays.length; i++) {
            let currentEventsArray = arrayOfArrays[i];
            for (let j = 0; j < currentEventsArray.length; j++) {
                let currentEvent = currentEventsArray[j]
                if (currentEvent.id === movedEventId) {
                    eventBeforeMovedEvent = currentEventsArray[j - 1];
                }
            }
        }
        return eventBeforeMovedEvent;
    }

    slotPropGetter(date) { // , start, end, isSelected
        // console.log('date.getDate()...', Object.prototype.toString.call(date))
        if (Object.prototype.toString.call(date) === '[object Date]') {
            let style = {
                backgroundColor: '#ccc',
            };
            let style1 = {
                backgroundColor: '#fff',
            };
            if (date.getDate() === 7) {

                return {
                    style: style,
                };
            } else {
                return {
                    style: style1,
                }
            }
        }
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <DragAndDropCalendar
                    className='demo'
                    selectable
                    events={this.props.currentAppointments}
                    resources={this.props.resources}
                    statusHeadings={[{ id: 1, title: 'connected' }, { id: 2, title: 'Confirmed' }]}
                    usersAvailability={this.state.usersAvailability}
                    onEventDrop={this.moveEvent}
                    defaultView='resource' // set to 'resource'
                    defaultDate={this.props.currentDate}
                    onSelectEvent={event => console.log(event)}
                // onSelectSlot={(slotInfo) => alert(
                //     `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                //     `\nend: ${slotInfo.end.toLocaleString()}`
                //   )}
                />
            );
        }

        return (
            <div>
                <div className="navbar">
                    <Nav />
                </div>
                <div className="instructions">

                    {/* <h1 className="lead">{title}</h1> */}

                </div>

                {content}


            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(ScheduleView));
