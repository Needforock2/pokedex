import  { useCallback, useEffect } from "react";
import { Pokemon } from "../types/pokemon";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import usePokemonStore from "../store/pokemonStore";

interface Props {
  pokemon: Pokemon;
  onClick: () => void;
}
function extractNumberFromUrl(url: string): number | null {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : null;
}
const Card = ({ pokemon, onClick }: Props) => {
  const { favorites } =
    usePokemonStore();
  const isFavorite = useCallback(()=> favorites.find(fav=>fav.id === extractNumberFromUrl(
    pokemon.url
  )), [favorites, pokemon.url])
   
  useEffect(() => {
    isFavorite()

  }, [isFavorite]);

  return (
    <div
      role="listitem"
      className="p-4 h-60 w-60 flex flex-col justify-between items-center rounded-2xl bg-white bg-clip-border border border-gray drop-shadow-xl px-3 py-4  relative hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute bg-gray left-0 bottom-0 z-10 w-full h-[45%] rounded-2xl"></div>
      <div className="flex w-full items-center justify-between ">
        { isFavorite() 
        ?
          <IoHeart data-testid={"filled-heart"}  className="text-red text-2xl "/>
        :
          <IoHeartOutline className="text-red text-2xl " />}
        <div>#{extractNumberFromUrl(pokemon.url)}</div>
      </div>
      <img
        className="h-28 w-28 z-20"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${extractNumberFromUrl(
          pokemon.url
        )}.svg`}
      />
      <h2 className="text-xl font-bold z-20 capitalize">{pokemon.name}</h2>
    </div>
  );
};

export default Card;
