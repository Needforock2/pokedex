import { cleanup, fireEvent, render, screen } from "@testing-library/react";
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
});
