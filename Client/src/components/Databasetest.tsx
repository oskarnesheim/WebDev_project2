import { useQuery, gql } from "@apollo/client";
function SmallComponent(name: string, _id: number) {
  return (
    <div key={_id}>
      <p>{name}</p>
      <p>{_id}</p>
    </div>
  );
}
function findSinglePokemon(_id: number) {
  const q = gql`
    query query {
      pokemon(_id: ${_id}) {
        _id
        name
        stats {
          stat {
            name
          }
        }
      }
    }
  `;
  console.log(q, "query response");
  return q;
}

// const TEST = gql`
//   query testQuery {
//     pokemonsSortedAndFiltered(range: [0, 20], filters: [], sorting: []) {
//       _id
//       name
//       stats {
//         base_stat
//         stat {
//           name
//         }
//       }
//       types {
//         type {
//           name
//         }
//       }
//     }
//   }
// `;
export default function Databasetest() {
  const { loading, error, data } = useQuery(findSinglePokemon(25));

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;
  console.log(data);

  return (
    <div>
      <ul>
        <li>{data.pokemon.name}</li>
        <li>{data.pokemon._id}</li>
        <li>{data.pokemon.stats.map((s) => s.stat.name)}</li>
        {/* <li>{data.pokemon.abilities.map((a: { name: string }) => a.name)}</li> */}
      </ul>
    </div>
    // <div>
    //   {data.pokemonsSortedAndFiltered.map((p: { name: string; _id: number }) =>
    //     SmallComponent(p.name, p._id),
    //   )}
    // </div>
  );
}
