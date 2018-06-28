import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Date from '../Schedule/Date/Date';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    width: '100%',
  },
};


const mapStateToProps = state => ({
  user: state.user,
});

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
    }
  }

  

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  logout = () => {
    this.props.dispatch({
      type: LOGIN_ACTIONS.LOGOUT
    });
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <div className={classes.root}>
          <List>           
              <Link to="/schedule">Schedule</Link>           
          </List>
          <Divider />
          <List>            
              <Link to="/map">Map</Link>
          </List>
          <Divider />
          <List>
          <button onClick={this.logout}>Log Out</button>
          </List>
        </div>
      </div>
    );

    return (
      <div className={classes.list}>
        <Button onClick={this.toggleDrawer('left', true)}><i className="fas fa-bars fa-2x"></i></Button>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Nav));

