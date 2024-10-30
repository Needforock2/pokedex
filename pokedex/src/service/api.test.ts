import axios from "axios";
import { describe, expect, vi, beforeEach, it} from "vitest";
import { APIResponse, getPokemons } from "./api";

vi.mock("axios");



describe('getPokemons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería devolver datos de Pokémon cuando la solicitud es exitosa', async () => {
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
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const response: APIResponse = await getPokemons();

    expect(axios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=undefined'
    );

    expect(response).toEqual({
      status: 200,
      message: 'Success',
      data: mockResponse.data.results,
    });
  });

  it('debería devolver un error cuando la solicitud falla', async () => {
   
    const mockError = {
      response: { status: 404 },
      message: 'Not Found',
    };
    (axios.get as jest.Mock).mockRejectedValue(mockError);


    const response: APIResponse = await getPokemons();

    expect(response).toEqual({
      status: 404,
      message: 'Not Found',
      data: [],
    });
  });
});
