import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
          onClick={this.handleClickOpen}
        >
          Report weather
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
              <FontAwesomeIcon icon={'cloud'} size={'2x'} color="grey" />
              <FontAwesomeIcon icon={'sun'} size={'2x'} color="grey" />
              <FontAwesomeIcon icon={'cloud-rain'} size={'2x'} color="grey" />
              <FontAwesomeIcon
                icon={'cloud-showers-heavy'}
                size={'2x'}
                color="grey"
              />
              <FontAwesomeIcon icon={'cloud-sun'} size={'2x'} color="grey" />
              <FontAwesomeIcon
                icon={'cloud-sun-rain'}
                size={'2x'}
                color="grey"
              />
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
