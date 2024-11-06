import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Navbar } from "./Navbar";


vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: () => mockNavigate,
    };
  });
  
  const mockNavigate = vi.fn();

describe("Navbar", ()=>{
      beforeEach(() => {
        mockNavigate.mockClear();
      });
   it("Should render title", ()=>{
        render(
            <MemoryRouter>
                <Navbar/>
            </MemoryRouter>
        )
        const title = screen.findByText(/pokédex/i)
        expect(title).toBeDefined()
        
    })
    it("Should Navigate to Home when title is clicked", async()=>{

        render(
            <MemoryRouter>
                <Navbar/>
            </MemoryRouter>
        )

        const title = await screen.findAllByText(/pokédex/i)
        fireEvent.click(title[0])

        expect(mockNavigate).toHaveBeenCalledWith('/');
    })
    it("Should Navigate to favorites when heart is clicked", async()=>{

        render(
            <MemoryRouter>
                <Navbar/>
            </MemoryRouter>
        )

        const heart = await screen.findAllByTestId("heart")
        fireEvent.click(heart[0])

        expect(mockNavigate).toHaveBeenCalledWith('/favorites');
    })
})