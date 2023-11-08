import React, { useState } from "react";
import { Box, Button, CircularProgress, TextareaAutosize } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import theme from "../Theme";
import { gql, useQuery, useMutation } from "@apollo/client";

type PokemonReviewProps = {
  _id: number;
};

interface Review {
  rating: number;
  description: string;
  userID: string;
  pokemonID: number;
}

export default function PokemonRatingReview({ _id }: PokemonReviewProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { loading, error, data } = useQuery(getReviews(), {
    variables: { pokemonID: _id },
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
  };

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReview(event.target.value);
  };

  function getReviews() {
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

  const ADD_REVIEW = gql`
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
  const [addReview] = useMutation(ADD_REVIEW);

  function getUserID() {
    // Get userID from localstorage

    let userID = localStorage.getItem("userID");
    // If no userID exists, create a new one
    if (!userID || userID == "undefined") {
      userID = (Math.random() * 1000000000000000000).toString();
      localStorage.setItem("userID", userID);
    }
    return userID;
  }

  function alreadyReviewed(userID: string) {
    // Check if user has already reviewed this pokemon
    const reviews = data.reviewsForPokemon;
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].userID == userID) {
        return true;
      }
    }
    return false;
  }

  const handleAddReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userID = getUserID();
    if (alreadyReviewed(userID)) {
      setErrorMessage("Already reviewed this pokemon.");
      return;
    }
    if (rating === 0) {
      setErrorMessage("Please select a rating.");
      return;
    }
    if (review.trim() === "") {
      setErrorMessage("Please write a review.");
      return;
    }

    addReview({
      variables: {
        rating,
        description: review,
        userID,
        pokemonID: _id,
      },
    });
    // Reload the page
    window.location.reload();

    // Reset the rating and review input
    setRating(0);
    setReview("");
  };

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#141c24",
        color: "white",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          marginBottom: "10px",
          color: theme.palette.primary.main,
        }}
      >
        Rate and Review <span style={{ color: "transparent" }}>{_id}</span>
      </h2>
      <form onSubmit={(e) => handleAddReview(e)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <label style={{ marginRight: "10px", marginTop: "10px" }}>Rate</label>
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon
              key={index}
              onClick={() => handleRatingClick(index + 1)}
              style={{
                fontSize: "24px",
                cursor: "pointer",
                color: index < rating ? theme.palette.primary.main : "#ccc",
                marginTop: "10px",
              }}
            />
          ))}
        </div>
        <div>
          <TextareaAutosize
            value={review}
            onChange={handleReviewChange}
            minRows={4}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "10px",
              fontFamily: "pokemonfont",
            }}
            placeholder="Write your review..."
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          className="custom-button"
          disabled={alreadyReviewed(getUserID())}
          sx={{
            margin: "10px 0",
            padding: "10px 20px",
            fontFamily: "pokemonfont",
            backgroundColor: theme.palette.primary.main,
            color: "#141c24",
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
            "&:disabled": {
              backgroundColor: theme.palette.primary.dark, // Change the background color for disabled state
              color: "#000", // Change the text color for disabled state
            },
          }}
        >
          {alreadyReviewed(getUserID()) ? "Already reviewed" : "Add review"}
        </Button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        <h3 style={{ fontSize: "20px", marginTop: "20px" }}>Reviews</h3>
        {data.reviewsForPokemon.length == 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: "0" }}>
            {data.reviewsForPokemon.map((review: Review) => (
              <li
                key={review.userID}
                style={{
                  border: "3px solid " + theme.palette.primary.main,
                  padding: "10px",
                  margin: "20px 0",
                  backgroundColor: "#141c24",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  {Array.from({ length: review.rating }, (_, i) => (
                    <StarIcon
                      key={i}
                      style={{
                        fontSize: "18px",
                        color: theme.palette.primary.main,
                      }}
                    />
                  ))}
                </div>
                <div>{review.description}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
