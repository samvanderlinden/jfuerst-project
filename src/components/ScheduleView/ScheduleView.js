import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import cn from 'classnames';
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
import resources from '../../drag-and-drop-library/stories/resourceEvents';
// end dnd library imports //

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';
import { SCHEDULE_ACTIONS } from '../../redux/actions/scheduleActions';

localizer(globalize);

const mapStateToProps = state => ({
    user: state.user,
    currentDriveTime: state.schedule.currentDriveTime,
});

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class ScheduleView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: resources.events,
            usersAvailability: {},
        }
        this.moveEvent = this.moveEvent.bind(this)
    }

    // COMPARE START TIMES OF EVENTS FOR SORTING WITHIN THEIR RESOURCE ARRAY
    compareEventStartTimes = (eventA, eventB) => {
        const startTimeA = eventA.start;
        const startTimeB = eventB.start;
        let comparison = 0;
        if (startTimeA > startTimeB) {
            comparison = 1;
        } else if (startTimeA < startTimeB) {
            comparison = -1;
        }
        return comparison;
    } // END COMPARE START TIMES OF EVENTS FOR SORTING WITHIN THEIR RESOURCE ARRAY

    componentDidMount() {
        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER
        });
        this.getInitialDriveTimes();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }


    // DISPATCH ACTION TO GET DRIVE TIME BETWEEN DROPPED LOCATION AND NEXT LOCATION
    getDriveTime = (locationA, locationB) => {
        const payload = {
            locationA: locationA,
            locationB: locationB,
        };
        this.props.dispatch({
            type: SCHEDULE_ACTIONS.GET_DRIVE_TIME,
            payload
        });
    } // END DISPATCH ACTION TO GET DRIVE TIME BETWEEN DROPPED LOCATION AND NEXT LOCATION

    // GET DRIVE TIMES WHEREVER AN EVENT FOLLOWS ANOTHER EVENT
    getInitialDriveTimes = () => {
        console.log('init getInitialDriveTimes');
        const events = this.state.events;
        console.log(events);
        let nextEvents = this.state.events;
        let end;
        let updatedEvent;
        const arrayOfResourcesWithOrderedArraysOfEvents = this.orderEventsByResourceAndTime(resources.list, this.state.events);
        console.log('the array of resources with arrays of events is:');
        console.log(arrayOfResourcesWithOrderedArraysOfEvents);
        // loop through each resource array
        for (let i = 0; i < arrayOfResourcesWithOrderedArraysOfEvents.length; i++) {
            let currentResourceEvents = arrayOfResourcesWithOrderedArraysOfEvents[i];
            console.log('the current resource events array is: ');
            console.log(currentResourceEvents);
            // loop through event array
            for (let j = 0; j < currentResourceEvents.length - 1; j++) {
                const idx = events.indexOf(currentResourceEvents[j]);
                let currentEvent = currentResourceEvents[j];
                let nextEvent = currentResourceEvents[j + 1];
                console.log('current event is:')
                console.log(currentEvent);
                console.log('Its index in events array is ' + idx);
                console.log('next event is:')
                console.log(nextEvent);
                // GET DRIVE TIME BETWEEN CURRENT EVENT AND NEXT EVENT
                this.getDriveTime(currentEvent.appointmentAddress, nextEvent.appointmentAddress);
                console.log('confirming that scheduleReducer state has currentDriveTime of: ' + this.props.currentDriveTime);
                // UPDATE EVENT END TIME TO INCLUDE DRIVE TIME
                end = moment(currentEvent.end).add(this.props.currentDriveTime, 'm').toDate();
                console.log(`after drive time, currentEvent's end is ${end}`);
                // UPDATE CURRENT EVENT'S END TIME TO INCLUDE DRIVE TIME TO NEXT EVENT
                updatedEvent = { ...currentEvent, end };
                console.log('current event start is' + updatedEvent.start);
                console.log('current event duration: ' + updatedEvent.duration);
                console.log('currentDriveTime is ' + this.props.currentDriveTime);
                console.log('confirming that end time is updated to: ' + updatedEvent.end);
                console.log('updated event is: ');
                console.log(updatedEvent);
                // UPDATE ARRAY OF EVENTS TO SHOW CURRENT EVENT'S DRIVE TIME
                nextEvents.splice(idx, 1, updatedEvent);
                console.log('updated nextEvents array:');
                console.log(nextEvents);
                console.log('init this.setState')
                this.setState({
                    events: nextEvents
                })
                console.log('checking this.state.events. The array should match nextEvents array');
                console.log(this.state.events);
            }
        }

    } // END GET DRIVE TIMES WHEREVER AN EVENT FOLLOWS ANOTHER EVENT

    logout = () => {
        this.props.dispatch({
            type: LOGIN_ACTIONS.LOGOUT
        });
        // this.props.history.push('home');
    }

    // UPDATE DOM UPON MOVING EVENT
    moveEvent({ event, start, end, ...rest }) {
        const { events } = this.state;
        let idx = events.indexOf(event);
        const resourceId = rest.resource || event.resourceId;
        let updatedEvent = { ...event, start, end, resourceId };
        let nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);

        //WHALEHUNTER: START WHALEHUNTER'S LINES
        console.log(nextEvents);

        // ORDER EVENTS BY TIME WITHIN AN ARRAY FOR EACH RESOURCE
        // AND PUT THOSE ARRAYS OF EVENTS IN A PARENT ARRAY
        const previousArrayOfResourcesWithOrderedArraysOfEvents = this.orderEventsByResourceAndTime(resources.list, events);
        const arrayOfResourcesWithOrderedArraysOfEvents = this.orderEventsByResourceAndTime(resources.list, nextEvents);
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
                if (eventBeforeMovedEvent != eventBeforeMovedEventInPreviousArray) {
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
                })
            }

            // HANDLE MOVED EVENT'S PREVIOUS ARRAY:
            // CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT AND AN EVENT AFTER THE MOVED EVENT
            if (eventBeforeMovedEventInPreviousArray && eventAfterMovedEventInPreviousArray) {
                console.log('the moved event had an event before and after it in the previous array. Updating that event');
                this.updateEventBeforeMovedEventInPreviousArray(eventBeforeMovedEventInPreviousArray, eventAfterMovedEventInPreviousArray, nextEvents);
            } // END CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT AND AN EVENT AFTER THE MOVED EVENT

            // CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT BUT NOT AFTER THE MOVED EVENT
            else if (eventBeforeMovedEventInPreviousArray && eventBeforeMovedEventInPreviousArray != eventBeforeMovedEvent) {
                console.log('the moved event had an event before it but not after it in the previous array. Updating that event');

                end = this.resetEventEndTime(eventBeforeMovedEventInPreviousArray.start, eventBeforeMovedEventInPreviousArray.duration);
                console.log(`reset eventBeforeMovedEvent end time to ${end}`)
                let updatedEvent = { ...eventBeforeMovedEventInPreviousArray, end };
                console.log('eventBeforeMovedEventInPreviousArray end time reset. That event is now:');
                console.log(updatedEvent);
                idx = events.indexOf(eventBeforeMovedEventInPreviousArray);
                nextEvents.splice(idx, 1, updatedEvent);
            } // END CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT BUT NOT AFTER THE MOVED EVENT    
            // END HANDLE MOVED EVENT'S PREVIOUS ARRAY: 

        } // END CASE: EVENT AFTER MOVED EVENT IS UNDEFINED

        // CASE: EVENT AFTER MOVED EVENT EXISTS
        else if (eventAfterMovedEvent) {
            console.log('next event is: ' + eventAfterMovedEvent.title);

            // CASE: MOVED EVENT IS FIRST AND EVENT ORDER CHANGED
            if (!eventBeforeMovedEvent && eventAfterMovedEvent != eventAfterMovedEventInPreviousArray) {
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
            else if (!eventBeforeMovedEvent && eventAfterMovedEvent == eventAfterMovedEventInPreviousArray) {
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

            // CASE: MOVED EVENT IS NOT FIRST AND EVENT DID NOT CHANGE:
            else if (eventBeforeMovedEvent && eventAfterMovedEvent == eventAfterMovedEventInPreviousArray) {
                console.log('Moved event is not first, and event order did not change.');
                this.setState({
                    events: nextEvents,
                })
            } // END CASE: MOVED EVENT IS NOT FIRST AND EVENT DID NOT CHANGE:

            // HANDLE MOVED EVENT'S PREVIOUS ARRAY:
            // CASE: CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT AND AN EVENT AFTER THE MOVED EVENT
            if (eventBeforeMovedEventInPreviousArray && eventAfterMovedEventInPreviousArray
                && eventBeforeMovedEventInPreviousArray != eventBeforeMovedEvent
                && eventAfterMovedEventInPreviousArray != eventAfterMovedEvent) {
                console.log('the moved event had an event before and after it in the previous array. Updating the event before the moved event in previous array');
                this.updateEventBeforeMovedEventInPreviousArray(eventBeforeMovedEventInPreviousArray, eventAfterMovedEventInPreviousArray, nextEvents);
            } // END CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT AND AN EVENT AFTER THE MOVED EVENT

            // CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT BUT NOT AFTER THE MOVED EVENT
            else if (eventBeforeMovedEventInPreviousArray && !eventAfterMovedEventInPreviousArray
                && eventBeforeMovedEventInPreviousArray != eventBeforeMovedEvent) {
                console.log('the moved event had an event before it but not after it in the previous array. Updating the event before the moved event in the previous array');
                end = this.resetEventEndTime(eventBeforeMovedEventInPreviousArray.start, eventBeforeMovedEventInPreviousArray.duration);
                console.log(`reset eventBeforeMovedEvent end time to ${end}`)
                let updatedEvent = { ...eventBeforeMovedEventInPreviousArray, end };
                console.log('eventBeforeMovedEventInPreviousArray end time reset. That event is now:');
                console.log(updatedEvent);
                idx = events.indexOf(eventBeforeMovedEventInPreviousArray);
                nextEvents.splice(idx, 1, updatedEvent);
            } // END CASE: MOVED EVENT'S PREVIOUS ARRAY HAD AN EVENT BEFORE THE MOVED EVENT BUT NOT AFTER THE MOVED EVENT
            // END HANDLE MOVED EVENT'S PREVIOUS ARRAY
        }
        // END CASE: EVENT AFTER MOVED EVENT EXISTS
        else {
            console.log('the moved event is the first in the schedule');
            this.setState({
                events: nextEvents
            })
        }
    } // END UPDATE DOM UPON MOVING EVENT

    // ORDER EVENTS IN ARRAYS SORTED BY RESOURCE AND TIME
    orderEventsByResourceAndTime = (resourcesArray, eventsArray) => {
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
                    events={this.state.events}
                    resources={resources.list}
                    statusHeadings={[{ id: 1, title: 'connected' }, { id: 2, title: 'Confirmed' }]}
                    usersAvailability={this.state.usersAvailability}
                    onEventDrop={this.moveEvent}
                    defaultView='resource' // set to 'resource'
                    // defaultDate={new Date()}
                    defaultDate={new Date(2018, 5, 22, 0, 0, 0, 0)}
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
