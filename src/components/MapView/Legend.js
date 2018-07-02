import React, { Component } from 'react';
import { connect } from 'react-redux';


class Legend extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        

        return (

            <div className="legend"><h2 className="title-legend">LEGEND</h2>
                <ul className="legend-img">
                    <li><img src="1.png"/> Photog 1</li>
                    <li><img src="2.png"/> Photog 2</li>
                    <li><img src="3.png"/> Photog 3</li>
                    <li><img src="4.png"/> Photog 4</li>
                    <li><img src="5.png"/> Photog 5</li>
                    <li><img src="6.png"/> Photog 6</li>
                    <li><img src="7.png"/> Photog 7</li>
                    <li><img src="8.png"/> Photog 8</li>
                </ul>


            </div>

        )
    }
}


export default connect()(Legend)
