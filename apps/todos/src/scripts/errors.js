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
