import { atom } from "recoil";

/**
 * Global state: MyTeam loaded from local storage
 */
export const recoilMyTeam = atom({
  key: "myTeam",
  default: getTeam() as string[], 
});

function getTeam() {
  const team: string[] = JSON.parse(localStorage.getItem("team")!);
  if (!team) {
    localStorage.setItem("team", JSON.stringify([]));
    return [];
  }
  return team;
}

/**
 * Global state: Filters loaded from session storage
 */
export const recoilFilterBy = atom({
  key: "filterBy",
  default: getFilterBy() as string[],
});

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

function getFilterBy() {
  const filterBy: string[] = JSON.parse(sessionStorage.getItem("filterBy")!);
  if (filterBy === null) {
    sessionStorage.setItem("filterBy", JSON.stringify([]));
    return [];
  }
  return filterBy;
}

/**
 * Global state: SortBy loaded from session storage
 */
export const recoilSortBy = atom({
  key: "sortBy", 
  default: getSortBy() as string, 
});

function getSortBy() {
  const sortBy: string = JSON.parse(sessionStorage.getItem("sortBy")!);
  if (!sortBy) {
    sessionStorage.setItem("sortBy", JSON.stringify("_id,1"));
    return "_id,1";
  }
  return sortBy;
}

/**
 * Global state: Search loaded from session storage
 */
export const recoilSearch = atom({
  key: "search",
  default: getSearch() as string, 
});

function getSearch() {
  const search: string = JSON.parse(sessionStorage.getItem("search")!);
  if (!search) {
    sessionStorage.setItem("search", JSON.stringify(""));
    return "";
  }
  return search;
}

/**
 * Global state: Page loaded from session storage
 */
export const recoilPage = atom({
  key: "page",
  default: getPage() as number, 
});

function getPage() {
  const page: number = JSON.parse(sessionStorage.getItem("page")!);
  if (!page) {
    sessionStorage.setItem("page", JSON.stringify(1));
    return;
  }
  return page;
}
