import { useCallback } from "react";
import usePokemonStore from "../store/pokemonStore";
import { getPaginatorData, getPokemons } from "../service/api";
import usePaginatorStore from "../store/paginatorStore";


const useFetchPokemons =()=>{

    const {setLoading, setAllPokemons, setPokemons} = usePokemonStore()
    const {currentPage, setTotalItems}=usePaginatorStore()

    const fetchPokemons = useCallback(async () => {
        setLoading(true);
        const pokemons = await getPokemons(currentPage);
        const paginatorData = await getPaginatorData();
        setAllPokemons(paginatorData.data);
        setTotalItems(paginatorData.data.length);
        setPokemons(pokemons.data);
        setLoading(false);
      }, [currentPage, setAllPokemons, setLoading, setPokemons, setTotalItems]);

      return {fetchPokemons}
}

export default useFetchPokemons