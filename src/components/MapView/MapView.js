import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { MAP_ACTIONS } from '../../redux/actions/mapActions';
import MapContainer from './MapContainer/MapContainer';
import Mileage from './Mileage/Mileage';
import map from './map.css'

const mapStateToProps = state => ({
  user: state.user,
  reduxState: state
});

class MapView extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   mapData: this.props.reduxState.mapData.mapData,
    //   marker: [
    //     'marker1',
    //     'marker2'
    //   ],
    //   photogs: [],// inside array is an object = {photog == name, marker == marker};
    // }
}

  componentDidMount() {
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_USER
    });
    this.props.dispatch({
      type: MAP_ACTIONS.GET_DATA
    });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  // setPhotogMarker = () =>{
  //   console.log('map state data 12312312312312312',this.state.mapData);
  //   let counter = 0;
  //   for(let i = 0; i < this.state.mapData.length; i++){
  //     if(this.checkIfPhotogDontExist(this.props.reduxState.mapData.mapData[i].calendar)){

  //       this.setState({
  //           photogs: [...this.state.photogs, {
  //           photog: this.state.mapData[i].calendar,
  //           marker: this.state.marker[counter],
  //         }]
  //       })

  //       counter++;
  //     }
  //   }
  // }

  // //check if the photog already exist in photogs state array.
  // checkIfPhotogDontExist(photog){
  //   for(let i = 0; i < this.state.photogs.length; i ++){
  //     if(photog == this.state.photogs[i].photog){
  //       return false;
  //     }
  //   }return true;
  // }

  render() {
    let content = null;


    if (this.props.user.userName) {
      content = (
        <div>
        </div>
      );
    }

    // this.setPhotogMarker();

    // console.log('-----------photog state:--------------------', this.state.photogs);
    return (
      <div className="mapView">
        <Nav />
        {content}
        <div className="wrapper">
          <MapContainer />
          <Mileage/>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(MapView);

