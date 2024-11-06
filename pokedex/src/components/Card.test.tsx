import { describe, it, expect, beforeEach, vi } from "vitest";
import { usePokemonStore } from "./../store/pokemonStore";
import type { PokemonDetails, Sprites } from "./../types/pokemon";
import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { Card } from "./Card";


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

const mockSimplePokemon ={

    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/"

}

const mockOnclick = vi.fn()

describe("Card", ()=>{
    it("Should render filled heart if the pokemon is favorite", ()=>{
      beforeEach(() => {
        usePokemonStore.setState({ favorites: [] });
      });
      const { setFavorites } = usePokemonStore.getState();
        setFavorites(mockPokemon);
        render(
          <MemoryRouter>
            <Card pokemon={mockSimplePokemon} onClick={mockOnclick} />
          </MemoryRouter>
        );
        const pokemon = screen.getByTestId("filled-heart")
        expect(pokemon).toBeDefined();
    })
})