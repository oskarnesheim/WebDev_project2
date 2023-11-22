import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import About from "../about/About";

describe("About", () => {
  test("Snapshot test of page", () => {
    const page = render(<About />);
    expect(page).toMatchSnapshot();
  });
});
