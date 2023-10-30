import { useQuery, gql } from "@apollo/client";
function SmallComponent(name: string, _id: number) {
  return (
    <div key={_id}>
      <p>{name}</p>
      <p>{_id}</p>
    </div>
  );
}

const TEST = gql`
  query testQuery {
    pokemonsSortedAndFiltered(range: [0, 20], filters: [], sorting: []) {
      _id
      name
      stats {
        base_stat
        stat {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;
export default function Databasetest() {
  const { loading, error, data } = useQuery(TEST);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;
  console.log(data);

  return (
    <div>
      {data.pokemonsSortedAndFiltered.map((p: { name: string; _id: number }) =>
        SmallComponent(p.name, p._id),
      )}
    </div>
  );
}
