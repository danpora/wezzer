import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloudIcon from '@material-ui/icons/Cloud';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  headerIcon: {
    color: '#6abfea',
    fontSize: '47px'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
    fontSize: '1.3em',
    fontWeight: '100'
  }
};

function CustomizedInputBase(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CloudIcon className={classes.headerIcon}/>
      <span className={classes.title}>Wezzer</span>
    </div>
  );
}

CustomizedInputBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputBase);