import React, { useState, useEffect } from "react";
import { Button, TextareaAutosize } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import theme from "../Theme";

type PokemonReviewProps = {
  pokemonId: string; // Change the type to match your actual data type for Pokémon IDs
};

type Review = {
  rating: number;
  review: string;
};

export default function PokemonRatingReview({ pokemonId }: PokemonReviewProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  useEffect(() => {
    // Load existing reviews from localStorage when the component mounts
    const storedReviews = localStorage.getItem(`pokemon_reviews_${pokemonId}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, [pokemonId]);

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
  };

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReview(event.target.value);
  };

  const handleAddReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (rating === 0) {
      setErrorMessage("rating-error");
      return;
    }
    if (review.trim() === "") {
      setErrorMessage("review-error");
      return;
    }

    const newReview = {
      rating,
      review,
    };

    // Add the new review to the existing reviews
    setReviews([...reviews, newReview]);

    // Save reviews to localStorage
    localStorage.setItem(
      `pokemon_reviews_${pokemonId}`,
      JSON.stringify([...reviews, newReview]),
    );

    // Reset the rating and review input
    setRating(0);
    setReview("");
  };

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
        Rate and Review{" "}
        <span style={{ color: "transparent" }}>{pokemonId}</span>
      </h2>
      <form onSubmit={(e) => handleAddReview(e)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <fieldset>
            <legend>Rating</legend>
            <div style={{ display: "flex" }}>
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`star-${index + 1}`}
                    name="rating"
                    checked={index + 1 === rating}
                    onChange={() => handleRatingClick(index + 1)}
                    style={{ display: "none" }} // Hide the radio buttons
                  />
                  <label htmlFor={`star-${index + 1}`}>
                    <StarIcon
                      style={{
                        fontSize: "24px",
                        cursor: "pointer",
                        color: index < rating ? theme.palette.primary.main : "#ccc",
                        marginTop: "10px",
                      }}
                    />
                  </label>
                </div>
              ))}
            </div>
          </fieldset>

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
          // onClick={handleAddReview}
          variant="contained"
          className="custom-button"
          style={{
            margin: "10px 0",
            padding: "10px 20px",
            fontFamily: "pokemonfont",
            backgroundColor: theme.palette.primary.main,
            color: "#141c24",
          }}
        >
          Submit Review
        </Button>
      </form>
      {errorMessage === "rating-error" && (
        <p data-testid="rating-error" style={{ color: "red" }}>
          Please select a rating.
        </p>
      )}
      {errorMessage === "review-error" && (
        <p data-testid="review-error" style={{ color: "red" }}>
          Please write a review.
        </p>
      )}
      <div>
        <h3 style={{ fontSize: "20px", marginTop: "20px" }}>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: "0" }}>
            {reviews.map((item, index) => (
              <li
                key={index}
                style={{
                  border: "3px solid " + theme.palette.primary.main,
                  padding: "10px",
                  margin: "20px 0",
                  backgroundColor: "#141c24",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  {Array.from({ length: item.rating }, (_, i) => (
                    <StarIcon
                      key={i}
                      style={{
                        fontSize: "18px",
                        color: theme.palette.primary.main,
                      }}
                    />
                  ))}
                </div>
                <div>{item.review}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
