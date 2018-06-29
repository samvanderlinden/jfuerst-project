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
            return (

                <div>
                    <table id="mileage">
                        <tr>
                            <th>Photographer</th>
                            <th>Total Mileage</th>
                        </tr>
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
                    </table>
                </div>
            )
        }
    }


export default connect(mapStateToProps)(Mileage)
