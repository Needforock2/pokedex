import { cleanup, render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { test, describe, expect, afterEach } from "vitest";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import PokemonDetails from "../pages/Details";
import NotFound from "../components/NotFound";
import RootLayout from "../layouts/RootLayout";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "pokemon/:name", element: <PokemonDetails /> },
      { path: "favorites", element: <Favorites /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

describe("App Router", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should render Home in path '/'", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);
    const homeWrapper = await screen.findByTestId("home-wrapper");
    expect(homeWrapper).toBeDefined();
  });

  test("Should render Favorites in path '/favorites'", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/favorites"] });
    render(<RouterProvider router={router} />);
    const favWrapper = await screen.findByTestId("pokemonFavListWrapper");
    expect(favWrapper).toBeDefined();
  });
  test("Should render details page in path '/pokemon/:name'", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/pokemon/bulbasaur"] });
    render(<RouterProvider router={router} />);
    const notFound = await screen.findByTestId("detail-wrapper")
    expect(notFound).toBeDefined();
  });

  test("Should render Not found page in path '/*'", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/*"] });
    render(<RouterProvider router={router} />);
    const notFound = await screen.findByText("Ooops! your search didn't return a result...");
    expect(notFound).toBeDefined();
  });
});

