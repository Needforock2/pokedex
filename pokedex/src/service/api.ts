import axios, { AxiosError } from "axios";
import { Pokemon, PokemonDetails } from "../types/pokemon";
import { PokemonElement} from "../types/pokemonByType";

export interface APIResponse {
  status: number;
  message: string;
  data: Pokemon[];
}

export interface APIResponseDetails {
  status: number;
  message: string;
  data: PokemonDetails;
}

export const getPokemons = async (
  currentPage?: number
): Promise<APIResponse> => {
  try {
   const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${
      currentPage && (currentPage - 1) * 20
    }`;

    const resp = await axios.get(url);
    console.log(resp)
    return {
      status: 200,
      message: "Success",
      data: resp.data.results,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      status: axiosError.response?.status || 500,
      message: axiosError.message || "An error occurred",
      data: [],
    };
  }
};

export const getPokemonDetails = async (
  name: string
): Promise<APIResponseDetails> => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await axios.get(url);
    return {
      status: response.status,
      message: "Success",
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      status: axiosError.response?.status || 500,
      message: axiosError.message || "An error occurred",
      data: {} as PokemonDetails,
    };
  }
};

export const getPaginatorData = async (): Promise<APIResponse> => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=10000`;
    const response = await axios.get(url);
    return {
      status: response.status,
      message: "Success",
      data: response.data.results,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      status: axiosError.response?.status || 500,
      message: axiosError.message || "An error occurred",
      data: [],
    };
  }
};

const pokemonTypeList = [
  "normal", "fighting", "flying", "poison", "ground",
  "rock", "bug", "ghost", "steel", "fire",
  "water", "grass", "electric", "psychic", "ice",
  "dragon", "dark", "fairy", "stellar"
];



export const getPokemonType = async (
  typeName: string
): Promise<APIResponse | AxiosError> => {
  const typeId = pokemonTypeList.indexOf(typeName) + 1;
  if (typeId <= 0) {
    return {
      status: 404,
      message: "Invalid type name",
      data: [],
    };
  }
  try {
    const url = `https://pokeapi.co/api/v2/type/${typeId}`;
    const response = await axios.get(url);
    
    const arrPokemons: PokemonElement[] = response.data.pokemon;

    const resp: Pokemon[] = arrPokemons.map((pokemon) => {
      return {
        name: pokemon.pokemon.name,
        url: pokemon.pokemon.url,
      };
    });
    return {
      status: 200,
      message: "Success",
      data: resp,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      status: axiosError.response?.status || 500,
      message: axiosError.message || "An error occurred",
    } as AxiosError;
  }
};
