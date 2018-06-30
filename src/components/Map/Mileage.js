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
                    <tr>
                        <th>Photographer</th>
                        <td>Photog 1</td>
                        <td>Photog 2</td>
                        <td>Photog 3</td>
                        <td>Photog 4</td>
                        <td>Photog 5</td>
                        <td>Photog 6</td>
                        <td>Photog 7</td>
                        <td>Photog 8</td>
                    </tr>
                    <tr>
                        <th>Total Mileage</th>
                        <td>100 Miles</td>
                        <td>100 Miles</td>
                        <td>100 Miles</td>
                        <td>100 Miles</td>
                        <td>100 Miles</td>
                        <td>100 Miles</td>
                        <td>100 Miles</td>
                        <td>100 Miles</td>
                    </tr>
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
