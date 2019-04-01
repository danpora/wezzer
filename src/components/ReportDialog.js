import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Tooltip from '@material-ui/core/Tooltip';
import DialogTitle from '@material-ui/core/DialogTitle';

import { weatherConditions } from '../constants';

import { withStyles } from '@material-ui/core';

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '20px',
  },
  buttonContainer: {
    margin: 'auto',
    '@media (min-width: 768px)': {
      margin: '45px auto',
    }
  },
  button: {
    color: '#3782a9',
  },
  weatherIcon: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}

class ReportDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleWeatherIconClick = this.handleWeatherIconClick.bind(this);
  }

  handleWeatherIconClick(weatherCode) {
    this.setState({ open: false });
    this.props.reportWeather(weatherCode);
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.buttonContainer}>
        <Tooltip
          placement="top-end"
          style={{ fontSize: '3em'}}
          title={
            this.props.isLocationAvailable
              ? 'Report the weather you see'
              : 'Enable location in order to make a report'
          }
        >
          <span>
            <Button
              className={classes.button}
              variant="outlined"
              disabled={
                this.props.buttonLabel !== '' || !this.props.isLocationAvailable
              }
              onClick={this.handleClickOpen}
            >
              {this.props.buttonLabel || 'Report weather'}
            </Button>
          </span>
        </Tooltip>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Whats the weather?</DialogTitle>
          <DialogContent>
            <div className={classes.gridContainer}>
              {weatherConditions
                .filter(w => w.isReportable)
                .map((w) => (
                  <img
                    key={w.code}
                    className={classes.weatherIcon}
                    src={require(`../assets/images/weather/${w.icon.day}.svg`)}
                    onClick={this.handleWeatherIconClick.bind(null, w.code)}
                  />
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Nevermind
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


ReportDialog.propTypes = {
  reportWeather: PropTypes.func,
  style: PropTypes.object,
  buttonLabel: PropTypes.string,
};

export default withStyles(styles)(ReportDialog);