import {
  GEO_ERROR_DEFAULT,
  GEO_ERROR_NOT_FOUND,
  GEO_ERROR_PERMISSION,
  GEO_ERROR_TIMEOUT,
} from "./constants";

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
    return showErrorMessage(GEO_ERROR_PERMISSION);
  }

  if (error.code === 2) {
    return showErrorMessage(GEO_ERROR_NOT_FOUND);
  }

  if (error.code === 3) {
    return showErrorMessage(GEO_ERROR_TIMEOUT);
  }

  showErrorMessage(GEO_ERROR_DEFAULT);
}
