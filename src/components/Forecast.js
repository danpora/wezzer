import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import WeatherIcon from './WeatherIcon';

const styles = {
  centerText: {
    textAlign: 'center'
  },
  smallText: {
    fontSize: '2em'
  },
  mediumText: {
    fontSize: '3em'
  },
  largeText: {
    fontSize: '4em'
  }
}

export default function Forecast(props) {
  const isDataNotAvailable = Object.keys(props.data).length === 0;
  
  return isDataNotAvailable ? (
    <NoLocationAvailable className={props.className} />
  ) : (
    <WeatherViewerStyled {...props} />
  );
}

function NoLocationAvailable(props) {
  return <div className={props.className}>To begin, please select a location first..</div>;
}

function WeatherViewer(props) {
  const { className, classes } = props;
  const { weather = [{}], name, sys = {}, main = {} } = props.data;

  return (
    <div className={className}>
      <div className={classes.centerText}>
        <WeatherIcon code={weather[0].id} />
      </div>
      <div>
        <div className={classes.mediumText}>
          {weather[0].description}
        </div>
        <div className={classes.smallText}>
          {`${name}, ${ sys.country }`}
        </div>
      </div>
      <div>
        <div className={classes.largeText}>
          {`${ main.temp }°C`}</div>
      </div>
    </div>
  );
}

const WeatherViewerStyled = withStyles(styles)(WeatherViewer);

Forecast.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};
