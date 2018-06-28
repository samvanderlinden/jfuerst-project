import React, { Component } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  user: state.user,
});

class TimeBar extends Component {


  render() {

    return (
      <div>
        <h3>This component is for the vertical time bar</h3>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TimeBar);

