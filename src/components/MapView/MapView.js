import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';
import MapContainer from './MapContainer';
import Legend from './Legend';
import Mileage from './Mileage';
import map from './map.css'

const mapStateToProps = state => ({
  user: state.user,
});

class MapView extends Component {

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

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content }
        <MapContainer />
        <Legend />
        <Mileage />

      </div>
    );
  }
}

export default connect(mapStateToProps)(MapView);

