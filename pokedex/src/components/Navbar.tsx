
import pokelogo from "../assets/pokeball.png";
import { IoHeart,} from "react-icons/io5";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className=" flex items-center justify-between mx-3">
      <div onClick={()=>navigate('/')} className="flex gap-3 p-4 justify-center items-center hover:cursor-pointer">
        <img src={pokelogo} className="w-8 h-8" alt="poke-logo" />
        <div  className="text-white font-bold text-3xl ">Pokédex</div>
      </div>
      <div className="p-4">
        <IoHeart data-testid='heart' className="text-white text-3xl hover:cursor-pointer" onClick={()=>navigate('/favorites')}/>
      </div>
    </div>
  );
};


