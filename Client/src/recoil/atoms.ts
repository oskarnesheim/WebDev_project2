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

// Define your atom without the default value being read from storage directly
export const recoilMyTeam = atom<string[]>({
  key: "myTeam",
  default: [], // initialize with a sensible default or an empty array
});

export const recoilFilterBy = atom<string[]>({
  key: "filterBy",
  default: [],
});

export const recoilSortBy = atom<string>({
  key: "sortBy",
  default: "_id,1",
});

export const recoilSearch = atom<string>({
  key: "search",
  default: "",
});

export const recoilPage = atom<number>({
  key: "page",
  default: 1,
});

export const recoilMaxPage = atom<number>({
  key: "maxPage",
  default: 15,
});

// A utility function to safely parse JSON from storage
function safeParse<T>(value: string | null, defaultValue: T): T {
  if (value === null) return defaultValue;
  try {
    const parsed = JSON.parse(value) as T;
    return parsed;
  } catch {
    return defaultValue;
  }
}

// Functions to initialize state from storage
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

// Functions to handle storage updates
export function updateStorageOnChange<T>(
  key: string,
  value: T,
  storage: Storage,
) {
  storage.setItem(key, JSON.stringify(value));
}
