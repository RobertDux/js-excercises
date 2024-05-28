import { API_ERROR_DEFAULT, API_ERROR_NOT_FOUND } from "./constants";

const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.API_KEY;

/**
 * Fetches the current weather for given city
 * @param {String} city
 * @returns weather date or error message
 */
export async function getWeatherForCity(city) {
  return makeWeatherAPICall({
    q: city,
  });
}

/**
 * Fetches the current weather for given coordinates
 * @param {Object} coords
 * @returns weather date or error message
 */
export async function getWeatherForCoords(coords) {
  return makeWeatherAPICall({
    lat: coords.latitude,
    lon: coords.longitude,
  });
}

/**
 * Fetches forecasts for all given locations
 * @param {Array} locations
 * @returns {Array}
 */
export async function getWeatherForLocations(locations) {
  const data = [];

  for (const location of locations) {
    const weather = await getWeatherForCity(location.city);
    data.push(weather.data ?? {});
  }

  return data;
}

/**
 * Utility function to call weather api
 * @param {URLSearchParams} params
 * @returns {Object} weather data
 */
async function makeWeatherAPICall(options) {
  const params = new URLSearchParams({
    units: "metric",
    appid: API_KEY,
    ...options,
  });

  const response = await fetch(API_BASE_URL + "?" + params.toString());
  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: getErrorMessage(result.cod),
    };
  }

  return {
    success: true,
    data: {
      name: result.name,
      general: result.weather[0].main,
      icon: result.weather[0].icon,
      temperature: result.main.temp,
      humidity: result.main.humidity,
    },
  };
}

/**
 * Creates a human-readable error message to show users
 * @param {String} code
 * @returns {String} error message
 */
function getErrorMessage(code) {
  if (code === "404") {
    return API_ERROR_NOT_FOUND;
  }

  return API_ERROR_DEFAULT;
}
