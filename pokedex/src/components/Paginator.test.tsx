import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import Paginator from "./Paginator";

const mockHandlePaginator = vi.fn();

afterEach(() => {
  cleanup();
});
describe("Paginator", () => {
  it("Should render 15 buttons when 300 items are passed as props", () => {
    render(
      <Paginator
        totalItems={300}
        currentPage={10}
        handlePaginator={mockHandlePaginator}
      />
    );

    const results = screen.getByText("300");
    const lastButton = screen.getByRole("button", { name: "15" });
    expect(results).toBeDefined();
    expect(lastButton).toBeDefined();
  });
  it("Should render 5 buttons when 100 items are passed as props", () => {
    render(
      <Paginator
        totalItems={100}
        currentPage={1}
        handlePaginator={mockHandlePaginator}
      />
    );

    const results = screen.getByText("100");
    const lastButton = screen.getByRole("button", { name: "5" });
    expect(results).toBeDefined();
    expect(lastButton).toBeDefined();
  });

  it("Should call handlePaginator with argument 5 if button 5 is clicked", () => {
    render(
      <Paginator
        totalItems={100}
        currentPage={1}
        handlePaginator={mockHandlePaginator}
      />
    );

    const lastButton = screen.getByRole("button", { name: "5" });
    fireEvent.click(lastButton);

    expect(mockHandlePaginator).toBeCalledWith(5);
  });
  it("Should call handlePaginator  with next page number (2) if actual page is 1 when chevron-rigth button is clicked", async () => {
    render(
      <Paginator
        totalItems={1302}
        currentPage={1}
        handlePaginator={mockHandlePaginator}
      />
    );

    const rigthButton = screen.getByTestId('chevron-right')
    fireEvent.click(rigthButton);

    await waitFor(()=>{
      expect(mockHandlePaginator).toHaveBeenLastCalledWith(2)
      
    })
  });
  it("Should call handlePaginator  with previous page number (2) if current page is 3 when chevron-left button is clicked", async () => {
    render(
      <Paginator
        totalItems={1302}
        currentPage={3}
        handlePaginator={mockHandlePaginator}
      />
    );

    const leftButton = screen.getByTestId('chevron-left')
    fireEvent.click(leftButton);

    await waitFor(()=>{
      expect(mockHandlePaginator).toHaveBeenLastCalledWith(2)
      
    })
  });

  it("Should call handlePaginator  with next page number (2) if actual page is 1 when NEXT button is clicked", async () => {
    render(
      <Paginator
        totalItems={1302}
        currentPage={1}
        handlePaginator={mockHandlePaginator}
      />
    );

    const nextButton = screen.getByText(/next/i)
    fireEvent.click(nextButton);

    await waitFor(()=>{
      expect(mockHandlePaginator).toHaveBeenLastCalledWith(2)
      
    })
  });
  it("Should call handlePaginator  with previous page number (2) if current page is 3 when PREVIOUS button is clicked", async () => {
    render(
      <Paginator
        totalItems={1302}
        currentPage={3}
        handlePaginator={mockHandlePaginator}
      />
    );

    const prevButton = screen.getByText(/previous/i)
    fireEvent.click(prevButton);

    await waitFor(()=>{
      expect(mockHandlePaginator).toHaveBeenLastCalledWith(2)
      
    })
  });
});
