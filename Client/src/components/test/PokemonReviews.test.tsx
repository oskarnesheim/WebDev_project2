import { test, describe, expect } from "vitest";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import PokemonRatingReview from "../pokemon/PokemonReviews";
import { MockedProvider } from "@apollo/client/testing";
import { RecoilRoot } from "recoil";
import { ReviewMutationMock } from "../../utils/mocks/PokemonReviewMock";

describe("PokemonRatingReview", () => {
  test.skip("Renders the review form", async () => {
    const { getAllByText } = render(
      <MockedProvider mocks={ReviewMutationMock} addTypename={false}>
        <PokemonRatingReview _id={1} />
      </MockedProvider>,
    );
    await waitFor(() => {
      //? Here we test that the component is rendered
      expect(getAllByText("Rate and Review")).not.toBe(null);
      expect(getAllByText("Reviews")).not.toBe(null);
      expect(getAllByText("Rate")).not.toBe(null);

      //? Here we test that the data is rendered from the mock is rendered
      expect(getAllByText("dafa")).not.toBe(null);
      expect(getAllByText("Denne pokemonen er grov")).not.toBe(null);
    });
    cleanup();
  });
  test.skip("Submitting with no rating", async () => {
    const { getAllByText, getByPlaceholderText, getAllByTestId } = render(
      <MockedProvider mocks={ReviewMutationMock} addTypename={false}>
        <PokemonRatingReview _id={1} />
      </MockedProvider>,
    );
    await waitFor(() => {
      const reviewInput = getByPlaceholderText("Write your review...");
      fireEvent.change(reviewInput, {
        target: { value: "This is a great Pokemon!" },
      });

      const submitButton = getAllByTestId("add-review-button");
      fireEvent.click(submitButton[0]);

      const ratingError = getAllByText("Please select a rating.")[0];
      expect(ratingError).not.toBe(null);
      fireEvent.change(reviewInput, {
        target: { value: "" },
      });
    });
    cleanup();
  });
  test.skip("Submitting with no description", async () => {
    const { getAllByText, getAllByTestId } = render(
      <MockedProvider mocks={ReviewMutationMock} addTypename={false}>
        <PokemonRatingReview _id={1} />
      </MockedProvider>,
    );
    await waitFor(() => {
      const star4 = getAllByTestId("star-rating-4");
      if (star4) {
        fireEvent.click(star4[0]);
      }

      const submitButton = getAllByTestId("add-review-button");
      fireEvent.click(submitButton[0]);

      const ratingError = getAllByText("Please write a review.")[0];
      expect(ratingError).not.toBe(null);
    });

    cleanup();
  });

  test.skip("Submitting a valid review", async () => {
    const { getAllByTestId, getAllByPlaceholderText } = render(
      <RecoilRoot>
        <MockedProvider mocks={ReviewMutationMock} addTypename={false}>
          <PokemonRatingReview _id={1} />
        </MockedProvider>
      </RecoilRoot>,
    );
    await waitFor(() => {
      const reviewInput = getAllByPlaceholderText("Write your review...")[0];
      fireEvent.change(reviewInput, {
        target: { value: "This is a great Pokemon!" },
      });

      const star4 = getAllByTestId("star-rating-4");
      if (star4) {
        fireEvent.click(star4[0]);
      }

      const submitButton = getAllByTestId("add-review-button");
      fireEvent.click(submitButton[0]);
    });
  });
});
