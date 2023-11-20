import { gql } from "@apollo/client";

export const findSinglePokemon = gql`
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

export const getPokemons = gql`
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

export const getReviews = gql`
  query query($pokemonID: Int!) {
    reviewsForPokemon(pokemonID: $pokemonID) {
      userID
      pokemonID
      rating
      description
    }
  }
`;

export const AddReview = gql`
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

export const handleFocus = (text: string) => {
  const speechSynthesis = window.speechSynthesis;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.volume = 0.5;
  speechSynthesis.speak(utterance);
};
