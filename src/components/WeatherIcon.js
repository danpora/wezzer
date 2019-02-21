import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

export default function WeatherIcon({ code }) {

  const iconName = weatherCodeToIcon[code] || weatherCodeToIcon.default;

  return <FontAwesomeIcon icon={iconName} size={'5x'} color="grey" />;

}

