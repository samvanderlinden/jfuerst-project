import React, { Component } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
    user: state.user,
});




class Mileage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mileage: {

            },

        };
    }

    render() {

        let photogTotalMileage = this.props.totalMileage

        return (

            <div>
                <table class="map-table mileage">
                    <thead>
                        <tr>
                            <th>Photographer</th>
                            <th>Total Mileage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Pa Yeng</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>Pa Yeng</td>
                            <td>600</td>
                        </tr>
                        <tr>
                            <td>Pa Yeng</td>
                            <td>700</td>
                        </tr>
                    </tbody>
                </table>


            {/* <table id="mileage">
                <thead>
                    <tr>
                        <th>Photographer</th>
                        <th>Total Mileage</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.calendar.map(photog => <tr key={photog._id}>
                    <td key={photog._id}></td>
                    <td>{this.photogTotalMileage}</td>
                    </tr>)} 
                </tbody>
            </table> */}

            </div>
        )
    }
}


export default connect(mapStateToProps)(Mileage)
