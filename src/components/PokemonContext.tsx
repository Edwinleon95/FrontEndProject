import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";

// Define the structure of the Pokémon data
interface PokemonData {
    name: string;
    height: number;
    sprites: {
        front_default: string
    };
};

// Define the context shape
interface PokemonContextType {
    searchLoading: boolean;
    pokemon: PokemonData | null;
    searchPokemon: (query: string) => Promise<void>;
}

// Create the context
const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

// Create the provider
export const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);

    const searchPokemon = async (query: string) => {
        try {
            setSearchLoading(true);
            if (!query) {
                setPokemon(null);
                return;
            }
            const result = await axios.get<PokemonData>(`https://pokeapi.co/api/v2/pokemon/${query.toLocaleLowerCase()}`);
            setPokemon(result.data); // Save Pokémon data in state
        } catch (err) {
            console.error(err);
            setPokemon(null);
        } finally {
            setSearchLoading(false);
        }
    };

    return (
        <PokemonContext.Provider value={{ pokemon, searchPokemon , searchLoading }}>
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
