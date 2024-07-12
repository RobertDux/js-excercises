export function formatDate(value) {
  const date = new Date(value);

  return Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
  }).format(date);
}

/**
 * Checks if first date is before the second
 * @param {Number} first
 * @param {Number} second
 */
export function isBeforeDate(first, second) {
  const firstDate = new Date(first).setUTCHours(0, 0, 0, 0);
  const secondDate = new Date(second).setUTCHours(0, 0, 0, 0);
  return firstDate < secondDate;
}
