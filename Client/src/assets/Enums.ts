/**
 * Enum for sorting options eg. SortBy.NONE = "_id,1"
 */
enum SortBy {
  NONE = "_id,1",
  ID_DECREASING = "_id,-1",
  A_Z = "name,1",
  Z_A = "name,-1",
  BASE_EXPERIENCE_INCREASING = "base_experience,1",
  BASE_EXPERIENCE_DECREASING = "base_experience,-1",
  WEIGHT_INCREASING = "weight,1",
  WEIGHT_DECREASING = "weight,-1",
}

export default SortBy;
