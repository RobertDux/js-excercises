import { NO_TODOS_TEXT } from "./constants";
import { formatDate } from "./date";

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
 * @param {HTMLElement} parent
 * @param {String[]} labels
 */
function renderLabels(parent, labels) {
  for (const label of labels) {
    const badge = buildElement("span", ["badge", "text-bg-primary"], label);
    parent.appendChild(badge);
  }
}

/**
 *
 * @param {Object} todo
 */
function renderTodo(todo) {
  const listItem = buildElement("div", ["list-group-item", "list-group-item-action"]);
  const listItemHeader = buildElement("div", ["d-flex", "w-100", "justify-content-between"]);
  const listItemTitle = buildElement("h3", ["h5", "mb-1"], todo.text);
  const listItemDate = buildElement("small", ["fw-light"], formatDate(todo.added));

  listItemHeader.appendChild(listItemTitle);
  listItemHeader.appendChild(listItemDate);
  listItem.appendChild(listItemHeader);

  if (todo.description) {
    const listItemDescription = buildElement("p", ["mb-0"], todo.description);
    listItem.appendChild(listItemDescription);
  }

  if (todo.labels.length) {
    const listItemLabels = buildElement("div", ["mt-2", "d-flex", "gap-2"]);
    renderLabels(listItemLabels, todo.labels);
    listItem.appendChild(listItemLabels);
  }

  if (todo.deadline) {
    const listItemDeadline = buildElement("small", ["fs-6"], " | " + formatDate(todo.deadline));
    listItemTitle.appendChild(listItemDeadline);
  }

  containerElem.appendChild(listItem);
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
