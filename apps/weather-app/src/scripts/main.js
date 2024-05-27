import { clearErrorMessage, showErrorMessage } from "./errors";
import { updateDOM } from "./dom";
import { getFromStorage, updateStorage } from "./storage";

(function () {
  const MAX_LOCATIONS = 3;
  const locations = getFromStorage() ?? [];

  const formElem = document.querySelector(".js-form");
  const resetElem = document.querySelector(".js-reset");

  /**
   * Adds location to in-memory storage
   * @param {Location} data
   */
  function addLocation(data) {
    locations.unshift({
      key: crypto.randomUUID(),
      location: data.location,
      name: data.name.length > 0 ? data.name : data.location,
    });
    updateStorage(locations);
  }

  function removeLocation(key) {
    const index = locations.findIndex((item) => item.key === key);

    if (index >= 0) {
      locations.splice(index, 1);
      updateStorage(locations);
      updateDOM(locations, removeLocation);
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
    const location = data.location.trim();

    if (location.length <= 2) {
      errors.push("Please enter a valid location.");
    }

    return {
      success: errors.length === 0,
      errors: errors ?? null,
      data: !errors.length ? { name, location } : null,
    };
  }

  /**
   * Handle submit event
   * @param {FormEvent} e
   */
  function handleFormSubmit(e) {
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

    // Check if location has been entered before
    if (locations.some((item) => item.location === validated.data.location)) {
      return showErrorMessage("Location already displayed.");
    }

    addLocation(validated.data);
    updateDOM(locations, removeLocation);
    handleFormReset();
  }

  /**
   * Resets form and error
   */
  function handleFormReset() {
    formElem.reset();
    clearErrorMessage();
  }

  updateDOM(locations, removeLocation);

  formElem.addEventListener("submit", handleFormSubmit, false);
  resetElem.addEventListener("click", handleFormReset, false);
})();
