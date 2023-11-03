import { atom } from "recoil";

export const recoilMyTeam = atom({
  key: "myTeam", // unique ID (with respect to other atoms/selectors)
  default: getTeam() as string[], // default value (aka initial value)
});

function getTeam() {
  const team: string[] = JSON.parse(localStorage.getItem("team")!);
  if (team === null) {
    localStorage.setItem("team", JSON.stringify([]));
    return [];
  }
  return team;
}
