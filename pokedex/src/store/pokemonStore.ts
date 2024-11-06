import { create } from "zustand";
import { Pokemon, PokemonDetails } from "../types/pokemon";


interface PokemonState {
  pokemons: Pokemon[];
  allPokemons: Pokemon[]
  pokemon: PokemonDetails;
  isLoading: boolean;
  error: string | null;
  searchKey: string;
  searchTerm: string;
  favorites: PokemonDetails[];
  setFavorites: (pokemon: PokemonDetails) => void;
  setPokemon: (pokemon: PokemonDetails) => void;
  setPokemons: (pokemons: Pokemon[]) => void;
  setAllPokemons: (allPokemons: Pokemon[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  setSearchKey: (searchKey: string) => void;
  setSearchTerm: (searchTerm: string) => void;
}

export const usePokemonStore = create<PokemonState>((set, get) => ({
  pokemons: [],
  allPokemons:[] ,
  pokemon: {} as PokemonDetails,
  isLoading: true,
  error: null,
  searchKey: "",
  searchTerm: "",
  favorites: [],

  setFavorites: (pokemon) => {
    const currentFavorites = get().favorites;
    const isFavorite = currentFavorites.some(
      (fav) => fav.id === pokemon.id
    );
    const updatedFavorites = isFavorite
      ? currentFavorites.filter((fav) => fav.id !== pokemon.id)
      : [...currentFavorites, pokemon];

    set({ favorites: updatedFavorites });
  },
  setPokemon: (pokemon) => set({ pokemon }),
  setPokemons: (pokemons) => set({ pokemons }),
  setAllPokemons: (allPokemons) => set({ allPokemons }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSearchKey: (searchKey) => set({ searchKey }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));

export default usePokemonStore;
