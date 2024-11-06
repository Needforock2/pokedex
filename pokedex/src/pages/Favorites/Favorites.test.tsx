import { describe, it, expect, beforeEach, vi } from "vitest";
import { usePokemonStore } from "./../../store/pokemonStore";
import type { PokemonDetails, Sprites } from "./../../types/pokemon";
import { fireEvent, render, screen } from "@testing-library/react";
import Favorites from ".";
import { MemoryRouter } from "react-router-dom";
import { PokemonFavoriteList } from "../../components";

const mockPokemon: PokemonDetails = {
  abilities: [],
  base_experience: 100,
  height: 10,
  id: 1,
  moves: [],
  name: "bulbasaur",
  order: 1,
  species: { name: "bulbasaur", url: "" },
  sprites: {} as Sprites,
  stats: [],
  types: [],
  weight: 69,
};

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: () => mockNavigate,
    };
  });
  
  const mockNavigate = vi.fn();

  

describe("Favorite component", () => {
  beforeEach(() => {
    usePokemonStore.setState({ favorites: [] });
    mockNavigate.mockClear();
  });

  it("Should add a pokemon to favorites", () => {
    const { setFavorites } = usePokemonStore.getState();
    setFavorites(mockPokemon);
    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    );
    const pokemon = screen.getByText(/bulbasaur/i);
    expect(pokemon).toBeDefined();
  });
  it("Should render message if no favorites", () => {

    render(
      <MemoryRouter>
        <PokemonFavoriteList />
      </MemoryRouter>
    );
    const pokemon = screen.getAllByText(/You don't have favorite Pokemons yet/i);
    expect(pokemon).toBeDefined();
  });

  it('should navigate to the correct URL when a Pokemon card is clicked', () => {
    const { setFavorites } = usePokemonStore.getState();
    setFavorites(mockPokemon);
    // Renderiza el componente
    render(
      <MemoryRouter>
        <PokemonFavoriteList />
      </MemoryRouter>
    );

    const pokemonCard = screen.getAllByText(/bulbasaur/i);
    fireEvent.click(pokemonCard[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/bulbasaur');
  });
});
