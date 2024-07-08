(function () {
  const formElem = document.querySelector(".js-toedoe-form");
  const descToggleElem = document.querySelector(".js-toggle-desc");
  const descContainerElem = document.querySelector(".js-desc-container");

  /**
   * Handle submit event
   * @param {FormEvent} e
   */
  function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(formElem);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  }

  /**
   * Toggles DOM element containing description input
   */
  function handleDescriptionToggle() {
    descContainerElem.classList.toggle("d-none");
  }

  /**
   * Sets focus to first element in form
   * @param {KeyboardEvent} e
   */
  function focusForm(e) {
    e.preventDefault();
    formElem.elements[0].focus();
  }

  /**
   * Triggers functions based on keys pressed when not in an input
   * @param {KeyboardEvent} e
   */
  function handleKeyDown(e) {
    const { tagName, isContentEditable } = e.target;
    if (tagName == "INPUT" || tagName == "SELECT" || tagName == "TEXTAREA" || isContentEditable) {
      return false;
    }

    switch (e.key) {
      case "n":
      case "N":
        return focusForm(e);
      default:
        return false;
    }
  }

  // Register event listeners
  formElem.addEventListener("submit", handleFormSubmit, false);
  descToggleElem.addEventListener("click", handleDescriptionToggle, false);
  document.addEventListener("keydown", handleKeyDown, false);
})();
