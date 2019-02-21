import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen () {
    this.setState({ open: true });
  };

  handleClose () {
    this.setState({ open: false });
  };

  render() {
    return (
      <div style={this.props.style}>
        <Button variant="outlined" style={{ color: '#3782a9' }} onClick={this.handleClickOpen}>
          Report weather
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Whats the weather?</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Report
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}