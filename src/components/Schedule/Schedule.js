import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import TimeBar from '../Schedule/TimeBar/TimeBar';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';
import AppointmentCard from './AppointmentCard/AppointmentCard';
import SchedRow from './SchedRow/SchedRow';


const mapStateToProps = state => ({
  user: state.user,
});

class Schedule extends Component {

  constructor(props) {
    super(props);


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

  logout = () => {
    this.props.dispatch({
      type: LOGIN_ACTIONS.LOGOUT
    });
  }

  render() {

    const content = (
      <div>
        <h1 id="schedule">Schedule</h1>
        <button onClick={this.logout}>Log Out</button>
      </div>
    );

    return (
      <div>
        <Nav />
        {content}
        <TimeBar />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Schedule);

