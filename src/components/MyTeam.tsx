import { useState } from "react";
import "./MyTeam.css";
// AiOutlineArrowLeft
// AiOutlineArrowRight

export default function MyTeam() {
  function getTeam() {
    return JSON.parse(localStorage.getItem("team") || "");
  }

  function setTeam(team: string) {
    localStorage.setItem("team", JSON.stringify(team));
  }

  const [team, setTeamState] = useState<string[]>(getTeam().split(","));

  const [selectedPokemon, setSelectedPokemon] = useState<[string, number]>([
    "",
    0,
  ]); // [name,index]

  function editTeamMEmber(index: number) {
    setSelectedPokemon([team[index], index]);
  }

  function moveBy(direction: string) {
    let num = selectedPokemon[1];
    if (direction === "right") num += 1;
    if (direction === "left") num -= 1;
    if (num < 0) num = team.length - 1;
    if (num === team.length) num = 0;
    editTeamMEmber(num);
  }

  function deleteTeamMember(index: number) {
    const updatedTeam = [...team]; // Create a copy of the array
    const outcast = updatedTeam.splice(index, 1); // Remove the item from the copy
    console.log(outcast);
    alert(`${outcast[0]} was removed from your team`);
    setTeamState(updatedTeam); // Update the state with the new array
    setTeam(updatedTeam.join(",")); // Update the localStorage with the new array
    setSelectedPokemon(["", 0]);
  }

  function selectedInfo() {
    const pokeName = selectedPokemon[0];
    if (pokeName === "") return;
    return (
      <div className="selected-Info">
        <h3>Here is {selectedPokemon[0]}</h3>
        <p>*IMAGE*</p>
        <span>
          <h4>Stats</h4>
          <p>HP: Unknown</p>
          <p>Speed: Unknown</p>
        </span>
        <div className="container">
          <button onClick={() => moveBy("left")} className="box">
            LEFT
          </button>
          <button
            className="box"
            onClick={() => deleteTeamMember(selectedPokemon[1])}
          >
            DELETE
          </button>
          <button onClick={() => moveBy("right")} className="box">
            RIGHT
          </button>
        </div>
      </div>
    );
  }

  function teamlist() {
    if (getTeam() === "") return <p>Team is empty 🙁</p>;
    return team.map((pokemon: string, count: number) => (
      <div
        onClick={() => editTeamMEmber(count)}
        className="team-grid-child"
        key={count}
      >
        {pokemon} (count: {count} )
      </div>
    ));
  }

  function contentProvider() {
    return (
      <div className="my-team">
        <h1>My Pokémon Team</h1>
        <div className="team-grid">{teamlist()}</div>
        {selectedInfo()}
      </div>
    );
  }
  return <>{contentProvider()}</>;
}
