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

class Dnd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: resources.events,
            usersAvailability: {},
        }
        this.moveEvent = this.moveEvent.bind(this)
    }

    // WHALEHUNTER: created this function
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
    }

    componentDidMount() {
        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER
        });
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
        }
        this.props.dispatch({
            type: SCHEDULE_ACTIONS.GET_DRIVE_TIME,
            payload
        })
    }
    // END DISPATCH ACTION TO GET DRIVE TIME BETWEEN DROPPED LOCATION AND NEXT LOCATION

    logout = () => {
        this.props.dispatch({
            type: LOGIN_ACTIONS.LOGOUT
        });
        // this.props.history.push('home');
    }

    // WHALEHUNTER: manipulated this function
    moveEvent({ event, start, end, ...rest }) {
        const { events } = this.state;
        const idx = events.indexOf(event);
        const resourceId = rest.resource || event.resourceId;
        let updatedEvent = { ...event, start, end, resourceId };
        let nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);

        //WHALEHUNTER: START WHALEHUNTER'S LINES
        console.log(nextEvents);

        // ORDER EVENTS BY TIME WITHIN AN ARRAY FOR EACH RESOURCE
        // AND PUT THOSE ARRAYS OF EVENTS IN A PARENT ARRAY
        const arrayOfResourcesWithOrderedArraysOfEvents = this.orderEventsByResourceAndTime(resources.list, nextEvents);
        console.log(arrayOfResourcesWithOrderedArraysOfEvents);
        // END ORDERING EVENTS

        // FIND THE MOVED EVENT IN ITS ORDERED ARRAY
        console.log(event.id);
        console.log(this.selectEventAfterMovedEventInOrderedArrayOfEvents(arrayOfResourcesWithOrderedArraysOfEvents, event.id));
        // console.log(movedEvent);
        // END FIND THE MOVED EVENT IN ITS ORDERED ARRAY

        // FIND THE EVENT AFTER THE MOVED EVENT IN ITS ORDERED ARRAY
        // const eventAfterMovedEvent = this.selectEventAfterMovedEventInItsOrder(arrayOfResourcesWithOrderedArraysOfEvents, event.id);

        // CALCULATE DRIVE TIMES BETWEEN THE MOVED EVENT AND THE EVENT AFTER THE MOVED EVENT
        this.getDriveTime();
        // END CALCULATE DRIVE TIMES BETWEEN MOVED EVENT AND THE EVENT AFTER THE MOVED EVENT
        
        // RESENT EVENT END TIME
        end = moment(start).add(event.duration,'m').toDate();
        console.log(`reset end time to ${end}`)
        // END RESENT EVENT END TIME

        // UPDATE EVENT END TIME TO INCLUDE DRIVE TIME
        end = moment(end).add(this.props.currentDriveTime,'m').toDate();
        console.log(`after drive time, end is ${end}`);
        updatedEvent = { ...event, start, end, resourceId };
        // END UPDATE EVENT END TIME TO INCLUDE DRIVE TIME
        
        // UPDATE EVENTS ARRAY WITH UPDATED EVENT
        nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);
        // END UPDATE EVENTS ARRAY WITH UPDATED EVENT

        // DISPATCH A CALL TO UPDATE THE MONGODB WITH MOVED EVENT
        // END DISPATCH A CALL TO UPDATE THE MONGODB WITH MOVED EVENT

        //WHALEHUNTER: END WHALEHUNTER'S LINES

        this.setState({
            events: nextEvents
        })

        alert(`${event.title} was dropped onto ${event.start}`);
    }

    // WHALEHUNTER: created this function
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
    }

    // WHALEHUNTER: created this function
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
                    // events={resources.events}
                    resources={resources.list}
                    statusHeadings={[{ id: 1, title: 'connected' }, { id: 2, title: 'Confirmed' }]}
                    // slotProp={this.slotPropGetter(date)}
                    // slotPropGetter={(date) => this.slotPropGetter(date) }
                    usersAvailability={this.state.usersAvailability}
                    onEventDrop={this.moveEvent}
                    defaultView='resource' // set to 'resource' for default resource view
                    defaultDate={new Date()}
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
                <Nav />
                {content}
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(Dnd));
