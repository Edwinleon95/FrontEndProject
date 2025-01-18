import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";

// Define the Stat and Type interfaces
interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

interface Type {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

// Define the structure of the Pokémon data
interface PokemonData {
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
    stats: Stat[];  // Add stats
    types: Type[];  // Add types
}

// Define the context shape
interface PokemonContextType {
    searchLoading: boolean;
    errorLoading: boolean;
    pokemon: PokemonData | null;
    searchPokemon: (query: string) => Promise<void>;
}

// Create the context
const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

// Create the provider
export const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [errorLoading, setErrorLoading] = useState<boolean>(false);

    const searchPokemon = async (query: string) => {
        try {
            setSearchLoading(true);
            if (!query) {
                setPokemon(null);
                return;
            }
            const result = await axios.get<PokemonData>(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
            
            // Ensure the response includes stats and types
            setPokemon({
                name: result.data.name,
                height: result.data.height,
                weight: result.data.weight,
                sprites: result.data.sprites,
                stats: result.data.stats, 
                types: result.data.types
            });
        } catch (err: unknown) {
            setErrorLoading(true);
            setTimeout(() => setErrorLoading(false), 3000); // Keep the message for 3 seconds
            setPokemon(null);
        } finally {
            setSearchLoading(false);
        }
    };

    return (
        <PokemonContext.Provider value={{ pokemon, searchPokemon, searchLoading, errorLoading }}>
            {children}
        </PokemonContext.Provider>
    );
};

// Custom hook to use the context
export const usePokemon = (): PokemonContextType => {
    const context = useContext(PokemonContext);
    if (!context) {
        throw new Error("usePokemon must be used within a PokemonProvider");
    }
    return context;
};
