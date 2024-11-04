import axios, { AxiosError } from "axios";
import { describe, expect, vi, it, afterEach } from "vitest";
import {
  APIResponse,
  APIResponseDetails,
  getPaginatorData,
  getPokemonDetails,
  getPokemons,
  getPokemonType,
} from "./api";
import bulbasaur from "../pages/Details/mock-pokemon.json";
import pokemonType3 from "../pages/Details/mock-ice-pokemons.json";

vi.mock("axios");

const mockPokemonDetails = bulbasaur;
const mockIcePokemons = pokemonType3;

const mockResponse = {
  data: {
    results: [
      {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
      },
      {
        name: "ivysaur",
        url: "https://pokeapi.co/api/v2/pokemon/2/",
      },
      {
        name: "venusaur",
        url: "https://pokeapi.co/api/v2/pokemon/3/",
      },
    ],
  },
};
describe("getPokemons", () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("debería devolver datos de Pokémon cuando la solicitud es exitosa", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);
    const response: APIResponse = await getPokemons();
    expect(axios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=undefined"
    );

    expect(response).toEqual({
      status: 200,
      message: "Success",
      data: mockResponse.data.results,
    });
  });

  it("debería devolver un error cuando la solicitud falla", async () => {
    const mockError = {
      response: { status: 404 },
      message: "Not Found",
    };
    (axios.get as jest.Mock).mockRejectedValueOnce(mockError);
    const response: APIResponse = await getPokemons();
    expect(response).toEqual({
      status: 404,
      message: "Not Found",
      data: [],
    });
  });
});

describe("getPokemonDetails", () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("debería devolver datos de Pokémon cuando la solicitud es exitosa", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      status: 200,
      message: "Success",
      data: mockPokemonDetails,
    });
    const response: APIResponseDetails = await getPokemonDetails("bulbasaur");
    expect(axios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/bulbasaur"
    );

    expect(response).toEqual({
      status: 200,
      message: "Success",
      data: mockPokemonDetails,
    });
  });

  it("debería devolver un error cuando la solicitud falla", async () => {
    const mockError = {
      response: { status: 404 },
      message: "Not Found",
    };
    (axios.get as jest.Mock).mockRejectedValueOnce(mockError);
    const response: APIResponseDetails = await getPokemonDetails("bulbasaur");
    expect(response).toEqual({
      status: 404,
      message: "Not Found",
      data: {},
    });
  });
});

describe("getPaginatorData", () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("debería devolver datos de Pokémon cuando la solicitud es exitosa", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: mockResponse.data,
    });
    const response: APIResponse = await getPaginatorData();
    expect(axios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=10000"
    );

    expect(response).toEqual({
      status: 200,
      message: "Success",
      data: mockResponse.data.results,
    });
  });

  it("debería devolver un error cuando la solicitud falla", async () => {
    const mockError = {
      response: { status: 404 },
      message: "Not Found",
    };
    (axios.get as jest.Mock).mockRejectedValueOnce(mockError);
    const response: APIResponse = await getPaginatorData();
    expect(response).toEqual({
      status: 404,
      message: "Not Found",
      data: [],
    });
  });
}); 

describe("getPokemonType", () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("debería devolver datos de Pokémon cuando la solicitud es exitosa", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: mockIcePokemons,
    });
    const response= await getPokemonType("ice");
    expect(axios.get).toHaveBeenCalledWith("https://pokeapi.co/api/v2/type/15");
    const expectedRespData = mockIcePokemons.pokemon.map((pokemon) => {
      return {
        name: pokemon.pokemon.name,
        url: pokemon.pokemon.url,
      };
    });
    expect(response).toEqual({
      status: 200,
      message: "Success",
      data: expectedRespData,
    });
  });

  it("debería devolver un error cuando la solicitud falla", async () => {
    const mockError = {
      response: { status: 404 },
      message: "Not Found",
    } as AxiosError;
    (axios.get as jest.Mock).mockRejectedValueOnce(mockError);
    const response = await getPokemonType("ice");
    expect(response).toEqual({
      status: 404,
      message: "Not Found",
    });
  });
  it("debería devolver un error cuando se envia un tipo que no existe", async () => {
    const mockError = {
      response: { status: 404 },
      message: "Not Found",
    } as AxiosError;
    (axios.get as jest.Mock).mockRejectedValueOnce(mockError);
    const response = await getPokemonType("asdf");
    expect(response).toEqual({
      status: 404,
      message: "Invalid type name",
      data: []
    });
  });
});
