import { test, describe, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import PokemonRatingReview from "../PokemonReviews"; // Import your review form component

describe("PokemonRatingReview", () => {
    test("Renders the review form", () => {
        // Render the review form component
        const { getByText } = render(
            <PokemonRatingReview pokemonId="1" /> // Replace with the actual Pokemon ID
        );

        // Test that the form elements are present
        const ratingLabel = getByText("Rating");
        const reviewLabel = getByText("Reviews");
        const submitButton = getByText("Submit Review");
        const reviewsHeading = getByText("Rate and Review");

        // Add more test assertions as needed
        expect(ratingLabel).not.toBe(null);
        expect(reviewLabel).not.toBe(null);
        expect(submitButton).not.toBe(null);
        expect(reviewsHeading).not.toBe(null);
    });

    test("Submitting an incomplete review", () => {
        const { getAllByPlaceholderText, getAllByText, getByTestId } = render(
            <PokemonRatingReview pokemonId="1" /> // Replace with the actual Pokemon ID
        );

        // Add a review text
        const reviewInput = getAllByPlaceholderText("Write your review...")[0]; // Get the first element of the array
        fireEvent.change(reviewInput, { target: { value: "This is a great Pokemon!" } });

        // Submit the review without selecting a rating
        const submitButton = getAllByText("Submit Review")[0]; // Get the first element of the array
        fireEvent.click(submitButton);

        // Check that error message are displayed
        const ratingError = getByTestId("rating-error");

        // Assert that the error message are displayed
        expect(ratingError).not.toBe(null);
    });

    test("Submitting a valid review", () => {
        const { getAllByPlaceholderText, getAllByText } = render(
            <PokemonRatingReview pokemonId="1" /> // Replace with the actual Pokemon ID
        );

        // Select a rating
        const star4 = document.getElementById("star-4");
        if (star4) {
            fireEvent.click(star4);
        }

        // Add a review text
        const reviewInput = getAllByPlaceholderText("Write your review...")[0]; // Get the first element of the array
        fireEvent.change(reviewInput, { target: { value: "This is a great Pokemon!" } });

        // Submit the review
        const submitButton = getAllByText("Submit Review")[0]; // Get the first element of the array
        fireEvent.click(submitButton);
    });
});


