import { weatherConditions } from './constants';

// earth radius in metres
const R = 6371e3; 

// calculate distance between two coordinates
export function distance(lat1, lon1, lat2, lon2) {
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// deg to rad
function toRadians(deg) {
  return deg * (Math.PI / 180);
}

// get the weather code with most votes 
export function getDominantWeatherCodeFromReports(reports) {
  const weatherCodeCounterMap = reports.reduce((acc, report) => {
    const code = report.weather.code;
    const currentCodeCount = acc[code];

    return {
      ...acc,
      [code]: currentCodeCount ? currentCodeCount + 1 : 1,
    };
  }, {});

  const weatherCodeCounterSortedList = Object.entries(
    weatherCodeCounterMap,
  ).sort((a, b) => (a[0] > b[0] ? -1 : 1));

  return weatherCodeCounterSortedList;
}

// get a weather code -> description mapping
export const weatherCodeToDescription = weatherConditions.reduce((acc, w) => ({
  ...acc,
  [w.code]: w.displayName
}),{})
