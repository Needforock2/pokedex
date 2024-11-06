import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import {
  getPaginatorData,
  getPokemons,
  getPokemonType,
} from "../../service/api";

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Home from ".";
import { MemoryRouter } from "react-router-dom";
import usePokemonStore from "../../store/pokemonStore";

vi.mock("../../service/api");

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

const mockIcePokemons = [
  {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/",
  },
  {
    name: "venusaur",
    url: "https://pokeapi.co/api/v2/pokemon/3/",
  },
];

describe("Home", () => {
  const { setSearchKey, setAllPokemons } = usePokemonStore.getState();
  beforeEach(() => {
    (getPokemons as jest.Mock).mockResolvedValueOnce({
      status: 200,
      message: "Succes",
      data: mockPokemons,
    });
    (getPaginatorData as jest.Mock).mockResolvedValueOnce({
      status: 200,
      message: "Succes",
      data: mockPokemons,
    });
    (getPokemonType as jest.Mock).mockResolvedValueOnce({
      status: 200,
      message: "Succes",
      data: mockIcePokemons,
    });
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    cleanup();
    setSearchKey("");
    setAllPokemons([]);
    vi.clearAllMocks();
  });

  test("Should  make a Get to fetch pokemons", async () => {
    expect(getPokemons).toHaveBeenCalledWith(1);
  });

  test("Should render the search bar", async () => {
    const previousButton = await screen.findAllByRole("button", {
      name: /previous/i,
    });
    const nextButton = await screen.findAllByRole("button", {
      name: /next/i,
    });
    expect(previousButton).toHaveLength(1);
    expect(nextButton).toHaveLength(1);
  });
  test("Should render paginator", async () => {
    const paginator = await screen.findAllByTestId("paginator-wrapper");
    expect(paginator).toHaveLength(1);
  });

  test("Should filter pokemons by name: bulbasaur", async () => {
    const { setSearchKey, setAllPokemons } = usePokemonStore.getState();
    setAllPokemons(mockPokemons);
    const optionsButton = screen.getByRole("button", { name: /options/i });
    fireEvent.click(optionsButton);
    const optionsList = screen.getAllByRole("listitem");
    fireEvent.click(optionsList[0]);
    setSearchKey("Name");
    const inputText = screen.getByRole("textbox");
    fireEvent.change(inputText, { target: { value: "bulbasaur" } });
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    const pokemonCard = screen.getAllByRole("listitem");
    await waitFor(() => {
      expect(pokemonCard).toHaveLength(1);
    });
  });

  test("Should render 2 pokemons when Type and Ice are entered in the search bar", async () => {
    const { setSearchKey, setAllPokemons } = usePokemonStore.getState();
    setAllPokemons(mockPokemons);
    const optionsButton = screen.getByRole("button", { name: /options/i });
    fireEvent.click(optionsButton);
    const optionsList = screen.getAllByRole("listitem");
    fireEvent.click(optionsList[0]);
    setSearchKey("Type");

    const inputText = screen.getByRole("textbox");
    fireEvent.change(inputText, { target: { value: "ice" } });

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    expect(getPokemonType).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      const pokemonList = screen.getAllByRole("listitem");
      expect(pokemonList).toHaveLength(2);
    });
  });

  test("Should render 3 pokemons when Name and '' are entered in the search bar", async () => {
    (getPaginatorData as jest.Mock).mockResolvedValue({
      status: 200,
      message: "Succes",
      data: mockPokemons,
    });
    (getPokemons as jest.Mock).mockResolvedValue({
      status: 200,
      message: "Succes",
      data: mockPokemons,
    });
    const { setSearchKey, setAllPokemons } = usePokemonStore.getState();
    setAllPokemons(mockPokemons);
    const optionsButton = screen.getByRole("button", { name: /options/i });
    fireEvent.click(optionsButton);
    const optionsList = screen.getAllByRole("listitem");
    fireEvent.click(optionsList[0]);
    setSearchKey("Name");
    const inputText = screen.getByRole("textbox");
    fireEvent.change(inputText, { target: { value: "" } });
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const submitButton = screen.getByTestId("submit-button");

      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(getPokemons).toHaveBeenCalled();
      expect(getPaginatorData).toHaveBeenCalled();
    });
  });

  test("Should call handlePaginator(1) when paginator button '1' is clicked in paginator", async () => {
    (getPokemons as jest.Mock).mockResolvedValueOnce({
      status: 200,
      message: "Succes",
      data: mockPokemons,
    });
    const { pokemons } = usePokemonStore.getState();
    const numberOneButton = screen.getAllByRole("button", { name: "1" });
    expect(numberOneButton).toBeDefined();

    fireEvent.click(numberOneButton[1]);

    await waitFor(() => {
      expect(getPokemons).toHaveBeenCalledWith(1);

      expect(pokemons).toEqual(mockPokemons);
    });
  });
});
