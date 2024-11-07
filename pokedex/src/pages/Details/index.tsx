import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPokemonDetails } from "../../service/api";
import usePokemonStore from "../../store/pokemonStore";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";

const PokemonDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const {
    setPokemon,
    pokemon,
    isLoading,
    setLoading,
    favorites,
    setFavorites,
  } = usePokemonStore();

  const [color, setColor] = useState("red");

  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    const data = await getPokemonDetails(name!);
    setPokemon(data.data);
    setColor(data.data.types[0].type.name)
    setLoading(false);
  }, [setLoading, setPokemon, name]);

  const isFavorite = useCallback(
    () => favorites.find((fav) => fav.id === pokemon.id),
    [favorites, pokemon.id]
  );

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  useEffect(() => {
    isFavorite();
  }, [isFavorite]);

 

  return (
    <div
      data-testid="detail-wrapper"
      className={`flex justify-center items-center w-[100vw]  bg-${color}`}
    >
      <div className="flex flex-col items-center text-slate-800 w-full max-w-[95vw] mb-2 md:mb-10">
        {!pokemon.name || isLoading ? (
          <div className="w-full max-w-full min-h-[100vh] bg-white rounded-xl bg-clip-border drop-shadow-lg flex justify-center items-center">
            Loading...
          </div>
        ) : (
          <div className="relative w-full max-w-full mx-auto">
            <div className="absolute left-1/2 bottom-0 z-1 w-full max-w-[98vw]  h-[80%] bg-gray rounded-2xl transform -translate-x-1/2 p-6">
            {isFavorite() ? (
                    <IoHeart
                      data-testid="favorito"
                      className="text-red text-4xl hover:cursor-pointer"
                      
                      onClick={() => setFavorites(pokemon)}
                    />
                  ) : (
                    <IoHeartOutline
                      data-testid="no-favorito"
                      className="text-red text-4xl hover:cursor-pointer"
                      onClick={() => setFavorites(pokemon)}
                    />
                  )}</div>

            <div className="flex flex-col items-center w-full h-full bg-clip-border gap-2">
              <div className="mt-2 mb-2 w-full">
                <div className="flex w-full items-center justify-between p-4">
                  <IoMdArrowBack className="text-white text-4xl hover:cursor-pointer" onClick={()=>navigate(-1)}/>
                  <div className="p-2 text-3xl text-white text-slate-700 capitalize z-20 font-extrabold">
                    {pokemon.name}
                  </div>
                  <div className="px-2 text-xl text-white font-bold text-slate-700 capitalize">
                    # {pokemon.id}
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <img
                    src={pokemon.sprites.other?.dream_world.front_default ?? ""}
                    alt={`Imagen del pokemon ${pokemon.name}`}
                    className="w-60 h-60 md:w-96 md:h-96 p-4 z-20 max-w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-center gap-2 z-20">
                    {pokemon.types.map((type) => (
                      <div
                        data-testid="type-id"
                        key={type.slot}
                        className={`text-base  text-navy-700 flex text-white font-bold rounded-xl bg-${type.type.name} bg-clip-border   drop-shadow-md p-1 justify-center items-center text-center`}
                      >
                        <p className="px-2 capitalize">{type.type.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
                    <p className={`z-20 text-${color} text-2xl font-bold p-3`}>About</p>
              <div className="flex flex-wrap gap-6 rounded-2xl px-3 py-1 z-20 w-full max-w-[95vw] justify-around items-start">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm text-gray-600">Weight</p>
                  <span className="text-base font-medium text-navy-700 flex justify-center items-center">
                    {pokemon.weight} Kg
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm text-gray-600">Height</p>
                  <span className="text-base font-medium text-navy-700 flex">
                    {pokemon.height} m
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm text-gray-600">Abilities</p>
                  <div className="flex flex-col justify-center items-center text-center text-base font-medium text-navy-700">
                    {pokemon.abilities.map((ability) => (
                      <p key={ability.ability.name} className="capitalize">
                        {ability.ability.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 justify-between z-20">
                <div className="flex flex-col justify-center px-3 py-2 w-full md:w-[48%] ">
                  <p className={`text-xl font-medium text-navy-700 text-${color}`}>Regular Sprites</p>
                  <div className="flex justify-center max-w-full">
                    <img
                      src={pokemon.sprites.front_default}
                      alt={`sprite ${pokemon.name}`}
                      className="w-40 h-40 md:w-50 md:h-50 max-w-full"
                    />
                    <img
                      src={pokemon.sprites.back_default}
                      alt={`sprite ${pokemon.name}`}
                      className="w-40 h-40 md:w-50 md:h-50 max-w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center px-3 py-2 w-full md:w-[48%] ">
                  <p className={`text-xl font-medium text-navy-700 text-${color}`}>Shiny Sprites</p>
                  <div className="flex justify-center max-w-full">
                    <img
                      src={pokemon.sprites.front_shiny}
                      alt={`sprite ${pokemon.name}`}
                      className="w-40 h-40 md:w-50 md:h-50  max-w-full"
                    />
                    <img
                      src={pokemon.sprites.back_shiny}
                      alt={`sprite ${pokemon.name}`}
                      className="w-40 h-40 md:w-50 md:h-50  max-w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center w-full py-2 z-20 max-w-[95vw]">
                <p className={`text-xl font-medium text-navy-700 text-${color}`}>
                  Base Stats
                </p>
                {pokemon.stats.map((stat) => (
                  <div
                    key={stat.stat.name}
                    className="flex gap-2 justify-center"
                  >
                    <div className="capitalize">{stat.stat.name}:</div>
                    <div>{stat.base_stat}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetails;
