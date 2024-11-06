import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import usePokemonStore from "../store/pokemonStore";
import { Search } from "./Search";

const mockHandleSearch = vi.fn();

describe("Search", () => {
  beforeEach(() => {
    usePokemonStore.setState({ searchKey: "" });
  });
  afterEach(() => {
    cleanup();
  });

  it("Should render list of options when options button is clicked", () => {
    render(<Search handleSearch={mockHandleSearch} />);
    const optionsButton = screen.getByRole("button", { name: /options/i });
    expect(optionsButton).toBeDefined();
    fireEvent.click(optionsButton);
    const optionsList = screen.getAllByRole("listitem");
    expect(optionsList[0].innerHTML).toBe("Name");
    expect(optionsList[1].innerHTML).toBe("Type");
  });
  it("Should change inputText", () => {
    render(<Search handleSearch={mockHandleSearch} />);
    const inputText = screen.getByRole("textbox");
    fireEvent.change(inputText, { target: { value: "Pikachu" } });

    expect((inputText as HTMLInputElement).value).toBe("Pikachu");
  });

  it("Should handle the options selection", async () => {
    const { setSearchKey } = usePokemonStore.getState();

    render(<Search handleSearch={mockHandleSearch} />);

    const optionsButton = screen.getByRole("button", { name: /options/i });
    expect(optionsButton).toBeDefined();
    fireEvent.click(optionsButton);
    const optionsList = screen.getAllByRole("listitem");
    expect(optionsList[0].innerHTML).toBe("Name");
    expect(optionsList[1].innerHTML).toBe("Type");

    fireEvent.click(optionsList[0]);
    setSearchKey("Name");
    await waitFor(() => {
      expect(screen.getByText(/Name/i)).toBeDefined();
    });
  });
  it("Should call handleSearch", async () => {
    //Arrange
    const { setSearchKey } = usePokemonStore.getState();

    //Act
    render(<Search handleSearch={mockHandleSearch} />);
    const optionsButton = screen.getByRole("button", { name: /options/i });
    fireEvent.click(optionsButton);
    const optionsList = screen.getAllByRole("listitem");
    fireEvent.click(optionsList[0]);
    setSearchKey("Name");
    const inputText = screen.getByRole("textbox");
    fireEvent.change(inputText, { target: { value: "Pikachu" } });
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    //Assert
    expect(mockHandleSearch).toBeCalledWith("Pikachu", "Name");
  });
});
