const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.API_KEY;

/**
 * Creates a human-readable error message to show users
 * @param {String} code
 * @returns string
 */
function getErrorMessage(code) {
  if (code === "404") {
    return "Could not find that city.";
  }

  return "Something went wrong when retrieving weather data.";
}

/**
 * Fetches the current weather for given city
 * @param {String} city
 * @returns weather date or error message
 */
export async function getWeatherForCity(city) {
  const params = new URLSearchParams({
    q: city,
    units: "metric",
    appid: API_KEY,
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
 * Fetches forecasts for all given locations
 * @param {Array} locations
 * @returns Array
 */
export async function getWeatherForLocations(locations) {
  const data = [];

  for (const location of locations) {
    const weather = await getWeatherForCity(location.city);
    data.push(weather.data ?? {});
  }

  return data;
}
