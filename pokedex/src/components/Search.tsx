import React, { useRef, useState } from "react";
import usePokemonStore from "../store/pokemonStore";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
  handleSearch: (word: string, key: string) => void;
}
export const Search = ({ handleSearch }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setSearchKey, setSearchTerm, searchKey } = usePokemonStore();
  const [isOpen, setIsOpen] = useState(false);
 
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const searchWord = inputRef.current?.value || "";

    handleSearch(searchWord, searchKey);
    if (searchWord) {
      setSearchTerm(searchWord);
    }
  };

  const handleOptionSelected = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget as HTMLLIElement;
    setSearchKey(target.innerText);
    setIsOpen(false);
  };

  const toggleDropdown = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };


  return (
    <div className=" bg-white rounded-lg">
      <form className="mx-auto">
        <div className="relative flex items-center justify-between p-2 w-[75vw] lg:w-[50vw]">
          <button
            onClick={toggleDropdown}
            data-dropdown-toggle="dropdown"
            className="z-10 w-5/12 lg:w-3/12 flex items-center flex-grow-0 bg-white border justify-evenly p-0 font-medium text-center text-gray-900 bg-gray-100   hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 text-red dark:border-gray-600"
          >
            {searchKey || "Options"}
            <IoIosArrowDown className="text-lg " />
          </button>
          {isOpen && (
            <div
              data-dropdown-menu="dropdown"
              className="absolute left-0 top-10 z-10 mt-2 w-5/12 lg:w-3/12 py-2 bg-white border rounded shadow "
            >
              <li
                role="listitem"
                className="block text-gray-800 py-1 hover:cursor-pointer hover:text-red"
                onClick={(e) => handleOptionSelected(e)}
              >
                Name
              </li>
              <li
                role="listitem"
                className="block text-gray-800 py-1 hover:cursor-pointer hover:text-red"
                onClick={(e) => handleOptionSelected(e)}
              >
                Type
              </li>
            </div>
          )}
          <div className="relative w-7/12 lg:w-9/12">
            <input
            ref={inputRef}
              type="text"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-e-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search..."
              required
            />
            <button
              data-testid="submit-button"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-red bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => handleSubmit(e)}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};


