import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const mapStateToProps = state => ({
    user: state.user,
});

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latLng: {
                lng: -93.258133,
                lat: 44.986656
            },
            zoom: 8,
        };
    }



    render() {
        let place = [
            {lat:  44.9828, lng: -93.1539 },
            {lat: 44.8549, lng: -93.2422},
            {lat: 44.9778, lng: -93.2650},
        ]

        let placeDisplayOnMarker = place.map(((location, i) => {
            return (
                <Marker key = {i} position={{ lat: location.lat, lng: location.lng}}/>
            );
        }))

        return (

            <div style={{ height: '400px', width: '500px', position: 'absolute' }}>
                <Map
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
    apiKey: ('AIzaSyAfrUvtgh7j4JKGW6bkFPspZ4ZZ8uqlE-M'),
})(MapContainer)


export default connect(mapStateToProps)(connectToGoogleMaps)
