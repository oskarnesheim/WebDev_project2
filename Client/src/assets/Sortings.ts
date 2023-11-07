import SortBy from "./Enums";

const sortings = [
  ["None", SortBy.NONE],
  ["A-Z", SortBy.A_Z],
  ["Z-A", SortBy.Z_A],
  ["XP increasing", SortBy.BASE_EXPERIENCE_INCREASING],
  ["XP decreasing", SortBy.BASE_EXPERIENCE_DECREASING],
  ["kg increasing", SortBy.WEIGHT_INCREASING],
  ["kg decreasing", SortBy.WEIGHT_DECREASING],
];

export default sortings;
