const LOCAL_STORAGE_KEY = "wethur_locations";

function tryParse(string) {
  try {
    return JSON.parse(string);
  } catch {
    return null;
  }
}

export function getFromStorage() {
  const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
  return tryParse(dataString);
}

export function updateStorage(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}
