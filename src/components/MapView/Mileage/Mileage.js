import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
    reduxState: state,
});

class Mileage extends Component {
    constructor(props) {
        super(props);
    }

    //loop through marker and assigning to a photog
    getMarker = (photog) => {
        const markerImg = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png',]
        if (photog.toLowerCase() == 'photog 1') {
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
        let photogs = appointments.map(((appointment) => {
            return <tr><td><img src={this.getMarker(appointment.calendar)} />{appointment.calendar}</td><td>{appointment.travel_distance} miles</td></tr>
        }));

        return (

            <div className="mileage-table">
                <table className="map-table mileage">
                    <thead>
                        <tr>
                            <th>Photographer</th>
                            <th>Total Mileage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {photogs}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Mileage)
