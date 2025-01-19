import React, { useState, useCallback } from "react";
import { usePokemon } from "./PokemonContext";

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("");
    const { searchPokemon } = usePokemon();

    const handleSearch = useCallback(async () => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return; // Prevent empty searches
        await searchPokemon(trimmedQuery);
    }, [query, searchPokemon]);

    return (
        <div className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-full shadow-md w-full max-w-lg mx-auto mt-4 transition-all hover:shadow-lg">
            {/* Input Field */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Pokémon..."
                aria-label="Search Pokémon"
                className="flex-1 px-4 py-2 bg-transparent text-gray-700 text-sm placeholder-gray-500 focus:outline-none focus:ring-0"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            
            {/* Search Button */}
            <button
                onClick={handleSearch}
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all active:scale-95"
                aria-label="Search"
            >
                🔍
            </button>
        </div>
    );
};

export default SearchBar;