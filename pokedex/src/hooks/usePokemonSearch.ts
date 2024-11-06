import { useCallback } from "react";
import { Pokemon } from "../types/pokemon";
import { APIResponse, getPokemonType } from "../service/api";
import usePokemonStore from "../store/pokemonStore";
import usePaginatorStore from "../store/paginatorStore";

interface UsePokemonSearchProps {
  fetchPokemons: () => Promise<void>;
}

const usePokemonSearch = ({ fetchPokemons }: UsePokemonSearchProps) => {
  const { setTotalItems } = usePaginatorStore();

  const { setPokemons, setLoading, setSearchTerm } = usePokemonStore();

  const handleSearch = useCallback(
    async (word: string, keySearch: string, allPokemonsData: Pokemon[]) => {
      setLoading(true);
      if (!word) {
        await fetchPokemons();
        setLoading(false);
        return;
      }

      if (keySearch === "Name") {
        setSearchTerm(word.toLowerCase());
        const filteredPokemon = allPokemonsData.filter((pokemon) =>
          pokemon.name.includes(word.toLowerCase())
        );
        setTotalItems(filteredPokemon.length);
        setPokemons(filteredPokemon);
      }

      if (keySearch === "Type") {
        const pokemons = await getPokemonType(word);
        setTotalItems((pokemons as APIResponse).data.length);
        setPokemons((pokemons as APIResponse).data);
      }

      setLoading(false);
    },
    [fetchPokemons, setLoading, setPokemons, setSearchTerm, setTotalItems]
  );

  return { handleSearch };
};

export default usePokemonSearch;
