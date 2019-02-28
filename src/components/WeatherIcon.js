import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { weatherConditions } from '../constants';

const weatherCodeToIcon = weatherConditions.reduce((acc, w) => ({
  ...acc,
  [w.code]: w.icon.day
}), {})

export default function WeatherIcon({ code }) {

  const iconName = weatherCodeToIcon[code] || weatherCodeToIcon.default;

  return <FontAwesomeIcon icon={iconName} size={'5x'} color="grey" />;

}

