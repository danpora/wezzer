export const WEZZER_API =
  'https://0brc1jr0z3.execute-api.eu-west-1.amazonaws.com/v1';

export const weatherConditions = [
  {
    displayName: 'Clear Sky',
    code: 800,
    icon: { day: '01d', night: '01n' },
    isReportable: true,
  },
  {
    displayName: 'Few Clouds',
    code: 801,
    icon: { day: '02d', night: '02n' },
    isReportable: true,
  },
  {
    displayName: 'Scattered Clouds',
    code: 802,
    icon: { day: '03d', night: '03d' },
    isReportable: true,
  },
  {
    displayName: 'Broken Clouds',
    code: 803,
    icon: { day: '03d', night: '03d' },
  },
  {
    displayName: 'Overcast Clouds',
    code: 804,
    icon: { day: '03d', night: '03d' },
  },
  {
    displayName: 'Light Rain',
    code: 500,
    icon: { day: '10d', night: '10d' },
  },
  {
    code: 501,
    displayName: 'moderate rain',
    icon: { day: '10d', night: '10n' },
  },
  {
    displayName: 'heavy intensity rain',
    code: 502,
    icon: { day: '10d', night: '10n' },
  },
  {
    code: 503,
    displayName: 'very heavy rain',
    icon: { day: '10d', night: '10n' },
  },
  {
    code: 504,
    displayName: ' extreme rain',
    icon: { day: '10d', night: '10n' },
  },
  {
    code: 511,
    displayName: ' freezing rain',
    icon: { day: '13d', night: '13d' },
  },
  {
    code: 520,
    displayName: ' light intensity shower rain',
    icon: { day: '09d', night: '09n' },
    isReportable: true,
  },
  {
    displayName: 'Heavy Intensity Rain',
    code: 521,
    icon: { day: '09d', night: '09n' },
  },
  {
    code: 522,
    displayName: ' heavy intensity shower rain',
    icon: { day: '09d', night: '09n' },
  },
  {
    code: 531,
    displayName: ' ragged shower rain',
    icon: { day: '09d', night: '09n' },
  },
  {
    displayName: 'Snow',
    code: 601,
    icon: { day: '13d', night: '13d' },
  },
  {
    code: 600,
    displayName: 'light snow',
    icon: { day: '13d', night: '13d' },
    isReportable: true,
  },
  {
    code: 601,
    displayName: 'Snow',
    icon: { day: '13d', night: '13d' },
  },
  {
    code: 602,
    displayName: 'Heavy snow',
    icon: { day: '13d', night: '13d' },
  },
  {
    code: 611,
    displayName: 'Sleet',
    icon: { day: '13d', night: '13d' },
  },
  {
    code: 612,
    displayName: 'Light shower sleet',
    icon: { day: '13d', night: '13d' },
  },
  {
    code: 613,
    displayName: 'Shower sleet',
    icon: { day: '13d', night: '13d' },
  },
  {
    code: 615,
    displayName: 'Light rain and snow',
    icon: { day: '13d', night: '13d' },
  },
  {
    code: 616,
    displayName: 'Rain and snow',
    icon: { day: '13d', night: '13d' },
  },
  {
    code: 620,
    displayName: 'Light shower snow',
    icon: { day: '13d', night: '13d' },
  },
  {
    code: 621,
    displayName: 'Shower snow',
    icon: { day: '13d', night: '13n' },
  },
  {
    code: 622,
    displayName: 'Heavy shower snow',
    icon: { day: '13d', night: '13n' },
  },
  {
    displayName: 'Fog',
    code: 741,
    icon: { day: '50d', night: '50d' },
    isReportable: true,
  },
  { 
    code: 701, 
    displayName: 'Mist', 
    icon: { day: '50d', night: '50d' } 
  },
  { 
    code: 711, 
    displayName: 'Smoke', 
    icon: { day: '50d', night: '50d' } 
  },
  { 
    code: 721, 
    displayName: 'Haze', 
    icon: { day: '50d', night: '50d' } 
  },
  { 
    code: 731, 
    displayName: 'Dust', 
    icon: { day: '50d', night: '50d' } 
  },
  { 
    code: 751, 
    displayName: 'Sand', 
    icon: { day: '50d', night: '50d' } 
  },
  { 
    code: 761, 
    displayName: 'Dust', 
    icon: { day: '50d', night: '50d' } 
  },
  { 
    code: 762, 
    displayName: 'Ash', 
    icon: { day: '50d', night: '50d' } 
  },
  { 
    code: 771, 
    displayName: 'Squall', 
    icon: { day: '50d', night: '50d' } 
  },
  { 
    code: 781, 
    displayName: 'Tornado', 
    icon: { day: '50d', night: '50d' } 
  },
  { 
    code: 200, 
    displayName: 'thunderstorm with light rain', 
    icon: { day: '11d', night: '11n'},
    isReportable: true,
  },
  { 
    code: 202, 
    displayName: 'thunderstorm with heavy rain', 
    icon: { day: '11d', night: '11n'}
  },
  { 
    code: 210, 
    displayName: 'light thunderstorm', 
    icon: { day: '11d', night: '11n'}
  },
  { 
    code: 211, 
    displayName: 'thunderstorm', 
    icon: { day: '11d', night: '11n'}
  },
  { 
    code: 212, 
    displayName: 'heavy thunderstorm', 
    icon: { day: '11d', night: '11n'}
  },
  { 
    code: 221, 
    displayName: 'ragged thunderstorm', 
    icon: { day: '11d', night: '11n'}
  },
  { 
    code: 230, 
    displayName: 'thunderstorm with light drizzle', 
    icon: { day: '11d', night: '11n'}
  },
  { 
    code: 231, 
    displayName: 'thunderstorm with drizzle', 
    icon: { day: '11d', night: '11n'}
  },
  { 
    code: 232, 
    displayName: 'thunderstorm with heavy drizzle', 
    icon: { day: '11d', night: '11n'}
  },
  {
    displayName: 'Meteor',
    code: 'default',
    icon: { day: 'default', night: 'default' },
  },
];
