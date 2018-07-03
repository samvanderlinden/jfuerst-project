import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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
import { orderEventsByResourceAndTime } from '../../Functions/ScheduleFunctions';
// END FUNCTION IMPORTS

localizer(globalize);

const mapStateToProps = state => ({
    currentAppointments: state.schedule.currentAppointments,
    currentDriveTime: state.schedule.currentDriveTime,
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
    getDriveTime = (locationA, locationB) => {
        console.log('init getDriveTime');
        const payload = {
            locationA: locationA,
            locationB: locationB,
        };
        this.props.dispatch({
            type: SCHEDULE_ACTIONS.GET_DRIVE_TIME,
            payload
        });
    } // END DISPATCH ACTION TO GET DRIVE TIME BETWEEN DROPPED LOCATION AND NEXT LOCATION

    // GET INITIAL APPOINTMENTS
    getInitialAppointments = () => {
        const today = moment(new Date()).format('MM/DD/YY');
        console.log('init getInitialAppointments');
        console.log('with today as: ' + today)
        const dateObject = {
            minDate: today,
            maxDate: today
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
        console.log('new resource is:');
        const newResource = this.props.resources.find(resource => resource.title === rest.resource);
        console.log(newResource);
        const resourceId = newResource.id;
        const calendarID = newResource.calendarID;
        const calendar = newResource.title
        let updatedEvent = { ...event, start, end, resourceId, calendar, calendarID };
        console.log(updatedEvent);
        console.log('event and updatedEvent have similar data?');
        console.log(updatedEvent === event);
        console.log(idx);
        console.log(events[idx] === updatedEvent);
        let nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);

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

        // CHECK WHETHER EVENT AFTER THE MOVED EVENT IS UNDEFINED

        // CASE: EVENT AFTER MOVED EVENT IS UNDEFINED:
        if (!eventAfterMovedEvent) {
            console.log('moved event is the last event in the schedule');
            // RESENT EVENT END TIME
            end = this.resetEventEndTime(start, event.duration);
            console.log(`reset end time to ${end}`);
            updatedEvent = { ...event, start, end, resourceId };
            // END RESENT EVENT END TIME

            // UPDATE EVENTS ARRAY WITH UPDATED EVENT
            nextEvents.splice(idx, 1, updatedEvent);
            // END UPDATE EVENTS ARRAY WITH UPDATED EVENT

            // CASE: MOVED EVENT'S NEW ARRAY HAS AN EVENT BEFORE THE MOVED EVENT
            // THEN UPDATE SO THAT THE EVENT BEFORE THE MOVED EVENT NOW SHOWS DRIVE TIME TO EVENT AFTER THE MOVED EVENT
            if (eventBeforeMovedEvent) {
                console.log('there is an event before the moved event: ');
                console.log(eventBeforeMovedEvent);
                // CASE: MOVED EVENT HAS A NEW PREVIOUS EVENT
                if (eventBeforeMovedEvent !== eventBeforeMovedEventInPreviousArray) {
                    this.updateEventBeforeMovedEvent(event, eventBeforeMovedEvent, nextEvents);
                } // END CASE: MOVED EVENT HAS A NEW PREVIOUS EVENT
                else {
                    console.log('event order did not change');
                    this.setState({
                        events: nextEvents
                    })
                } // END CASE MOVED EVENT'S NEW ARRAY HAS AN EVENT BEFORE THE MOVED EVENT
            } else {
                console.log('the moved event is the first in the schedule');
                this.setState({
                    events: nextEvents
                });
            }

            // HANDLE MOVED EVENT'S PREVIOUS ARRAY:
            // CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT AND AN EVENT AFTER THE MOVED EVENT
            if (eventBeforeMovedEventInPreviousArray && eventAfterMovedEventInPreviousArray) {
                console.log('the moved event had an event before and after it in the previous array. Updating that event');
                this.updateEventBeforeMovedEventInPreviousArray(eventBeforeMovedEventInPreviousArray, eventAfterMovedEventInPreviousArray, nextEvents);
            } // END CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT AND AN EVENT AFTER THE MOVED EVENT

            // CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT BUT NOT AFTER THE MOVED EVENT
            else if (eventBeforeMovedEventInPreviousArray && eventBeforeMovedEventInPreviousArray !== eventBeforeMovedEvent) {
                console.log('the moved event had an event before it but not after it in the previous array. Updating that event');

                end = this.resetEventEndTime(eventBeforeMovedEventInPreviousArray.start, eventBeforeMovedEventInPreviousArray.duration);
                console.log(`reset eventBeforeMovedEvent end time to ${end}`)
                let updatedEvent = { ...eventBeforeMovedEventInPreviousArray, end };
                console.log('eventBeforeMovedEventInPreviousArray end time reset. That event is now:');
                console.log(updatedEvent);
                idx = events.indexOf(eventBeforeMovedEventInPreviousArray);
                nextEvents.splice(idx, 1, updatedEvent);
                this.setState({
                    events: nextEvents
                });
            } // END CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT BUT NOT AFTER THE MOVED EVENT    
            // END HANDLE MOVED EVENT'S PREVIOUS ARRAY: 

        } // END CASE: EVENT AFTER MOVED EVENT IS UNDEFINED

        // CASE: EVENT AFTER MOVED EVENT EXISTS
        else if (eventAfterMovedEvent) {
            console.log('next event is: ' + eventAfterMovedEvent.title);

            // CASE: MOVED EVENT IS FIRST AND EVENT ORDER CHANGED
            if (!eventBeforeMovedEvent && eventAfterMovedEvent !== eventAfterMovedEventInPreviousArray) {
                console.log('Moved event is now first, and event order changed.');
                // CALCULATE DRIVE TIMES BETWEEN THE MOVED EVENT AND THE EVENT AFTER THE MOVED EVENT
                this.getDriveTime(event.appointmentAddress, eventAfterMovedEvent.appointmentAddress);
                // END CALCULATE DRIVE TIMES BETWEEN MOVED EVENT AND THE EVENT AFTER THE MOVED EVENT

                // RESENT EVENT END TIME
                end = this.resetEventEndTime(start, event.duration);
                console.log(`reset end time to ${end}`)
                // END RESENT EVENT END TIME

                // UPDATE EVENT END TIME TO INCLUDE DRIVE TIME
                end = moment(end).add(this.props.currentDriveTime, 'm').toDate();
                console.log(`after drive time, end is ${end}`);
                updatedEvent = { ...event, start, end, resourceId };
                // END UPDATE EVENT END TIME TO INCLUDE DRIVE TIME

                // UPDATE EVENTS ARRAY WITH UPDATED EVENT
                nextEvents.splice(idx, 1, updatedEvent);
                // END UPDATE EVENTS ARRAY WITH UPDATED EVENT

                this.setState({
                    events: nextEvents,
                })
                
            } // END CASE: MOVED EVENT IS FIRST AND EVENT ORDER CHANGED

            // CASE: MOVED EVENT IS FIRST AND EVENT ORDER DID NOT CHANGE
            else if (!eventBeforeMovedEvent && eventAfterMovedEvent === eventAfterMovedEventInPreviousArray) {
                console.log('Moved event is now first, and event order did not change.');
                this.setState({
                    events: nextEvents,
                })
            } // END CASE: MOVED EVENT IS FIRST AND EVENT ORDER DID NOT CHANGE

            // CASE: MOVED EVENT IS NOT FIRST AND EVENT ORDER CHANGED
            else if (eventBeforeMovedEvent && eventAfterMovedEvent != eventAfterMovedEventInPreviousArray) {
                console.log('Moved event is not first, and event order changed.')
                console.log('Before the moved event is the event: ');
                console.log(eventBeforeMovedEvent);
                console.log('After the moved event is the event: ');
                console.log(eventAfterMovedEvent);

                // UPDATE EVENT BEFORE THE MOVED EVENT
                console.log('updating event before moved event');
                this.updateEventBeforeMovedEvent(updatedEvent, eventBeforeMovedEvent, nextEvents);

                // UPDATE THE MOVED EVENT
                this.updateMovedEventWithDriveTime(updatedEvent, eventAfterMovedEvent, nextEvents);

            } // END CASE: MOVED EVENT IS NOT FIRST AND EVENT ORDER CHANGED

            // CASE: MOVED EVENT IS NOT FIRST AND EVENT ORDER DID NOT CHANGE:
            else if (eventBeforeMovedEvent && eventAfterMovedEvent === eventAfterMovedEventInPreviousArray) {
                console.log('Moved event is not first, and event order did not change.');
                this.setState({
                    events: nextEvents,
                })
            } // END CASE: MOVED EVENT IS NOT FIRST AND EVENT ORDER DID NOT CHANGE:

            // HANDLE MOVED EVENT'S PREVIOUS ARRAY:
            // CASE: CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT AND AN EVENT AFTER THE MOVED EVENT
            if (eventBeforeMovedEventInPreviousArray && eventAfterMovedEventInPreviousArray
                && eventBeforeMovedEventInPreviousArray !== eventBeforeMovedEvent
                && eventAfterMovedEventInPreviousArray !== eventAfterMovedEvent) {
                console.log('the moved event had an event before and after it in the previous array. Updating the event before the moved event in previous array');
                this.updateEventBeforeMovedEventInPreviousArray(eventBeforeMovedEventInPreviousArray, eventAfterMovedEventInPreviousArray, nextEvents);
            } // END CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT AND AN EVENT AFTER THE MOVED EVENT

            // CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT BUT NOT AFTER THE MOVED EVENT
            else if (eventBeforeMovedEventInPreviousArray && !eventAfterMovedEventInPreviousArray
                && eventBeforeMovedEventInPreviousArray !== eventBeforeMovedEvent) {
                console.log('the moved event had an event before it but not after it in the previous array. Updating the event before the moved event in the previous array');
                end = this.resetEventEndTime(eventBeforeMovedEventInPreviousArray.start, eventBeforeMovedEventInPreviousArray.duration);
                console.log(`reset eventBeforeMovedEvent end time to ${end}`)
                let updatedEvent = { ...eventBeforeMovedEventInPreviousArray, end };
                console.log('eventBeforeMovedEventInPreviousArray end time reset. That event is now:');
                console.log(updatedEvent);
                idx = events.indexOf(eventBeforeMovedEventInPreviousArray);
                nextEvents.splice(idx, 1, updatedEvent);
                this.setState({
                    events: nextEvents
                });
            } // END CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT BUT NOT AFTER THE MOVED EVENT
            // END HANDLE MOVED EVENT'S PREVIOUS ARRAY
        }
        // END CASE: EVENT AFTER MOVED EVENT EXISTS
        else {
            console.log('this case should never be hit');
            this.setState({
                events: nextEvents
            })
        }
        console.log(this.state.events);
        this.updateScheduleReducerWithNewEvents(this.state.events);
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


    updateEventBeforeMovedEvent = (event, eventBeforeMovedEvent, events) => {
        console.log('init updatEventBeforeMovedEvent:');
        console.log(eventBeforeMovedEvent);
        this.getDriveTime(eventBeforeMovedEvent.appointmentAddress, event.appointmentAddress);
        console.log('drive time between eventBeforeMovedEvent and movedEvent is now: ' + this.props.currentDriveTime);
        let idx = events.indexOf(eventBeforeMovedEvent);

        // RESENT EVENTBEFOREMOVEDEVENT END TIME
        let end = this.resetEventEndTime(eventBeforeMovedEvent.start, eventBeforeMovedEvent.duration);
        console.log(`reset eventBeforeMovedEvent end time to ${end}`)
        let updatedEvent = { ...eventBeforeMovedEvent, end };

        // UPDATE EVENT END TIME TO INCLUDE DRIVE TIME
        console.log('adding drive time to end: ' + this.props.currentDriveTime);
        end = moment(updatedEvent.end).add(this.props.currentDriveTime, 'minutes').toDate();
        console.log(`after drive time, end of eventBeforeMovedEvent is now ${end}`);
        updatedEvent = { ...updatedEvent, end };
        // END UPDATE EVENT END TIME TO INCLUDE DRIVE TIME
        console.log(updatedEvent);

        // UPDATE EVENTS ARRAY WITH UPDATED EVENTBEFOREMOVEDEVENT
        events.splice(idx, 1, updatedEvent);
        // END UPDATE EVENTS ARRAY WITH UPDATED EVENTBEFOREMOVEDEVENT
        console.log(events);
        this.setState({
            events: events
        })
    }

    updateEventBeforeMovedEventInPreviousArray = (eventBeforeMovedEvent, eventAfterMovedEvent, events) => {
        console.log('init updatEventBeforeMovedEventInPreviousArray:');
        console.log(eventBeforeMovedEvent);
        this.getDriveTime(eventBeforeMovedEvent.appointmentAddress, eventAfterMovedEvent.appointmentAddress);
        console.log('drive time between eventBeforeMovedEvent and movedEvent is now: ' + this.props.currentDriveTime);
        let idx = events.indexOf(eventBeforeMovedEvent);

        // RESENT EVENTBEFOREMOVEDEVENT END TIME
        let end = this.resetEventEndTime(eventBeforeMovedEvent.start, eventBeforeMovedEvent.duration);
        console.log(`reset eventBeforeMovedEvent end time to ${end}`)
        let updatedEvent = { ...eventBeforeMovedEvent, end };

        // UPDATE EVENT END TIME TO INCLUDE DRIVE TIME
        console.log('adding drive time to end: ' + this.props.currentDriveTime);
        end = moment(updatedEvent.end).add(this.props.currentDriveTime, 'minutes').toDate();
        console.log(`after drive time, end of eventBeforeMovedEvent is now ${end}`);
        updatedEvent = { ...updatedEvent, end };
        // END UPDATE EVENT END TIME TO INCLUDE DRIVE TIME
        console.log(updatedEvent);

        // UPDATE EVENTS ARRAY WITH UPDATED EVENTBEFOREMOVEDEVENT
        events.splice(idx, 1, updatedEvent);
        // END UPDATE EVENTS ARRAY WITH UPDATED EVENTBEFOREMOVEDEVENT
        console.log(events);
        this.setState({
            events: events
        })
    }

    updateMovedEventWithDriveTime = (event, eventAfterMovedEvent, events) => {
        console.log('init updateMovedEventWithDriveTime');
        // CALCULATE DRIVE TIMES BETWEEN THE MOVED EVENT AND THE EVENT AFTER THE MOVED EVENT
        this.getDriveTime(event.appointmentAddress, eventAfterMovedEvent.appointmentAddress);
        // END CALCULATE DRIVE TIMES BETWEEN MOVED EVENT AND THE EVENT AFTER THE MOVED EVENT
        console.log('drive time between movedEvent and eventAfterMovedEvent is now: ' + this.props.currentDriveTime);
        let idx = events.indexOf(event);

        // RESENT EVENT END TIME
        let end = this.resetEventEndTime(event.start, event.duration);
        console.log(`reset end time to ${end}`)
        // END RESENT EVENT END TIME

        // UPDATE EVENT END TIME TO INCLUDE DRIVE TIME
        end = moment(end).add(this.props.currentDriveTime, 'm').toDate();
        console.log(`after drive time, end is ${end}`);
        let updatedEvent = { ...event, end };
        // END UPDATE EVENT END TIME TO INCLUDE DRIVE TIME

        // UPDATE EVENTS ARRAY WITH UPDATED EVENT
        events.splice(idx, 1, updatedEvent);
        // END UPDATE EVENTS ARRAY WITH UPDATED EVENT

        this.setState({
            events: events,
        })
    }

    updateScheduleReducerWithNewEvents = (nextEvents) => {
        this.props.dispatch({
            type: SCHEDULE_ACTIONS.SET_APPOINTMENTS_AFTER_DRAG_AND_DROP,
            payload: nextEvents
        })
    }

    resetEventEndTime = (start, duration) => {
        return moment(start).add(duration, 'm').toDate();
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
                    defaultDate={new Date()}
                    // defaultDate={new Date(2018, 5, 22, 0, 0, 0, 0)}
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
