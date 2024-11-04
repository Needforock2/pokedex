import { useCallback, useEffect, useState } from "react";
import {
  APIResponse,
  getPaginatorData,
  getPokemons,
  getPokemonType,
} from "../../service/api";
import usePokemonStore from "../../store/pokemonStore";
import PokemonList from "../../components/PokemonList";
import Search from "../../components/Search";
import Paginator from "../../components/Paginator";
import usePaginatorStore from "../../store/paginatorStore";
import { Pokemon } from "../../types/pokemon";
import NotFound from "../../components/NotFound";

const Home = () => {
  const {
    setPokemons,
    isLoading,
    setLoading,
    setAllPokemons,
    allPokemons,
    setSearchTerm,
  } = usePokemonStore();

  const { totalItems, setTotalItems } = usePaginatorStore();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchPokemons = useCallback(async () => {
    setLoading(true);
    const pokemons = await getPokemons();
    const paginatorData = await getPaginatorData();
    setAllPokemons(paginatorData.data);
    setTotalItems(paginatorData.data.length);
    setPokemons(pokemons.data);
    setLoading(false);
    
  }, [setAllPokemons, setLoading, setPokemons, setTotalItems]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  const handleSearch = useCallback(
    async (word: string, keySearch: string, allPokemonsData: Pokemon[]) => {
      setLoading(true);
 
      if (!word) {
   
        fetchPokemons();
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
        setLoading(false);
      }
      if (keySearch === "Type") {
        const pokemons = await getPokemonType(word);
        setTotalItems((pokemons as APIResponse).data.length);
        setPokemons((pokemons as APIResponse).data);
        setLoading(false);
      }
    },
    [fetchPokemons, setLoading, setPokemons, setSearchTerm, setTotalItems]
  );

  const handlePaginator = useCallback(async (offset: number) => {
    setLoading(true);
    setCurrentPage(offset);
    const resp = await getPokemons(offset);
    setPokemons(resp.data);
    setLoading(false);

  }, [ setLoading, setPokemons]);

  return (
    <div data-testid='home-wrapper' className="flex  flex-col items-center">
      <div className="flex  flex-col items-center w-full p-3">
        <Search
          handleSearch={(word, key) => handleSearch(word, key, allPokemons)}
        />
        {!isLoading ? (
          totalItems ? (
            <PokemonList />
          ) : (
            <NotFound />
          )
        ) : (
          <div className="w-full h-[100vh] bg-white rounded-xl bg-clip-border drop-shadow-lg flex justify-center items-center m-5 ">
            Loading...
          </div>
        )}
        
        <div className="w-full">
          <Paginator
            totalItems={totalItems}
            currentPage={currentPage}
            handlePaginator={(number) => handlePaginator(number)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
