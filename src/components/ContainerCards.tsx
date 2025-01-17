import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import { usePokemon } from "./PokemonContext";

interface Post {
    name: string;
    height: number;
    sprites: {
        front_default: string;
    };
}

const ContainerCards: React.FC = () => {
    const [pokemons, setPokemons] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const limit: number = 12;
    const [offset, setOffset] = useState<number>(0);
    const { pokemon, searchLoading, errorLoading } = usePokemon();

    // Fetch Pokemons function (used for both initial and scroll-based fetching)
    const fetchPokemons = useCallback(async (currentOffset: number) => {
        try {
            const allPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${currentOffset}`);
            const response = await Promise.all(
                allPokemons.data.results.map(async (pokemon: any) => {
                    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                    return result.data;
                })
            );

            // Update the list of pokemons, ensuring no duplicates
            setPokemons((prevPokemons) => [
                ...new Map([...prevPokemons, ...response].map(pokemon => [pokemon.name, pokemon])).values(),
            ]);
        } catch (err) {
            setError("Failed to fetch pokemons. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        // Fetch initial list of pokemons
        fetchPokemons(offset);
    }, [fetchPokemons, offset]);

    // Handle infinite scrolling
    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            setOffset((prevOffset) => {
                const newOffset = prevOffset + limit;
                fetchPokemons(newOffset); // Fetch new data using the updated offset
                return newOffset;
            });
        }
    }, [fetchPokemons]);

    useEffect(() => {
        // Attach the scroll event listener
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    if (loading || searchLoading) {
        return (
            <p className="text-lg font-medium text-blue-600 animate-loading text-center mt-4">
                Loading...
            </p>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (errorLoading) {
        return <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            ❌ Pokémon not found or failed to fetch data. Please check the name and try again.
        </div>;
    }
    return (
        <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {pokemon ? (
                    <PokemonCard
                        key={pokemon.name}
                        name={pokemon.name}
                        height={pokemon.height}
                        sprites={pokemon.sprites}
                    />
                ) : (
                    pokemons.map((post) => (
                        <PokemonCard
                            key={post.name}
                            name={post.name}
                            height={post.height}
                            sprites={post.sprites}
                        />
                    ))
                )}
            </ul>
            {!pokemon && (
                <div className="bg-black text-white text-center p-4">
                    <p className="text-lg font-medium text-blue-600 animate-loading text-center mt-4">Loading...</p>
                </div>
            )}
        </div>
    );
};

export default ContainerCards;
