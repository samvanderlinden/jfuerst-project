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

class Map extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_USER
    });
  }

  render() {


    return (
      <div>
        <Nav />
        <MapContainer />
        <Legend />
        <Mileage />

      </div>
    );
  }
}

export default connect(mapStateToProps)(Map);

