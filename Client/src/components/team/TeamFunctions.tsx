/**
 * Function that checks if a Pokemon is in the team
 * @param team
 * @param id - Pokemon ID
 * @returns 0 if not in team, 1 if in team, 2 if team is full
 */
export const checkTeam = (team: string[], id: string): number => {
  if (team.includes(id)) return 1;
  if (team.length === 6) return 2; // Use === for strict equality check
  return 0;
};

/**
 * Function that adds a Pokemon to the team
 * @param team
 * @param id - Pokemon ID
 * @param setTeam - Recoil state setter function for the team
 * @returns void
 */
export const addToTeam = (
  team: string[],
  id: string,
  setTeam: (newTeam: string[]) => void,
): void => {
  if (team.length >= 6) {
    alert("Your team is full");
    return;
  }
  const newTeam = [...team, id];
  setTeam(newTeam); // Only update the Recoil state
};

/**
 * Function that removes a Pokemon from the team
 * @param team
 * @param id - Pokemon ID
 * @param setTeam - Recoil state setter function for the team
 * @returns void
 */
export const removeFromTeam = (
  team: string[],
  id: string,
  setTeam: (newTeam: string[]) => void,
): void => {
  const newTeam = team.filter((teamId) => teamId !== id);
  setTeam(newTeam); // Only update the Recoil state
};
