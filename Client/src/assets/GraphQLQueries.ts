import { gql } from "@apollo/client";

export function findSinglePokemon() {
  const q = gql`
    query query($_id: Int!) {
      pokemon(_id: $_id) {
        _id
        name
        height
        weight
        stats {
          stat {
            name
          }
          base_stat
        }
        sprites {
          front_default
        }
        types {
          type {
            name
          }
        }
      }
    }
  `;
  return q;
}

export function getPokemons() {
  const q = gql`
    query MyQuery(
      $sorting: [[String]]
      $filters: [String]
      $range: [Int]
      $search: String
    ) {
      pokemonsSortedAndFiltered(
        sorting: $sorting
        filters: $filters
        search: $search
        range: $range
      ) {
        _id
        name
        base_experience
        weight
        types {
          type {
            name
          }
        }
        sprites {
          front_default
        }
      }
      numberOfPokemonsThatMatchesSearch(
        sorting: $sorting
        filters: $filters
        search: $search
      )
    }
  `;
  return q;
}


export function getReviews() {
    const q = gql`
      query query($pokemonID: Int!) {
        reviewsForPokemon(pokemonID: $pokemonID) {
          userID
          pokemonID
          rating
          description
        }
      }
    `;
    return q;
  }

  export const ADD_REVIEW = gql`
    mutation AddReview(
      $rating: Int!
      $description: String!
      $userID: String!
      $pokemonID: Int!
    ) {
      createReview(
        rating: $rating
        description: $description
        userID: $userID
        pokemonID: $pokemonID
      ) {
        userID
        pokemonID
        rating
        description
      }
    }
  `;
