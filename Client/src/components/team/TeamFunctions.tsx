

/**
 * Function that checks if a Pokemon is in the team
 * @param team
 * @param id - Pokemon ID
 * @returns 0 if not in team, 1 if in team, 2 if team is full
 */
export const checkTeam = (team: string[], id: string): number => {
  if (team.includes(id)) return 1;
  if (team.length == 6) return 2;
  return 0;
};

/**
 * Function that saves a Pokemon to the team in localStorage
 * @param team
 * @param id - Pokemon ID
 * @param setTeam - function to set the team in localStorage
 * @returns void
 */
export const addToTeam = (
  team: string[],
  id: string,
  setTeam: (newTeam: string[]) => void,
): void => {
  const currTeam = team;
  if (currTeam.length >= 6) {
    alert("Your team is full");
    return;
  }
  const newTeam = [...currTeam, id];
  setTeam(newTeam);
  saveTeamToLocalStorage(newTeam);
};

/**
 * Function that removes a Pokemon from the team in localStorage
 * @param team
 * @param id - Pokemon ID
 * @param setTeam - function to set the team in localStorage
 * @returns void
 */
export const removeFromTeam = (
  team: string[],
  id: string,
  setTeam: (newTeam: string[]) => void,
): void => {
  const newTeam = team.filter((teamId) => teamId !== id);
  setTeam(newTeam);
  saveTeamToLocalStorage(newTeam);
};

/**
 * Support function that saves the team to localStorage
 * @param team
 */
export const saveTeamToLocalStorage = (team: string[]): void => {
  localStorage.setItem("team", JSON.stringify(team));
};
