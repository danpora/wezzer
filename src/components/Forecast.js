import React from 'react'
import PropTypes from 'prop-types'
import WeatherIcon from './WeatherIcon'
import cn from 'classnames'

import {withStyles} from '@material-ui/core'

const styles = {
  centerText: {
    margin: 'auto',
    width: '150px'
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
  const isDataAvailable = Object.keys(props.data).length !== 0
  
  return isDataAvailable ? (
    <WeatherViewerStyled {...props} />
  ) : (
    <NoLocationAvailable className={props.className} />
  )
}

function NoLocationAvailable(props) {
  return (
    <div className={cn(props.className, 'center')}>
      To begin, please select a location first..
    </div>
  )
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
