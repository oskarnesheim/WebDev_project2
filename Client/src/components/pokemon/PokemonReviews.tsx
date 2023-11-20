import React, { useState } from "react";
import { Box, Button, CircularProgress, TextareaAutosize } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import theme from "../../Theme";
import { useQuery, useMutation } from "@apollo/client";
import { getReviews, ADD_REVIEW } from "../../functions/GraphQLQueries";
import { Review } from "../../interfaces/pokemon";

type PokemonReviewProps = {
  _id: number;
};

export default function PokemonRatingReview({ _id }: PokemonReviewProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { loading, error, data } = useQuery(getReviews, {
    variables: { pokemonID: _id },
    fetchPolicy: "network-only",
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

  const [addReview] = useMutation(ADD_REVIEW, {
    refetchQueries: [{ query: getReviews, variables: { pokemonID: _id } }],
  });

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

    // Reset the rating and review input
    setRating(0);
    setReview("");
    setErrorMessage("");
  };

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  const handleFocus = (text: string) => {
    const speechSynthesis = window.speechSynthesis;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 0.5;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="pokemon_reviews_container">
      <h2
        className="pokemon_reviews_header"
        style={{
          color: theme.palette.primary.main,
        }}
      >
        Rate and Review
      </h2>
      <form onSubmit={(e) => handleAddReview(e)}>
        <div className="star_rating_container">
          <label className="star_rating_label">Rate</label>
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon
              tabIndex={0}
              key={index}
              onFocus={() => handleFocus("Rate " + (index + 1) + " out of 5")}
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
            onFocus={() => handleFocus("Write your review here")}
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
          onFocus={() => handleFocus("Submit your review")}
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
      {errorMessage && <p className="review_error_message">{errorMessage}</p>}
      <div>
        <h3 className="pokemon_review_sub_header">Reviews</h3>
        {data.reviewsForPokemon.length == 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="review_list_container">
            {data.reviewsForPokemon.map((review: Review) => (
              <li
                key={review.userID}
                className="review_list_item"
                style={{
                  border: "3px solid " + theme.palette.primary.main,
                }}
              >
                <div className="review_list_item_star_container">
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
