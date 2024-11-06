
import { Card } from ".";
import usePokemonStore from "../store/pokemonStore";
import { Pokemon } from "../types/pokemon";
import { useNavigate } from "react-router-dom";


export const PokemonList = () => {
 

  const navigate = useNavigate();
  const { pokemons } = usePokemonStore();
  const handleNavigate = (pokemon: Pokemon) => {
    navigate(`pokemon/${pokemon.name}`);
  };


  
  return (
    <div
      data-testid="pokemonListWrapper"
      className="bg-white m-2 mx-3 rounded-xl bg-clip-border p-1 drop-shadow-lg w-full"
    >
      <div  className="flex flex-wrap gap-6 my-4 align-middle justify-center">
        {pokemons.map((pokemon) => (
 
            <Card
              key={pokemon.name}
              pokemon={pokemon}
              onClick={() => handleNavigate(pokemon)}
            />
   
        ))}
      </div>
    </div>
  );
};
