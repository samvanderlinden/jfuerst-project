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
                lat: 44.986656,
                lng: -93.258133,
            },
            zoom: 12,
        };
    }




    render() {
        console.log('----------', this.props)
        console.log('----------state', this.state)
        console.log('google------', this.props.google)


        let place = [
            { lat: 44.9828, lng: -93.1539 },
            { lat: 44.8549, lng: -93.2422 },
            { lat: 44.9778, lng: -93.2650 },

        ]

        let marker = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png',]
        let counter = 0;

        let placeDisplayOnMarker = place.map(((location, i) => {

            return (
                <Marker key={i} position={{ lat: location.lat, lng: location.lng }} icon={'1.png'}
                />
            );
        }))


        // let oMarker = new google.maps.Marker({
        //     position: latLng,
        //     sName: "Marker Name",
        //     map: map,
        //     icon: {
        //         path: google.maps.SymbolPath.CIRCLE,
        //         scale: 8.5,
        //         fillColor: "#F00",
        //         fillOpacity: 0.4,
        //         strokeWeight: 0.4
        //     },
        // });

/* reducer
let imgMarker = [
 'asdfds',
 'asdfsad',
]

let counter = 0;

for (let i = 0; i < clients; i++) {
 if (clients[i].calander == 'phota1'){
   clients[i].imgMarker = imgMarker[0];
 }else if(clients[i].calander == 'phota2'){
   clients[i].imgMarker = imgMarker[1];
 }else if(clients[i].calander == 'phota3'){
   clients[i].imgMarker = imgMarker[2];
 }else if(clients[i].calander == 'phota4'){
   clients[i].imgMarker = imgMarker[3];
 }else {
   clients[i].imgMarker = imgMarker[4];
 }
 
 // clients.markPath = imgMarker[counter];
 // counter = (counter++) % imgMarker.length; //increment image counter and get reminder
}
*/


        return (

            // <div>
            <div style={{ height: '600px', width: '1370px', position: 'relative' }}>
                <Map className="map"
                    google={this.props.google}
                    zoom={this.state.zoom}
                    initialCenter={this.state.latLng}
                >
                    {placeDisplayOnMarker}

                    <Marker
                        position={{ lat: 45.1081, lng: -93.3761 }}
                        icon={{
                            url: "6.png",
                        }}
                    />

                    <Marker
                        position={{ lat: 46.1090, lng: -92.3761 }}
                        icon={{
                            url: "2.png",
                            scale: 50,
                        }}
                    />

                    <Marker
                        icon={{
                            url: "8.png",
                        }}
                    />
                </Map>
            </div>
        )
    }
}

const connectToGoogleMaps = GoogleApiWrapper({
    apiKey: ('AIzaSyAfrUvtgh7j4JKGW6bkFPspZ4ZZ8uqlE-M'),
})(MapContainer)


export default connect(mapStateToProps)(connectToGoogleMaps)
