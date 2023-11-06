// Function to check if a Pokemon is in the team
export const checkTeam = (team: string[], id: string): number => {
  if (team.includes(id)) return 1;
  if (team.length == 6) return 2;
  return 0;
};

// Function to add a Pokemon to the team
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

// Function to remove a Pokemon from the team
export const removeFromTeam = (
  team: string[],
  id: string,
  setTeam: (newTeam: string[]) => void,
): void => {
  const newTeam = team.filter((teamId) => teamId !== id);
  setTeam(newTeam);
  saveTeamToLocalStorage(newTeam);
};

// Function to save the team to localStorage
export const saveTeamToLocalStorage = (team: string[]): void => {
  localStorage.setItem("team", JSON.stringify(team));
};



