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
            lngLat: {
                lng: -93.258133,
                lat: 44.986656
            },
            zoom: 8,
        };
    }

    render() {
        return (

            <div style={{ height: '400px', width: '500px', position: 'absolute' }}>
                <Map
                    google={this.props.google}
                    zoom={this.state.zoom}
                    initialCenter={this.state.lngLat}
                >

                    <Marker 
                        name={'Current location'} />

                </Map>
            </div>
        )
    }
}

const connectToGoogleMaps = GoogleApiWrapper({
    apiKey: ('AIzaSyAfrUvtgh7j4JKGW6bkFPspZ4ZZ8uqlE-M'),
})(MapContainer)

export default connect(mapStateToProps)(connectToGoogleMaps)
