import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CloudIcon from '@material-ui/icons/Cloud';


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

function Header(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CloudIcon className={classes.headerIcon}/>
      <span className={classes.title}>Wezzer</span>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);