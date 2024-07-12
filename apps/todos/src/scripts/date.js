export function formatDate(value) {
  const date = new Date(value);

  return Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
  }).format(date);
}
