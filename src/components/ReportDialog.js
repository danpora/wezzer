import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { weatherConditions } from '../constants';

export default class ReportDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleWeatherIconClick = this.handleWeatherIconClick.bind(this);
  }

  handleWeatherIconClick (weatherCode) {
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
    return (
      <div style={this.props.style}>
        <Button
          variant="outlined"
          style={{ color: '#3782a9' }}
          disabled={this.props.buttonLabel !== ''}
          onClick={this.handleClickOpen}
        >
          { this.props.buttonLabel || 'Report weather' }
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Whats the weather?</DialogTitle>
          <DialogContent>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridGap: '20px',
              }}
            >
              {weatherConditions.map(w => 
                  <FontAwesomeIcon 
                    key={w.code} 
                    icon={w.icon.day} 
                    size={'2x'} 
                    color={'grey'} 
                    onClick={this.handleWeatherIconClick.bind(null, w.code)}
                  />
                )}
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
  buttonLabel: PropTypes.string
}