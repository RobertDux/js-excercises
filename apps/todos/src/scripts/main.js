import {
  ERROR_EXCEED_LABELS,
  ERROR_INVALID_DEADLINE,
  ERROR_INVALID_DESCRIPTION,
  ERROR_INVALID_TODO,
} from "./constants";
import { clearErrorMessage, showErrorMessage } from "./errors";
import { parseTodoText } from "./parser";
import { getFromStorage, updateStorage } from "./storage";

(function () {
  const todos = getFromStorage() ?? [];

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

    if (!data.toedoe.trim()) {
      return;
    }

    const result = buildTodo(data);

    if (!result.success) {
      return showErrorMessage(result.errors[0]);
    }

    addTodo(result.data);
    // TODO: add to DOM

    // Reset form
    formElem.reset();
    clearErrorMessage();
  }

  /**
   * Adds todo to in-memory list and localStorage
   * @param {todo} todo
   */
  function addTodo(todo) {
    todos.push(todo);
    updateStorage(todos);
  }

  /**
   * Builds and validates todo from input string and description
   * @param {Object} data
   * @returns Object
   */
  function buildTodo(data) {
    const errors = [];
    const todo = parseTodoText(data.toedoe);
    todo.description = data.description ?? null;

    if (todo.text.length < 5) {
      errors.push(ERROR_INVALID_TODO);
    }

    if (todo.deadline && todo.deadline < todo.added) {
      errors.push(ERROR_INVALID_DEADLINE);
    }

    if (todo.labels.length > 3) {
      errors.push(ERROR_EXCEED_LABELS);
    }

    if (todo.description && todo.description.length < 5) {
      errors.push(ERROR_INVALID_DESCRIPTION);
    }

    return {
      success: !errors.length,
      errors: errors ?? null,
      data: !errors.length ? todo : null,
    };
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
