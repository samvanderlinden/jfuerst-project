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

    render() {

        // console.log('-------cool', this.getMarker());
        let appointments = this.props.reduxState.mapData.mapData;

        let photogs = appointments.map(((appointment, i) => {
            return <tr><td><img src={(i ++) + '.png' } />{appointment.calendar}</td><td>{appointment.travel_distance} miles</td></tr>
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
