import { WEZZER_API } from '../constants';

export function getDefaultWeather(lon, lat) {
  return fetch(`${WEZZER_API}/weather/default?lon=${lon}&lat=${lat}`).then((r) => r.json())
}

export function getUserReports(lon, lat) {
  return fetch( `${WEZZER_API}/weather?lon=${lon}&lat=${lat}`).then((r) => r.json())
}

export function setUserReport(lon, lat, weatherCode) {
  return fetch(
    `${WEZZER_API}/weather`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lon,
        lat,
        data: {
          code: weatherCode
        }
      })
    }
  )
    .then((r) => r.json())
}

export function getCities(query) {
  return fetch(`${WEZZER_API}/cities?name=${query}`).then(r => r.json())
}