import { useCallback } from "react";
import usePaginatorStore from "../store/paginatorStore";
import usePokemonStore from "../store/pokemonStore";
import { APIResponse } from "../service/api";

interface UsePaginatorProps {
  getPokemons: (offset: number) => Promise<APIResponse>;
}

const usePaginator = ({ getPokemons }: UsePaginatorProps) => {
  const { setCurrentPage } = usePaginatorStore();

  const { setPokemons, setLoading } = usePokemonStore();

  const handlePaginator = useCallback(
    async (offset: number) => {
      setLoading(true);
      setCurrentPage(offset);
      const resp = await getPokemons(offset);
      setPokemons(resp.data);
      setLoading(false);
    },
    [setLoading, setPokemons, setCurrentPage, getPokemons]
  );

 return {handlePaginator}
};

export default usePaginator;
