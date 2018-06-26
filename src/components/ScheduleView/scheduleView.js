import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';

import './ScheduleView.css';

//START SHOPIFY DRAGGABLE LIBRARY IMPORTS//
import { Droppable } from '@shopify/draggable';

//END SHOPIFY DRAGGABLE LIBRARY IMPORTS//


//START DRAG AND DROP ELEMENT MAKING//
const droppable = new Droppable(document.querySelectorAll('ul'), {
    draggable: 'li',
    dropzone: '#dropzone'
});


//END DRAG AND DROP ELEMENT MAKING//

const mapStateToProps = state => ({
    user: state.user,
});

class UserPage extends Component {
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

// droppable.on('droppable:dropped', () => console.log('droppable:dropped'));
// droppable.on('droppable:returned', () => console.log('droppable:returned'));


logout = () => {
    this.props.dispatch({
        type: LOGIN_ACTIONS.LOGOUT
    });
    // this.props.history.push('home');
}

render() {
    let content = null;

    if (this.props.user.userName) {
        content = (
            <div>
                <container id="calendarContainer">
                    <div class="timeDisplay" id="timeBar">
                    </div>
                    <container class="calendarContainer">
                        <h6>
                            Schedule 01
                            </h6>
                        <div class="calendar" id="calendar1">
                            <ul>
                                <li>
                                    Test item 1
                                </li>
                                <li>
                                    Test item 2
                                    </li>
                            </ul>
                        </div>
                    </container>
                    <container class="calendarContainer">
                        <h6>
                            Schedule 02
                            </h6>
                        <div class="calendar" id="calendar2">
                            <ul id="dropzone">
                                <li>
                                    Test item 3
                                </li>
                            </ul>
                        </div>
                    </container>
                </container>
            </div>
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
export default connect(mapStateToProps)(UserPage);

