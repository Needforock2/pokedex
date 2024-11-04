import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import PokemonDetails from ".";
import bulbasaur from "./mock-pokemon.json";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { getPokemonDetails } from "../../service/api";
import usePokemonStore from "../../store/pokemonStore";

const mockPokemon = bulbasaur;

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ name: "bulbasaur" }),
  };
});

vi.mock("../../service/api");



describe("Details", () => {
  beforeEach(() => {
    (getPokemonDetails as jest.Mock).mockResolvedValueOnce({
      status: 200,
      message: "Succes",
      data: mockPokemon,
    });

    render(
      <MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    usePokemonStore.setState({ favorites: [] });
  });

  afterEach(() => {
    cleanup();
  });
  it("should call getPokemonDetails", async () => {
    expect(getPokemonDetails).toHaveBeenCalledWith("bulbasaur");
  });

  it("Should Render the types of the pokemon", async () => {
    const nameElement = screen.findByAltText(/imagen del pokemon bulbasaur/i);
    const typeElement = await screen.findAllByTestId("type-id");
    expect(typeElement).toHaveLength(2);
    expect(nameElement).toBeDefined();
  });
  it("Should render outlined heart if the pokemon is not favorite", () => {
    const noFavorite = screen.getByTestId("no-favorito");
    expect(noFavorite).toBeDefined();
  });

  it("Should render filled heart if the pokemon is favorite", () => {
    cleanup();
    const { setFavorites } = usePokemonStore.getState();
    setFavorites(mockPokemon);

    (getPokemonDetails as jest.Mock).mockResolvedValueOnce({
      status: 200,
      message: "Succes",
      data: mockPokemon,
    });

    render(
      <MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    waitFor(() => {
      const favorite = screen.getByTestId("favorito");
      expect(favorite).toBeDefined();
    });
  });

  it("Should should set favorite when clicking the outlined heart", ()=>{

    const noFavorite = screen.getByTestId("no-favorito");    
    fireEvent.click(noFavorite)

    const favorite = screen.getByTestId("favorito");
    expect(favorite).toBeDefined()

  })
  it("Should should set no-favorite when clicking the heart", ()=>{

    const noFavorite = screen.getByTestId("no-favorito");    
    fireEvent.click(noFavorite)

    const favorite = screen.getByTestId("favorito");
    fireEvent.click(favorite)
    expect(noFavorite).toBeDefined()

  })
});
