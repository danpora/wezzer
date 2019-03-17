import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import * as Utils from '../utils';

import WeatherIcon from './WeatherIcon';

const styles = {
  root: {
    padding: '15px 0'
  },
  weatherIcon: {
    margin: 'auto',
    width: '150px'
  },
  centerText: {
    textAlign: 'center'
  },
  mediumText: {
    fontSize: '3em'
  }
}

export default function Reports(props) {
  const { className } = props;

  const sortedReportsCounts = Utils.getDominantWeatherCodeFromReports(
    props.data,
  );
  const isNoReports = sortedReportsCounts.length === 0;

  return (
    <div className={className}>
      {isNoReports ? (
        'No reports Available'
      ) : (
        <ReportsViewerStyled reportsCounts={sortedReportsCounts} />
      )}
    </div>
  );
}

function ReportsViewer (props) {
  const { classes } = props;
  const [weatherCode, weatherCodeVoters] = props.reportsCounts[0];

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.weatherIcon}>
        <WeatherIcon code={weatherCode} />
        </div>
        <div className={classes.centerText + ' ' + classes.mediumText}>
          {Utils.weatherCodeToDescription[weatherCode]}
        </div>
        <div className={classes.centerText}>
          {`According to ${weatherCodeVoters} humans (10Km around you)`}
        </div>
      </div>
    </React.Fragment>
  );
}

const ReportsViewerStyled =  withStyles(styles)(ReportsViewer);

Reports.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array
}
