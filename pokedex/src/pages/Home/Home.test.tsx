import { describe, expect, test, vi } from "vitest";
import axios from "axios";
import { getPokemons } from "../../service/api";
import { render, screen } from "@testing-library/react";
import Home from ".";
import { MemoryRouter } from "react-router-dom";

vi.mock("axios");
describe("Home Fetch POkemons", () => {
  const mockPokemons = [
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
  ];
  const mockAPIResponse = {
    status: 200,
    message: "Success",
    data: mockPokemons
  };
  
  
  (axios.get as jest.Mock).mockResolvedValueOnce({
    data: { results: mockPokemons },
  });
  test("Should  make a Get to fetch pokemons", async () => {
    const pokemons = await getPokemons();

    expect(axios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=undefined"
    );
    expect(pokemons).toStrictEqual(mockAPIResponse);
  });
  
  describe(" Home Should render", ()=>{
    test("Should render the search bar", async ()=>{
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { results: mockPokemons },
      });
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );

      const previousButton = await screen.findAllByRole('button', {name: /previous/i})
      const nextButton = await screen.findAllByRole('button', {name: /next/i})
      expect(previousButton).toHaveLength(1)
      expect(nextButton).toHaveLength(1)
    })
    test("Should render paginator", async ()=>{
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { results: mockPokemons },
      });
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );

      const paginator = await screen.findAllByTestId("paginator-wrapper")

      expect(paginator).toHaveLength(2)

    })
  })
});
