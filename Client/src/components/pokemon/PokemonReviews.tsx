import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import theme from "../../Theme";
import { useQuery, useMutation } from "@apollo/client";
import { getReviews, AddReview } from "../../functions/GraphQLQueries";
import { Review } from "../../interfaces/pokemon";

type PokemonReviewProps = {
  _id: number;
};

/**
 * Function that returns the PokemonRatingReview component, which contains the rating and reviews for the pokemon.
 * Contains:
 * - Form to add a review (rating and review input)
 * - Reviews
 * @param _id Pokemon ID
 * @returns PokemonRatingReview component
 */
export default function PokemonRatingReview({
  _id,
}: PokemonReviewProps): JSX.Element {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [charsLeft, setCharsLeft] = useState("300");
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
    if (event.target.value.length > 300) {
      setCharsLeft("0/300");

      return;
    }
    setCharsLeft((300 - event.target.value.length).toString() + "/300");
  };

  const [addReview] = useMutation(AddReview, {
    refetchQueries: [{ query: getReviews, variables: { pokemonID: _id } }],
  });

  /**
   *  Function that returns the user ID, stored in localstorage. If the user ID does not exist, create a new user ID and store it in localStorage.
   * @returns User ID
   */
  function getUserID(): string {
    let userID = localStorage.getItem("userID");
    if (!userID || userID == "undefined") {
      userID = (Math.random() * 1000000000000000000).toString();
      localStorage.setItem("userID", userID);
    }
    return userID;
  }

  /**
   * Function that checks if the user has already reviewed this pokemon.
   * @param userID User ID
   * @returns true if user has already reviewed this pokemon, false otherwise
   */
  function alreadyReviewed(userID: string): boolean {
    const reviews = data.reviewsForPokemon;
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].userID == userID) {
        return true;
      }
    }
    return false;
  }

  // Checks if the user has already reviewed this pokemon, or if the user has not selected a rating or written a review. If so, set the error message. Otherwise, add the review to the database. Resets the rating and review input after adding the review.
  const handleAddReview = (event: React.FormEvent<HTMLFormElement>): void => {
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

    if (review.length > 300) {
      setErrorMessage("Review must be less than 300 characters.");
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
    setErrorMessage(`Thank you for your review!`);
  };

  /**
   * Function that returns the error message.
   * @returns error message
   */
  function getErrorMessage(): JSX.Element {
    const color =
      errorMessage === "Thank you for your review!" ? "green" : "red";
    const currMessage = errorMessage;
    return <Typography sx={{ color: { color } }}>{currMessage}</Typography>;
  }

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  return (
    <Box
      sx={{
        color: "white",
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "error.dark",
      }}
    >
      <Typography
        variant="h5"
        tabIndex={0}
        sx={{
          color: "primary.main",
          marginBottom: "10px",
        }}
        data-testid="pokemon-reviews-header"
      >
        Rate and Review
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "space-between",
          margin: "10px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <FormLabel
            sx={{
              marginRight: "10px",
              marginTop: "10px",
              color: "white",
            }}
            tabIndex={0}
          >
            {" "}
            Rate
          </FormLabel>
          {Array.from({ length: 5 }, (_, index) => (
            <Tooltip
              title={
                alreadyReviewed(getUserID())
                  ? ""
                  : `Rate (${index + 1}) out of 5`
              }
              key={index}
            >
              <button
                onClick={() => handleRatingClick(index + 1)}
                aria-label={
                  alreadyReviewed(getUserID())
                    ? ""
                    : `Rate (${index + 1}) out of 5`
                }
                disabled={alreadyReviewed(getUserID())}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <StarIcon
                  data-testid={`star-rating-${index}`}
                  style={{
                    fontSize: "24px",
                    color: index < rating ? theme.palette.primary.main : "#ccc",
                    marginTop: "10px",
                  }}
                />
              </button>
            </Tooltip>
          ))}
        </Box>
        <Box sx={{ width: "100%", verticalAlign: "bottom" }}>
          <Typography
            sx={{
              textAlign: "right",
              marginTop: "2em",
            }}
          >
            {charsLeft}
          </Typography>
        </Box>
      </Box>
      <form onSubmit={(e) => handleAddReview(e)}>
        <TextareaAutosize
          disabled={alreadyReviewed(getUserID())}
          maxLength={300}
          aria-label={
            alreadyReviewed(getUserID())
              ? "Already reviewed"
              : `Write your review here`
          }
          value={review}
          onChange={handleReviewChange}
          minRows={4}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "10px",
            fontFamily: "pokemonfont",
          }}
          placeholder={
            alreadyReviewed(getUserID())
              ? "Already reviewed"
              : `Write your review here`
          }
        />
        <Button
          type="submit"
          variant="contained"
          disabled={alreadyReviewed(getUserID())}
          data-testid="add-review-button"
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
      {errorMessage && getErrorMessage()}
      <Typography
        variant="h5"
        sx={{
          marginTop: "20px",
        }}
        tabIndex={0}
      >
        Reviews
      </Typography>
      {data.reviewsForPokemon.length == 0 ? (
        <Typography variant="body1">No reviews yet.</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {data.reviewsForPokemon.map((review: Review) => (
            <Box
              key={review.userID}
              tabIndex={0}
              sx={{
                padding: "10px",
                margin: "20px 0",
                border: "3px solid " + theme.palette.primary.main,
                width: "100%",
                wordWrap: "break-word",
              }}
            >
              <Box
                sx={{
                  marginBottom: "10px",
                }}
              >
                {Array.from({ length: review.rating }, (_, i) => (
                  <StarIcon
                    key={i}
                    sx={{
                      fontSize: "18px",
                      color: "primary.main",
                    }}
                  />
                ))}
              </Box>
              <Box
                sx={{
                  padding: "10px",
                  overflow: "hidden",
                }}
              >
                {review.description}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
