import React, { Component } from 'react';
import { connect } from 'react-redux';


class Legend extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        

        return (

            <div class="legend"><h1>Legend</h1>
                <p> <img src="1.png"/> Photog 1 </p>
                <p> <img src="2.png"/> Photog 2 </p>
                <p> <img src="3.png"/> Photog 3 </p>
                <p> <img src="4.png"/> Photog 4 </p>
                <p> <img src="5.png"/> Photog 5 </p>
                <p> <img src="6.png"/> Photog 6 </p>
                <p> <img src="7.png"/> Photog 7 </p>
                <p> <img src="8.png"/> Photog 8 </p>

            </div>

        )
    }
}


export default connect()(Legend)
