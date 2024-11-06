import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../pages/Home";
import RootLayout from "../layouts/RootLayout";
import Favorites from "../pages/Favorites";
import PokemonDetails from "../pages/Details";
import { NotFound } from "../components";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home/>}/>
        <Route path="pokemon/:name" element={<PokemonDetails />} />
        <Route path="favorites" element={<Favorites/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Route>

    </>
  )
);
