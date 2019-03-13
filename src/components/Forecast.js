import React from 'react';
import PropTypes from 'prop-types';

import WeatherIcon from './WeatherIcon';

export default function Forecast(props) {
  const isDataNotAvailable = Object.keys(props.data).length === 0;
  console.log('isDataNotAvailable::', isDataNotAvailable)
  
  return isDataNotAvailable ? (
    <NoLocationAvailable className={props.className} />
  ) : (
    <WeatherViewer {...props} />
  );
}

function NoLocationAvailable(props) {
  return <div className={props.className}>To begin, please select a location first..</div>;
}

function WeatherViewer(props) {
  const { className } = props;
  const { weather = [{}], name, sys = {}, main = {} } = props.data;

  return (
    <div className={className}>
      <div style={{ textAlign: 'center' }}>
        <WeatherIcon code={weather[0].id} />
      </div>
      <div>
        <div style={{ textAlign: 'center', fontSize: '3em' }}>
          {weather[0].description}
        </div>
        <div style={{ textAlign: 'center', fontSize: '2em' }}>{`${name}, ${
          sys.country
        }`}</div>
      </div>
      <div>
        <div style={{ textAlign: 'center', fontSize: '4em' }}>{`${
          main.temp
        }°C`}</div>
      </div>
    </div>
  );
}

Forecast.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};
