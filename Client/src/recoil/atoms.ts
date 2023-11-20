import { atom } from "recoil";

/**
 * Global function that removes a filter from the filterBy array in session storage
 * @param filter
 * @returns filterBy array after removing the given filter
 */
export function removeFromFilter(filter: string) {
  const filterBy: string[] = JSON.parse(sessionStorage.getItem("filterBy")!);
  const index = filterBy.indexOf(filter);
  if (index > -1) {
    filterBy.splice(index, 1);
  }
  sessionStorage.setItem("filterBy", JSON.stringify(filterBy));
  return filterBy;
}

/**
 * Global state: MyTeam loaded from local storage
 */
export const recoilMyTeam = atom({
  key: "myTeamAtom",
  default: getTeam() as string[],
});

/**
 * Global state: MyTeam loaded from local storage
 */
function getTeam() {
  const team: string[] = JSON.parse(localStorage.getItem("team")!);
  if (!team) {
    localStorage.setItem("team", JSON.stringify([]));
    return [];
  }
  return team;
}

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
 * Global state: TTS enabled/disabled
 */
export const recoilTTS = atom({
  key: "ttsAtom",
  default: false, // TTS is disabled by default
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
 * @param storage  socalstorage/sessionstorage
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
 * @param storage  socalstorage/sessionstorage
 */
export function updateStorageOnChange<T>(
  key: string,
  value: T,
  storage: Storage,
) {
  storage.setItem(key, JSON.stringify(value));
}
