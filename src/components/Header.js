import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CloudIcon from '@material-ui/icons/Cloud';
import BrightIcon from '@material-ui/icons/Brightness7';
import DarkIcon from '@material-ui/icons/Brightness2';

import Switch from '@material-ui/core/Switch';

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    gridColumnStart: 2,
  },
  icon: {
    color: '#6abfea',
    fontSize: '47px',
    transition: 'color 1s',
    '&:hover': {
      color: '#e6ca57',
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
    fontSize: '1.3em',
    fontWeight: '100',
  },
  switchContainer: {
    gridColumnStart: 3,
  },
  themeIcon: {
    fontSize: '1em',
  },
};

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Icon classes={classes} />
      <ThemeButton classes={classes} />
    </div>
  );
}

function Icon({ classes }) {
  return (
    <div className={classes.iconContainer}>
      <CloudIcon className={classes.icon} />
      <span className={classes.title}>Wezzer</span>
    </div>
  );
}

function ThemeButton({ classes, isDarkTheme, handleThemeToggle }) {
  return (
    <div className={classes.switchContainer}>
      <BrightIcon className={classes.themeIcon} />
      <Switch
        checked={isDarkTheme}
        onChange={handleThemeToggle}
        value="dark"
        color="primary"
      />
      <DarkIcon className={classes.themeIcon} />
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
