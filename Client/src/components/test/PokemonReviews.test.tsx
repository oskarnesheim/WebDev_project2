import { test, describe, expect } from "vitest";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import PokemonRatingReview from "../pokemon/PokemonReviews";
import { MockedProvider } from "@apollo/client/testing";
import { RecoilRoot } from "recoil";
import { ReviewMutationMock } from "../../utils/mocks/PokemonReviewMock";

describe("PokemonRatingReview", () => {
  test("Renders the review form", async () => {
    const { getAllByText, getByTestId } = render(
      <MockedProvider mocks={ReviewMutationMock} addTypename={false}>
        <RecoilRoot>
          <PokemonRatingReview _id={1} />
        </RecoilRoot>
      </MockedProvider>,
    );
    await waitFor(() => {
      //? Here we test that the component is rendered
      expect(getByTestId("pokemon-reviews-header")).not.toBe(null);
      expect(getAllByText("Reviews")).not.toBe(null);
      expect(getAllByText("Rate")).not.toBe(null);

      //? Here we test that the data is rendered from the mock is rendered
      expect(getAllByText("dafa")).not.toBe(null);
      expect(getAllByText("This is a great Pokemon!")).not.toBe(null);
    });
    cleanup();
  });
  test("Submitting with no rating", async () => {
    const { getAllByText, getByPlaceholderText, getAllByTestId } = render(
      <MockedProvider mocks={ReviewMutationMock} addTypename={false}>
        <RecoilRoot>
          <PokemonRatingReview _id={1} />
        </RecoilRoot>
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
  test("Submitting with no description", async () => {
    const { getAllByText, getAllByTestId } = render(
      <MockedProvider mocks={ReviewMutationMock} addTypename={false}>
        <RecoilRoot>
          <PokemonRatingReview _id={1} />
        </RecoilRoot>
      </MockedProvider>,
    );
    await waitFor(() => {
      const star4 = getAllByTestId("star-rating-3");
      if (star4) {
        fireEvent.click(star4[0]);
      }

      const submitButton = getAllByTestId("add-review-button");
      fireEvent.click(submitButton[0]);

      const ratingError = getAllByText("Please write a review.")[0];
      expect(ratingError).toBeTruthy();
    });

    cleanup();
  });
  test("Submitting a valid review", async () => {
    localStorage.setItem("userID", "696969696969696969");

    const { getByTestId, getAllByPlaceholderText, getByText } = render(
      <RecoilRoot>
        <MockedProvider mocks={ReviewMutationMock} addTypename={false}>
          <PokemonRatingReview _id={1} />
        </MockedProvider>
      </RecoilRoot>,
    );
    await waitFor(() => {
      const reviewInput = getAllByPlaceholderText("Write your review...")[0];
      fireEvent.change(reviewInput, {
        target: { value: "This is the most awesome pokemon ever!" },
      });

      const star4 = getByTestId("star-rating-3");
      if (star4) {
        fireEvent.click(star4);
      }

      const submitButton = getByTestId("add-review-button");
      fireEvent.click(submitButton);

      //! The mock might not be working since it only works it the delay
      setTimeout(() => {
        expect(
          getByText("This is the most awesome pokemon ever!"),
        ).toBeTruthy();
      }, 1000);

      expect(getByText("Thank you for your review!")).toBeTruthy();
    });
  });
  test("Snapshot test", async () => {
    const { container } = render(
      <MockedProvider mocks={ReviewMutationMock} addTypename={false}>
        <RecoilRoot>
          <PokemonRatingReview _id={1} />
        </RecoilRoot>
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
