const R = 6371e3; // earth radius in metres

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

function toRadians(deg) {
  return deg * (Math.PI / 180);
}

export function getDominantWeatherCodeFromReports(reports) {
  const weatherCodeCounterMap = reports.reduce((acc, rep) => {
    const code = rep.weather.code;
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

export const weatherCodeToDescription = {
  800: 'clear sky',
  801: 'few clouds',
  802: 'scattered clouds',
  803: 'broken clouds',
  804: 'overcast clouds',
  500: 'light rain',
  501: 'moderate rain',
  502: 'heavy intensity rain',
  503: 'very heavy rain',
  504: 'extreme rain',
  511: 'freezing rain',
  520: 'light intensity shower rain',
  521: 'shower rain',
  522: 'heavy intensity shower rain',
  531: 'ragged shower rain',
  default: 'meteor',
};
