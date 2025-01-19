import React, { useState, useCallback } from "react";
import { usePokemon } from "./PokemonContext";
import Pokeball from "../assets/icons/Pokeball";

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("");
    const { searchPokemon } = usePokemon();

    const handleSearch = useCallback(async () => {
        const trimmedQuery = query.trim();
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
                aria-label="Search"
                className="rounded-full shadow-md flex items-center justify-center transition-transform transform hover:scale-105 active:ring-2 active:ring-[#db071c]"
            >
                <Pokeball className="w-8 h-8 md:w-10 md:h-10" />
            </button>
        </div>

    );
};

export default SearchBar;