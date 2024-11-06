import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { Paginator } from "./Paginator";
import usePaginatorStore from "../store/paginatorStore";

const mockHandlePaginator = vi.fn();
const { setTotalItems, setCurrentPage } = usePaginatorStore.getState();

afterEach(() => {
  cleanup();
});
describe("Paginator", () => {
  it("Should render 15 buttons when 300 items are passed as props", () => {
    setTotalItems(300);
    setCurrentPage(10);
    render(<Paginator handlePaginator={mockHandlePaginator} />);

    const results = screen.getByText("300");
    const lastButton = screen.getByRole("button", { name: "15" });
    expect(results).toBeDefined();
    expect(lastButton).toBeDefined();
  });
  it("Should render 5 buttons when 100 items are passed as props", () => {
    setTotalItems(100);
    setCurrentPage(1);
    render(<Paginator handlePaginator={mockHandlePaginator} />);

    const results = screen.getByText("100");
    const lastButton = screen.getByRole("button", { name: "5" });
    expect(results).toBeDefined();
    expect(lastButton).toBeDefined();
  });

  it("Should call handlePaginator with argument 5 if button 5 is clicked", () => {
    setTotalItems(100);
    setCurrentPage(1);
    render(<Paginator handlePaginator={mockHandlePaginator} />);

    const lastButton = screen.getByRole("button", { name: "5" });
    fireEvent.click(lastButton);

    expect(mockHandlePaginator).toBeCalledWith(5);
  });
  it("Should call handlePaginator  with next page number (2) if actual page is 1 when chevron-rigth button is clicked", async () => {
    setTotalItems(1302);
    setCurrentPage(1);
    render(<Paginator handlePaginator={mockHandlePaginator} />);

    const rigthButton = screen.getByTestId("chevron-right");
    fireEvent.click(rigthButton);

    await waitFor(() => {
      expect(mockHandlePaginator).toHaveBeenLastCalledWith(2);
    });
  });
  it("Should call handlePaginator  with previous page number (2) if current page is 3 when chevron-left button is clicked", async () => {
    setTotalItems(1302)
    setCurrentPage(3)
    render(
      <Paginator
        handlePaginator={mockHandlePaginator}
      />
    );

    const leftButton = screen.getByTestId("chevron-left");
    fireEvent.click(leftButton);

    await waitFor(() => {
      expect(mockHandlePaginator).toHaveBeenLastCalledWith(2);
    });
  });

  it("Should call handlePaginator  with next page number (2) if actual page is 1 when NEXT button is clicked", async () => {
    setTotalItems(1302)
    setCurrentPage(1)
    render(
      <Paginator
        handlePaginator={mockHandlePaginator}
      />
    );

    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockHandlePaginator).toHaveBeenLastCalledWith(2);
    });
  });
  it("Should call handlePaginator  with previous page number (2) if current page is 3 when PREVIOUS button is clicked", async () => {
    setTotalItems(1302)
    setCurrentPage(3)
    render(
      <Paginator

        handlePaginator={mockHandlePaginator}
      />
    );

    const prevButton = screen.getByText(/previous/i);
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(mockHandlePaginator).toHaveBeenLastCalledWith(2);
    });
  });
});
