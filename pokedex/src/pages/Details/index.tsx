import  { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetails } from "../../service/api";
import usePokemonStore from "../../store/pokemonStore";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const PokemonDetails = () => {
  const { name } = useParams();

  const { setPokemon, pokemon, isLoading, setLoading, setError, favorites, setFavorites } =
    usePokemonStore();

  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    const data = await getPokemonDetails(name!);
    setPokemon(data.data);
    setLoading(false);
    if (data.status !== 200) {
      setError(data.message);
    }
  }, [setLoading, setPokemon, setError, name]);

  const isFavorite = useCallback(()=> favorites.find(fav=>fav.id === pokemon.id),[favorites, pokemon.id])
   
  useEffect(() => {
    isFavorite()
    fetchPokemon();
  }, [fetchPokemon, isFavorite]);

 
  return (
    <div className="flex justify-center w-full items-center p-1">
      {!pokemon.name || isLoading ? (
        <div className="w-full h-[100vh] bg-white rounded-xl bg-clip-border drop-shadow-lg flex justify-center items-center m-5 ">
          Loading...
        </div>
      ) : (
        <div className="flex mt-5 flex-col items-center text-slate-800 w-full">
          <div className="flex flex-col items-center rounded-[20px] md:w-[95vw] m-2 bg-white bg-clip-border p-2 shadow-lg gap-4">
            <div className="mt-2 mb-2 w-full">
              <div className="flex w-full items-center justify-between p-4">
                {isFavorite() ?
                <IoHeart className="text-red text-3xl hover:cursor-pointer" onClick={()=>setFavorites(pokemon)}/>
                :
                <IoHeartOutline className="text-red text-3xl hover:cursor-pointer" onClick={()=>setFavorites(pokemon)}/>
                
                }
                <div className="px-2 text-xl font-bold text-slate-700 capitalize">
                  # {pokemon.id}
                </div>
              </div>

              <div className="flex flex-col justify-center items-center">
                <img
                  src={pokemon.sprites.other?.dream_world.front_default ?? ""}
                  alt={`Imagen del pokemon ${pokemon.name}`}
                  className=" w-60 h-60 p-4"
                />
                <div className="p-2 text-xl font-bold text-slate-700 capitalize">
                  {pokemon.name}
                </div>
              </div>
              <div>
                <div className="flex justify-center gap-2">
                  {pokemon.types.map((type) => (
                    <div
                      key={type.slot}
                      className="text-base font-medium text-navy-700 flex rounded-xl  bg-white bg-clip-border border border-gray drop-shadow-xl p-1 justify-center items-center text-center"
                    >
                      <p className="px-2 capitalize">{type.type.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 rounded-2xl bg-white bg-clip-border border border-gray drop-shadow-xl px-3 py-4  m-3 w-full justify-around items-start">
              <div className="flex flex-col justify-center items-center  ">
                <p className="text-sm text-gray-600">Weigth</p>
                <span className="text-base font-medium text-navy-700 flex justify-center items-center">
                  {pokemon.weight} Kg
                </span>
              </div>
              <div className="flex flex-col  justify-center  items-center ">
                <p className="text-sm text-gray-600">Heigth</p>
                <span className="text-base font-medium text-navy-700 flex">
                  {pokemon.height} m
                </span>
              </div>
              <div className="flex flex-col justify-center items-center ">
                <p className="text-sm text-gray-600">Abilities</p>
                <span className="text-base font-medium text-navy-700">
                  <div className="flex flex-col justify-center items-center text-center">
                    {pokemon.abilities.map((ability) => (
                      <p key={ability.ability.name} className="capitalize">
                        {ability.ability.name}
                      </p>
                    ))}
                  </div>
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 ">
              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border border border-gray drop-shadow-xl px-3 py-4 w-full md:w-[48%]">
                <p className="text-base text-gray-600">Regular Sprites</p>
                <div className="flex justify-center">
                  <img
                    src={pokemon.sprites.front_default}
                    alt={`sprite ${pokemon.name}`}
                    className="md:w-40 md:h-40"
                  />

                  <img
                    src={pokemon.sprites.back_default}
                    alt={`sprite ${pokemon.name}`}
                    className="md:w-40 md:h-40"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border border border-gray drop-shadow-xl px-8 py-4 w-full  md:w-[48%] ">
                <p className="text-base text-gray-600">Shiny Sprites</p>
                <div className="flex justify-center">
                  <img
                    src={pokemon.sprites.front_shiny}
                    alt={`sprite ${pokemon.name}`}
                    className="md:w-40 md:h-40"
                  />

                  <img
                    src={pokemon.sprites.back_shiny}
                    alt={`sprite ${pokemon.name}`}
                    className="md:w-40 md:h-40"
                  />
                </div>
              </div>
            </div>
            <div className=" flex flex-col justify-center w-full rounded-2xl bg-white bg-clip-border border border-gray drop-shadow-xl px-3 py-4">
              <p className="text-base font-medium text-navy-700">Base Stats</p>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="flex gap-2 justify-center">
                  <div className="capitalize">{stat.stat.name}: </div>
                  <div>{stat.base_stat}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
