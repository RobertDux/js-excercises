const errorElem = document.querySelector(".js-error");

/**
 * Shows an error message in the DOM
 * @param {String} message
 */
export function showErrorMessage(message) {
  errorElem.textContent = message;
  errorElem.classList.remove("d-none");
}

/**
 * Removes the error message from the DOM
 */
export function clearErrorMessage() {
  errorElem.textContent = "";
  errorElem.classList.add("d-none");
}

/**
 * Shows user-friendly error message for geoposition
 * @param {GeolocationPositionError} error
 * @returns
 */
export function showGeoErrorMessage(error) {
  if (error.code === 1) {
    return showErrorMessage("We need your permission to use your location.");
  }

  if (error.code === 2) {
    return showErrorMessage("We cannot determine your location.");
  }

  if (error.code === 3) {
    return showErrorMessage("Determining your location took too.");
  }

  showErrorMessage("Determining your location failed, please try again.");
}
