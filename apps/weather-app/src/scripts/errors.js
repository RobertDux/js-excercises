const errorElem = document.querySelector(".js-error");

export function showErrorMessage(message) {
  errorElem.textContent = message;
  errorElem.classList.remove("invisible");
}

export function clearErrorMessage() {
  errorElem.textContent = "";
  errorElem.classList.add("invisible");
}
