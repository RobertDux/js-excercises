import { clearErrorMessage, showErrorMessage } from "./errors";
import { updateDOM } from "./dom";
import { getFromStorage, updateStorage } from "./storage";
import { getWeatherForCity, getWeatherForLocations } from "./weather";

(async function () {
  const MAX_LOCATIONS = 3;
  const locations = getFromStorage() ?? [];
  const forecasts = [];

  const formElem = document.querySelector(".js-form");
  const resetElem = document.querySelector(".js-reset");

  /**
   * Zips given arrays into single array
   * @param {Array} a
   * @param {Array} b
   * @returns Array
   */
  function zip(a, b) {
    return a.map(function (elem, i) {
      return {
        location: elem,
        weather: b[i],
      };
    });
  }

  /**
   * Adds location to in-memory storage
   * @param {Location} data
   */
  function addLocation(data) {
    const { name, city, weather } = data;

    // Add location
    locations.push({
      key: crypto.randomUUID(),
      city: city,
      name: name.length > 0 ? name : city,
    });
    updateStorage(locations);

    // Add weather
    forecasts.push(weather);
  }

  /**
   * Removes location and forecast for given key
   * @param {String} key
   */
  function removeLocation(key) {
    const index = locations.findIndex((item) => item.key === key);

    if (index >= 0) {
      locations.splice(index, 1);
      forecasts.splice(index, 1);
      updateStorage(locations);
      updateDOM(zip(locations, forecasts), removeLocation);
    }
  }

  /**
   * Validates incoming FormData
   * @param {FormData} formData
   * @returns
   */
  function validateFormData(formData) {
    const errors = [];
    const data = Object.fromEntries(formData.entries());

    const name = data.name.trim();
    const city = data.city.trim();

    if (city.length <= 2) {
      errors.push("Please enter a valid city.");
    }

    return {
      success: errors.length === 0,
      errors: errors ?? null,
      data: !errors.length ? { name, city } : null,
    };
  }

  /**
   * Handle submit event
   * @param {FormEvent} e
   */
  async function handleFormSubmit(e) {
    e.preventDefault();

    // Check if number of locations exceeds max
    if (locations.length >= MAX_LOCATIONS) {
      return showErrorMessage("Maximum amount of locations reached.");
    }

    const formData = new FormData(formElem);
    const validated = validateFormData(formData);

    // Validate if entered text is reasonable
    if (!validated.success) {
      return showErrorMessage(validated.errors[0]);
    }

    const weather = await getWeatherForCity(validated.data.city);

    // Check if response is OK
    if (!weather.success) {
      return showErrorMessage(weather.error);
    }

    // Check if location has been entered before
    if (locations.some((item) => item.city === weather.data.name)) {
      return showErrorMessage("Location already displayed.");
    }

    addLocation({
      city: weather.data.name,
      name: validated.data.name,
      weather: weather.data,
    });
    updateDOM(zip(locations, forecasts), removeLocation);
    handleFormReset();
  }

  /**
   * Resets form and error
   */
  function handleFormReset() {
    formElem.reset();
    clearErrorMessage();
  }

  // Load weather data and render locations (if any)
  const weather = await getWeatherForLocations(locations);
  forecasts.push(...weather);
  updateDOM(zip(locations, forecasts), removeLocation);

  formElem.addEventListener("submit", handleFormSubmit, false);
  resetElem.addEventListener("click", handleFormReset, false);
})();
