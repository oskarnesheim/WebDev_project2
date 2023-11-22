import { atom } from "recoil";

/**
 * Global state: MyTeam (Team IDs )
 */
export const recoilMyTeam = atom<string[]>({
  key: "myTeamAtom",
  default: [],
});

/**
 * Global state: Filter by
 */
export const recoilFilterBy = atom<string[]>({
  key: "filterByAtom",
  default: [],
});

/**
 * Global state: Sort by
 */
export const recoilSortBy = atom<string>({
  key: "sortByAtom",
  default: "_id,1",
});

/**
 * Global state: Search string
 */
export const recoilSearch = atom<string>({
  key: "searchAtom",
  default: "",
});

/**
 * Global state: Page number
 */
export const recoilPage = atom<number>({
  key: "pageAtom",
  default: 1,
});

/**
 * Global state: Max page number
 */
export const recoilMaxPage = atom<number>({
  key: "maxPageAtom ",
  default: 15,
});

/**
 * Function to safely parse JSON from storage
 * @param value  The value to be parsed
 * @param defaultValue  The default value to use if the value is not found
 * @returns  The parsed value or the default value
 */
function safeParse<T>(value: string | null, defaultValue: T): T {
  if (value === null) return defaultValue;
  try {
    const parsed = JSON.parse(value) as T;
    return parsed;
  } catch {
    return defaultValue;
  }
}

/**
 * Function to initialize state from storage
 * @param setStateFunction  The function to set the state
 * @param storage  localstorage/sessionstorage
 * @param key   The key to use to retrieve the value from storage ex "filterBy"
 * @param defaultValue  The default value to use if the value is not found
 */
export function initializeStateFromStorage<T>(
  setStateFunction: (val: T) => void,
  storage: Storage,
  key: string,
  defaultValue: T,
) {
  const storedValue = storage.getItem(key);
  const parsedValue = safeParse(storedValue, defaultValue);
  setStateFunction(parsedValue);
}

/**
 *  Function to update storage on change
 * @param key  The key to use to retrieve the value from storage ex "filterBy"
 * @param value  The value to be stored
 * @param storage  localstorage/sessionstorage
 */
export function updateStorageOnChange<T>(
  key: string,
  value: T,
  storage: Storage,
) {
  storage.setItem(key, JSON.stringify(value));
}
