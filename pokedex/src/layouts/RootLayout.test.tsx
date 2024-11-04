import {
  render,
  screen,
} from "@testing-library/react";

import { describe, it, expect} from "vitest";
import RootLayout from "./RootLayout";
import { MemoryRouter } from "react-router-dom";

describe("RootLayoyt", () => {
  it("Should Render", () => {
    render(
        <RootLayout />
    ,{
      "wrapper": MemoryRouter
    });

    const navbar = screen.findByText("Pokédex");
    expect(navbar).toBeDefined();
  });
});
