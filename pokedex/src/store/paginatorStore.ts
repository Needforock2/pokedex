import { create } from "zustand";

interface PaginatorState{
    totalItems: number,
    setTotalItems: (items: number)=> void
}

const usePaginatorStore = create <PaginatorState>((set)=>({
    totalItems: 0,
    setTotalItems: (totalItems)=>set({totalItems})
}))

export default usePaginatorStore