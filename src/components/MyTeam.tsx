import { useState } from "react";
import "./MyTeam.css";
import PokemonCard from "./PokemonCard";
import { useNavigate } from "react-router-dom";
import TeamMember from "./TeamMember";

export default function MyTeam() {
  const [teamIsLoaded, setTeamIsLoaded] = useState<boolean>(false);
  const [team, setTeamState] = useState<string[]>([]);

  const [selectedPokemon, setSelectedPokemon] = useState<[string, number]>([
    "",
    0,
  ]); // [name,index]

  const history = useNavigate();

  const redirectToPokemon = () => {
    history("/" + selectedPokemon[0]);
  };

  function getTeam() {
    if (teamIsLoaded) {
      return team;
    }
    const teamJSON = localStorage.getItem("team");
    if (teamJSON) {
      try {
        const team = JSON.parse(teamJSON);
        console.log("Loader team fra localstore: " + team);
        if (team === "") {
          setTeamIsLoaded(true);
          return "";
        }
        setTeamIsLoaded(true);
        setTeamState(team.split(","));
        return team;
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return "error"; // Handle the error appropriately
      }
    } else {
      return ""; // Handle the case when "team" is not found in localStorage
    }
  }

  function setTeam(team: string) {
    localStorage.setItem("team", JSON.stringify(team));
    setTeamState(team.split(","));
  }

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
        <div onClick={redirectToPokemon}>
          {" "}
          <PokemonCard key={selectedPokemon[0]} name={selectedPokemon[0]} />
        </div>
        <div className="container">
          <button onClick={() => moveBy("left")} className="box">
            {/* <AiOutlineArrowLeft /> */}
          </button>
          <button
            className="box"
            onClick={() => deleteTeamMember(selectedPokemon[1])}
          >
            DELETE
          </button>
          <button onClick={() => moveBy("right")} className="box">
            {/* <AiOutlineArrowRight /> */}
          </button>
        </div>
      </div>
    );
  }

  function teamlist() {
    if (getTeam() == "") return <p>Team is empty 🙁</p>;
    return team.map((pokemon: string, count: number) => (
      <div
        onClick={() => editTeamMEmber(count)}
        className="team-grid-child"
        key={count}
      >
        <TeamMember name={pokemon} />
      </div>
    ));
  }

  return (
    <div className="my-team">
      <h1>My Pokémon Team</h1>
      <div className="team-grid">{teamlist()}</div>
      <div>
        {selectedInfo()}
      </div>
    </div>
  );
}
