const PREFIXES = {
  label: "#",
  deadline: "@",
};

/**
 * Creates todo from single toedoe `text`.
 * @param {String} text
 * @returns Todo
 */
export function parseTodoText(text) {
  const todo = {
    id: crypto.randomUUID(),
    text,
    added: new Date().valueOf(),
    labels: [],
    deadline: null,
  };

  // Labels
  todo.labels = getLabelsFromText(text, PREFIXES.label);
  todo.text = cleanupText(todo.text, todo.labels, PREFIXES.label);

  // Deadline
  const dateString = getDeadlineFromText(text, PREFIXES.deadline);
  todo.deadline = validateDeadline(dateString);
  todo.text = cleanupText(todo.text, [dateString], PREFIXES.deadline);

  // Clean up
  todo.text = todo.text.trim();

  return todo;
}

/**
 * Checks `text` for labels starting with `prefix` and returns them as list.
 * @param {String} text
 * @param {String} prefix
 * @returns String[]
 */
function getLabelsFromText(text, prefix) {
  const labels = [];
  const parts = text.split(" " + prefix);

  if (text.startsWith(prefix)) {
    const firstPart = text.split(prefix)[1];
    parts.unshift(firstPart);
  }

  parts.forEach(function (p, index) {
    // First items contains the remaining text
    if (index < 1) {
      return;
    }

    // Remove prefix from label
    if (p.startsWith(prefix)) {
      p = p.substring(1);
    }

    // Labels can only be one word
    const label = p.split(" ")[0];

    if (label.length) {
      labels.push(label);
    }
  });

  // Return unique labels
  return Array.from(new Set(labels));
}

/**
 * Parses deadline from `text`. Returns null if not found.
 * @param {String} text
 * @param {String} prefix
 * @returns datestring | null
 */
function getDeadlineFromText(text, prefix) {
  const matches = text.match(new RegExp(`${prefix}[0-9]{4}-[0-9]{2}-[0-9]{2}`, "ig"));

  if (!matches) {
    return null;
  }

  return matches[0].substring(1);
}

function validateDeadline(dateString) {
  const date = new Date(dateString);

  if (date instanceof Date && !isNaN(date)) {
    return date.valueOf();
  }

  // Invalid date
  return null;
}

/**
 * Removes given items with prefix from `text`.
 * @param {String} text
 * @param {String[]} items
 * @param {String} prefix
 * @returns String
 */
function cleanupText(text, items, prefix) {
  items.forEach((l) => {
    if (l === "") {
      return;
    }

    text = text
      .replace(new RegExp(`\\${prefix}${l} `, "ig"), "")
      .replace(new RegExp(`\\${prefix}${l}`, "ig"), "");
  });

  return text;
}
