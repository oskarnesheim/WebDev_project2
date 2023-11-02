import { fireEvent, render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SortingBox from "../SortingBox";

test("Checks that all the sorting options are rendered", async () => {
  let selectedValue = "";
  const updateSort: React.Dispatch<React.SetStateAction<string>> = (value) => {
    selectedValue = value instanceof Function ? value(selectedValue) : value;
  };

  render(
    <BrowserRouter>
      <RecoilRoot>
        <SortingBox sortBy="" updateSort={updateSort} />
      </RecoilRoot>
    </BrowserRouter>,
  );

  const select = screen.getByRole("button");
  fireEvent.mouseDown(select);
  const option = await screen.findByText("A-Z");
  const option2 = await screen.findByText("Z-A");
  const option3 = await screen.findByText("Base experience increasing");
  const option4 = await screen.findByText("Base experience decreasing");
  const option5 = await screen.findByText("Weight increasing");
  const option6 = await screen.findByText("Weight decreasing");
  const option7 = await screen.findAllByText("Random");
  expect(option).toBeTruthy();
  expect(option2).toBeTruthy();
  expect(option3).toBeTruthy();
  expect(option4).toBeTruthy();
  expect(option5).toBeTruthy();
  expect(option6).toBeTruthy();
  expect(option7).toBeTruthy();
});

test("Checks if the sorting functionality works as intended", async () => {
  let selectedValue = "";
  const updateSort: React.Dispatch<React.SetStateAction<string>> = (value) => {
    selectedValue = value instanceof Function ? value(selectedValue) : value;
  };

  render(
    <BrowserRouter>
      <RecoilRoot>
        <SortingBox sortBy="" updateSort={updateSort} />
      </RecoilRoot>
    </BrowserRouter>,
  );

  const select = screen.getByRole("button");

  fireEvent.mouseDown(select);
  const option = await screen.findAllByText("A-Z");
  fireEvent.click(option[1]);
  expect(selectedValue).toBe("A-Z");

  fireEvent.mouseDown(select);
  const option2 = await screen.findAllByText("Z-A");
  fireEvent.click(option2[1]);
  expect(selectedValue).toBe("Z-A");

  fireEvent.mouseDown(select);
  const option3 = await screen.findAllByText("Base experience increasing");
  fireEvent.click(option3[1]);
  expect(selectedValue).toBe("Base experience increasing");

  fireEvent.mouseDown(select);
  const option4 = await screen.findAllByText("Base experience decreasing");
  fireEvent.click(option4[1]);
  expect(selectedValue).toBe("Base experience decreasing");

  fireEvent.mouseDown(select);
  const option5 = await screen.findAllByText("Weight increasing");
  fireEvent.click(option5[1]);
  expect(selectedValue).toBe("Weight increasing");

  fireEvent.mouseDown(select);
  const option6 = await screen.findAllByText("Weight decreasing");
  fireEvent.click(option6[1]);
  expect(selectedValue).toBe("Weight decreasing");

  fireEvent.mouseDown(select);
  const option7 = await screen.findAllByText("Random");
  fireEvent.click(option7[1]);
  expect(selectedValue).toBe("None");
});
