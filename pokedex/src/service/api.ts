import axios, { AxiosError } from "axios";
import { Pokemon, PokemonDetails } from "../types/pokemon";
import { PokemonElement, PokemonType } from "../types/pokemonByType";

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
    let url;
    url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${
      currentPage && (currentPage - 1) * 20
    }`;

    const resp = await axios.get(url);
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
    let url;
    url = `https://pokeapi.co/api/v2/pokemon/${name}`;
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
    let url = `https://pokeapi.co/api/v2/pokemon?limit=10000`;
    const response = await axios(url);
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

const pokemonTypes = {
  "normal": 1,
  "fighting": 2,
  "flying": 3,
  "poison": 4,
  "ground": 5,
  "rock": 6,
  "bug": 7,
  "ghost": 8,
  "steel": 9,
  "fire": 10,
  "water": 11,
  "grass": 12,
  "electric": 13,
  "psychic": 14,
  "ice": 15,
  "dragon": 16,
  "dark": 17,
  "fairy": 18,
  "stellar": 19
};


export const getPokemonType = async (
  typeName: string
): Promise<APIResponse> => {
  try {
    let url = `https://pokeapi.co/api/v2/type/${Number(pokemonTypes[typeName])}`;
    const response = await axios(url);
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
      data: [],
    };
  }
};
