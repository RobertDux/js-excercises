import { NO_TODOS_TEXT } from "./constants";

const containerElem = document.querySelector(".js-toedoes");
const textElem = document.querySelector(".js-toedoes-text");

/**
 * Creates an HTML element with provided classes and/or text
 * @param {String} tag
 * @param {Array} classes
 * @param {String} text
 * @returns Element
 */
function buildElement(tag, classes = [], text = null) {
  const elem = document.createElement(tag);

  if (classes.length > 0) {
    elem.classList.add(...classes);
  }

  if (text) {
    elem.textContent = text;
  }

  return elem;
}

/**
 *
 * @param {*} todo
 */
function renderTodo(todo) {
  const container = buildElement("div", ["list-group-item", "list-group-item-action"], todo.text);
  containerElem.appendChild(container);
}

/**
 *
 * @param {*} todos
 * @returns
 */
export function updateDOM(todos) {
  containerElem.replaceChildren();

  if (!todos.length) {
    textElem.textContent = NO_TODOS_TEXT;
    return;
  }

  textElem.textContent = "You have " + todos.length + " toedoe(s). Better get working!";

  for (const todo of todos) {
    renderTodo(todo);
  }
}
