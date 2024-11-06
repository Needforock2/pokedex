import { create } from "zustand";

interface PaginatorState{
    totalItems: number,
    currentPage: number,
    setTotalItems: (items: number)=> void
    setCurrentPage: (page: number)=> void
}

const usePaginatorStore = create <PaginatorState>((set)=>({
    totalItems: 0,
    currentPage: 1,
    setTotalItems: (totalItems)=>set({totalItems}),
    setCurrentPage: (currentPage)=>set({currentPage})
}))


export default usePaginatorStore