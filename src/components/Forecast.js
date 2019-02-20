import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Forecast(props) {
  const { weather = [{}], name, sys = {}, main = {} } = props.data;
  return (
    <div>
      <div>
        <WeatherIcon code={weather[0].id} />
      </div>
      <div>
        <div style={{ fontSize: '3em' }}>{weather[0].description}</div>
        <div style={{ fontSize: '2em' }}>{`${name}, ${sys.country}`}</div>
      </div>
      <div>
        <div style={{ fontSize: '4em' }}>{`${main.temp}°C`}</div>
      </div>
    </div>
  );
}

function WeatherIcon({ code }) {
  const iconName = weatherCodeToIcon[code] || weatherCodeToIcon.default;

  return <FontAwesomeIcon icon={iconName} size={'5x'} color="grey" />;
}

const weatherCodeToIcon = {
  800: 'sun',
  801: 'cloud-sun',
  802: 'cloud',
  803: 'cloud',
  804: 'cloud',
  500: 'cloud-rain',
  500: 'cloud-showers-heavy',
  501: 'cloud-showers-heavy',
  502: 'cloud-showers-heavy',
  503: 'cloud-showers-heavy',
  504: 'cloud-showers-heavy',
  511: 'cloud-showers-heavy',
  520: 'cloud-showers-heavy',
  521: 'cloud-showers-heavy',
  522: 'cloud-showers-heavy',
  531: 'cloud-showers-heavy',
  default: 'meteor',
};
