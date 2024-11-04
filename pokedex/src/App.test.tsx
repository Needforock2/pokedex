import {  render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("Should render home", async () => {
    render(<App />);

    const homeWrapper = await screen.findByTestId("home-wrapper");
    expect(homeWrapper).toBeDefined();
  });
});
