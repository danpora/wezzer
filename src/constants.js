export const WEZZER_API = 'https://0brc1jr0z3.execute-api.eu-west-1.amazonaws.com/v1';

export const weatherConditions = [
  {
    displayName: 'Clear Sky',
    code: 800,
    icon: { day: 'sun', night: 'moon' },
  },
  {
    displayName: 'Few Clouds',
    code: 801,
    icon: { day: 'cloud-sun', night: 'cloud-moon' },
  },
  {
    displayName: 'Scattered Clouds',
    code: 802,
    icon: { day: 'cloud', night: 'cloud' },
  },
  {
    displayName: 'Light Rain',
    code: 500,
    icon: { day: 'cloud-rain', night: 'cloud-moon-rain' },
  },
  {
    displayName: 'Heavy Intensity Rain',
    code: 521,
    icon: { day: 'cloud-showers-heavy', night: 'cloud-showers-heavy' },
  },
  {
    displayName: 'Moderate Rain',
    code: 502,
    icon: { day: 'cloud-sun-rain', night: 'cloud-moon-rain' },
  },
  {
    displayName: 'Snow',
    code: 601,
    icon: { day: 'cloud-meatball', night: 'cloud-meatball' },
  },
  {
    displayName: 'Fog',
    code: 741,
    icon: { day: 'smog', night: 'smog' },
  },
  {
    displayName: 'Thunderstorm',
    code: 211,
    icon: { day: 'bolt', night: 'bolt' },
  },
  {
    displayName: 'Meteor',
    code: 'default',
    icon: { day: 'meteor', night: 'meteor' },
  }
];