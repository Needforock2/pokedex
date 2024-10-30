import { describe, it, expect, beforeEach } from 'vitest';
import { usePokemonStore } from './pokemonStore';
import type {PokemonDetails, Sprites} from './../types/pokemon';

const mockPokemon: PokemonDetails = {
  abilities: [],
  base_experience: 100,
  height: 10,
  id: 1,
  moves: [],
  name: 'bulbasaur',
  order: 1,
  species: { name: 'bulbasaur', url: '' },
  sprites: {} as Sprites,
  stats: [],
  types: [],
  weight: 69,
};

describe("Pokemon Store", ()=>{
    beforeEach(()=>{
        usePokemonStore.setState({favorites: []})
    })

    it("Should add a pokemon to favorites", ()=>{
        const { setFavorites} = usePokemonStore.getState()
        setFavorites(mockPokemon)
        const updatedFavorites = usePokemonStore.getState().favorites;
        expect(updatedFavorites).toHaveLength(1)
        expect(updatedFavorites[0].name).toBe('bulbasaur')
    })

    it("should remove a pokemon from favorites it is already in the list", ()=>{
        const { setFavorites} = usePokemonStore.getState()
        setFavorites(mockPokemon)
        setFavorites(mockPokemon)
        const updatedFavorites = usePokemonStore.getState().favorites;
        expect(updatedFavorites).toHaveLength(0)
    })
})