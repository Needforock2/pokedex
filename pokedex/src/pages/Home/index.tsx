import { useEffect } from "react";
import { getPokemons } from "../../service/api";
import usePokemonStore from "../../store/pokemonStore";
import usePaginatorStore from "../../store/paginatorStore";
import usePokemonSearch from "../../hooks/usePokemonSearch";
import usePaginator from "../../hooks/usePaginator";
import { NotFound, Paginator, PokemonList, Search } from "../../components";
import useFetchPokemons from "../../hooks/useFetchPokemons";

const Home = () => {
  const { isLoading, allPokemons } = usePokemonStore();
  const { totalItems } = usePaginatorStore();

  const { fetchPokemons } = useFetchPokemons();
  const { handleSearch } = usePokemonSearch({
    fetchPokemons,
  });
  const { handlePaginator } = usePaginator({ getPokemons });

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return (
    <div data-testid="home-wrapper" className="flex  flex-col items-center">
      <div className="flex  flex-col items-center w-full max-w-[99vw] p-3">
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
          <div className="w-full max-w-[99vw] h-[100vh] p-1 bg-white rounded-xl bg-clip-border drop-shadow-lg flex justify-center items-center m-2 mx-3 ">
            Loading...
          </div>
        )}
        <div className="w-full">
          <Paginator handlePaginator={(number) => handlePaginator(number)} />
        </div>
      </div>
    </div>
  );
};

export default Home;
