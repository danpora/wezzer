import React from 'react';
import PropTypes from 'prop-types';

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
  
  return <img src={require(`../assets/images/weather/${iconName}.svg`)} />;

}


WeatherIcon.propTypes = {
  code: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}
