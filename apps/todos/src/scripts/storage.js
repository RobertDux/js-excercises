import { LOCAL_STORAGE_KEY } from "./contants";

/**
 * Tries parsing a given JSON string
 * @param {String} string
 * @returns Object or null
 */
function tryParse(string) {
  try {
    return JSON.parse(string);
  } catch {
    return null;
  }
}

/**
 * Gets stored data from LocalStorage
 * @returns Object
 */
export function getFromStorage() {
  const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
  return tryParse(dataString);
}

/**
 * Updates data in LocalStorage
 * @param {Object} data
 */
export function updateStorage(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}
