
import { Card } from ".";
import usePokemonStore from "../store/pokemonStore";

import { Pokemon } from "../types/pokemon";
import { useNavigate } from "react-router-dom";


export const PokemonFavoriteList = () => {
  const navigate = useNavigate();
  const { favorites } = usePokemonStore();
  const handleNavigate = (pokemon: Pokemon) => {
    navigate(`/pokemon/${pokemon.name}`);
  };
  return (
    <div data-testid='pokemonFavListWrapper' className="bg-white m-2 mx-3 rounded-xl bg-clip-border p-1 drop-shadow-lg w-full min-h-screen">
      <h2 className="text-2xl font-bold mt-2">Favorites</h2>
      <div  className="flex flex-wrap gap-6 m-4 align-middle justify-center">
        {favorites.length>0 ? favorites.map((pokemon) => (
          <Card
            key={pokemon.species.name}
            pokemon={pokemon.species}
            onClick={() => handleNavigate(pokemon.species)}
          />
        ))
      :
      <div>You don't have favorite Pokemons yet</div>
      }
      </div>
    </div>
  );
};


