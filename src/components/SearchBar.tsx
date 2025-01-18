import React, { useState, useCallback } from "react";
import { usePokemon } from "./PokemonContext";

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("");
    const { searchPokemon } = usePokemon();

    const handleSearch = useCallback(async () => {
        if (!query.trim()) return; // Prevent empty searches
        await searchPokemon(query.trim());
    }, [query, searchPokemon]);

    return (
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-100 to-white border border-gray-300 rounded-full shadow-lg max-w-md mx-auto mt-4 transition-transform transform hover:scale-105">
            {/* Input Field */}
            <input
                type="text"
                value={query}
                onInput={(event) => setQuery((event.target as HTMLInputElement).value)}
                placeholder="Search Pokémon..."
                aria-label="Search Pokémon"
                className="flex-1 px-4 py-2 bg-transparent border-none text-gray-700 text-sm focus:outline-none placeholder-gray-500"
                onKeyDown={(event) => event.key === "Enter" && handleSearch()}
            />
            
            {/* Search Button */}
            <button
                onClick={handleSearch}
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all active:scale-95"
            >
                🔍 Search
            </button>
        </div>
    );
};

export default SearchBar;
