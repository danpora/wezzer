import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { weatherConditions } from '../constants';

const weatherCodeToIcon = (dayOrNight) => weatherConditions.reduce((acc, w) => ({
  ...acc,
  [w.code]: w.icon[dayOrNight]
}), {})

const getDayOrNight = (date) => {
  const now = new Date();
  const hour = now.getHours();

  return (hour >= 18 && hour <= 5) ? 'day' : 'night';
}

export default function WeatherIcon({ code }) {
  const dayOrNight = getDayOrNight();
    
  const iconName = 
    weatherCodeToIcon(dayOrNight)[code] || 
    weatherCodeToIcon(dayOrNight).default;

  return <FontAwesomeIcon icon={iconName} size={'5x'} color="grey" />;

}


WeatherIcon.propTypes = {
  code: PropTypes.number
}
