import React, { useState } from "react";
import { usePokemon } from "./PokemonContext";

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("");
    const { searchPokemon } = usePokemon();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = async () => {
        await searchPokemon(query); // Trigger the search and update global state
    };

    return (
        <div className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg max-w-md mx-auto">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
                className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
