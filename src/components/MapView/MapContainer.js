import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


const mapStateToProps = state => ({
    user: state.user,
    reduxState: state,
});

const API_KEY = process.env.REACT_APP_API_KEY;

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latLng: {
                lat: 44.986656,
                lng: -93.258133,
            },
            zoom: 12,
        };
    }

    getMarker = (photog) => {
        const markerImg = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png',]
        if (photog == 'photog 1') {
            return markerImg[0];
        } else if (photog == 'photog 2') {
            return markerImg[1];
        } else if (photog == 'photog 3') {
            return markerImg[2];
        } else if (photog == 'photog 4') {
            return markerImg[3];
        } else if (photog == 'photog 5') {
            return markerImg[4];
        } else if (photog == 'photog 6') {
            return markerImg[5];
        } else if (photog == 'photog 7') {
            return markerImg[6];
        } else if (photog == 'photog 8') {
            return markerImg[7];
        } else if (photog == 'photog 9') {
            return markerImg[8];
        } else if (photog == 'photog 10') {
            return markerImg[9];
        } else if (photog == 'photog 11') {
            return markerImg[10];
        } else if (photog == 'photog 12') {
            return markerImg[11];
        } else if (photog == 'photog 13') {
            return markerImg[12];
        } else if (photog == 'photog 14') {
            return markerImg[13];
        } else if (photog == 'photog 15') {
            return markerImg[14];
        }
    }

    render() {

        let appointments = this.props.reduxState.mapData.mapData;
        let placeDisplayOnMarker = appointments.map(((appointment) => {
            return (
                <Marker key={appointment._id} position={{ lat: appointment.lat, lng: appointment.lng }} icon={this.getMarker(appointment.calendar)} />
            )
        }));

        // console.log('map data:', this.mapData);
        // let place = [
        //     // { lat: 44.9828, lng: -93.1539 },
        // ]
        // let marker = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png',]
        // let counter = 0;

        // let placeDisplayOnMarker = place.map(((location, i) => {

        //     return (
        //         <Marker key={i} position={{ lat: location.lat, lng: location.lng }} icon={'1.png'}
        //         />
        //     );
        // }))

        return (

            <div style={{ height: '600px', width: '800px', position: 'relative' }}>
                <Map className="map"
                    google={this.props.google}
                    zoom={this.state.zoom}
                    initialCenter={this.state.latLng}
                >
                    {placeDisplayOnMarker}

                </Map>


            </div>
        )
    }
}

const connectToGoogleMaps = GoogleApiWrapper({
    // apiKey: API_KEY,
    apiKey: ('AIzaSyAfrUvtgh7j4JKGW6bkFPspZ4ZZ8uqlE-M')
})(MapContainer)


export default connect(mapStateToProps)(connectToGoogleMaps)
