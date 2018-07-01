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
                </tbody>  
                    <tr>
                    <td>Photog 1</td>
                    <td>100 Miles</td>   
                    </tr>  
                    <tr>
                    <td>Photog 2</td>
                    <td>100 Miles</td>   
                    </tr>  
                    <tr>
                    <td>Photog 3</td>
                    <td>100 Miles</td>   
                    </tr>  
                    <tr>
                    <td>Photog 4</td>
                    <td>100 Miles</td>   
                    </tr>  
                    <tr>
                    <td>Photog 5</td>
                    <td>100 Miles</td>   
                    </tr>  
                    <tr>
                    <td>Photog 6</td>
                    <td>100 Miles</td>   
                    </tr>  
                    <tr>
                    <td>Photog 7</td>
                    <td>100 Miles</td>   
                    </tr>  
                    <tr>
                    <td>Photog 8</td>
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
