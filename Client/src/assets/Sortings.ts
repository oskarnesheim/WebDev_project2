import SortBy from "./Enums";

/**
 * Array of sorting options eg. [["ID increasing (default)", SortBy.NONE], ...]
 */
const sortings = [
  ["ID increasing (default)", SortBy.NONE],
  ["ID decreasing", SortBy.ID_DECREASING],
  ["A-Z", SortBy.A_Z],
  ["Z-A", SortBy.Z_A],
  ["XP increasing", SortBy.BASE_EXPERIENCE_INCREASING],
  ["XP decreasing", SortBy.BASE_EXPERIENCE_DECREASING],
  ["kg increasing", SortBy.WEIGHT_INCREASING],
  ["kg decreasing", SortBy.WEIGHT_DECREASING],
];

export default sortings;
