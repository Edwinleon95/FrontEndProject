import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import { usePokemon } from "./PokemonContext";
import ErrorLoading from "../assets/ErrorLoading";
import Loading from "../assets/Loading";
import ScrollLoading from "../assets/ScrollLoading";


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
interface Post {
    name: string;
    height: number;
    weight: number;
    stats: Stat[]; // Array of stats
    types: Type[];
    sprites: {
        front_default: string;
    };
}

const ContainerCards: React.FC = () => {
    const [pokemons, setPokemons] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const limit: number = 12;
    const [offset, setOffset] = useState<number>(0);
    const { pokemon, searchLoading, errorLoading } = usePokemon();

    const fetchPokemons = useCallback(async (currentOffset: number) => {
        try {
            setIsFetchingMore(true);
            const allPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${currentOffset}`);
            const response = await Promise.all(
                allPokemons.data.results.map(async (pokemon: any) => {
                    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                    return result.data;
                })
            );

            setPokemons((prevPokemons) => [
                ...new Map([...prevPokemons, ...response].map(pokemon => [pokemon.name, pokemon])).values(),
            ]);
        } catch (err) {
            console.error("Error fetching Pokémons:", err);
            setError("Failed to fetch Pokémon. Please try again later.");
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchPokemons(offset);
    }, [fetchPokemons, offset]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 10) {
            setOffset(prevOffset => prevOffset + limit);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    if (loading || searchLoading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <div className="flex justify-center mt-6">
                <p className="px-6 py-3 bg-gradient-to-r from-red-100 to-red-200 border border-red-400 text-red-700 rounded-lg shadow-md text-center">
                    ❌ {error}
                </p>
            </div>
        );
    }

    if (errorLoading) {
        return (
            <ErrorLoading />
        );
    }

    const displayedPokemons = pokemon ? [pokemon] : pokemons;

    return (
        <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {displayedPokemons.map((post) => (
                    <PokemonCard
                        key={post.name}
                        name={post.name}
                        height={post.height}
                        weight={post.weight}
                        sprites={post.sprites}
                        stats={post.stats}
                        types={post.types}
                    />
                ))}
            </ul>
            {!pokemon && isFetchingMore && (
                <ScrollLoading />
            )}
        </div>
    );
};

export default ContainerCards;
