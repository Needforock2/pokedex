import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import PokemonList from "./PokemonList";
import { Pokemon} from "../types/pokemon";
import usePokemonStore from "../store/pokemonStore";

const mockPokemons: Pokemon[] = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  },
  {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/",
  },
];

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockNavigate = vi.fn();

describe("Pokemon List", () => {
  beforeEach(() => {
    usePokemonStore.setState({ pokemons: [] });
    mockNavigate.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("Should render a list of pokemons", async () => {
    usePokemonStore.setState({pokemons: mockPokemons})
    render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>
    );

    const pokemonCard = await screen.findAllByRole('listitem')
    

    expect(pokemonCard).toHaveLength(2)
  });
  it("Should navigate when card is clicked", async () => {
    usePokemonStore.setState({pokemons: mockPokemons})
    render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>
    );

    const pokemonCard = await screen.findAllByRole('listitem')
    fireEvent.click(pokemonCard[0])

    expect(mockNavigate).toBeCalledWith('pokemon/bulbasaur')
  });
});
