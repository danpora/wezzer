import React from 'react';
import WeatherIcon from './WeatherIcon';

export default function Forecast(props) {
  const { weather = [{}], name, sys = {}, main = {} } = props.data;

  return (
    <div style={{ padding: '15px 0' }}>
      <div style={{ textAlign: 'center' }}>
        <WeatherIcon code={weather[0].id} />
      </div>
      <div>
        <div style={{ textAlign: 'center', fontSize: '3em' }}>{weather[0].description}</div>
        <div style={{ textAlign: 'center', fontSize: '2em' }}>{`${name}, ${sys.country}`}</div>
      </div>
      <div>
        <div style={{ textAlign: 'center', fontSize: '4em' }}>{`${main.temp}°C`}</div>
      </div>
    </div>
  );
}