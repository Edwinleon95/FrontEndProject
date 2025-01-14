import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

interface Post {
    name: string;
    height: number;
    sprites: {
        front_default: string
    };
}

const ContainerCards: React.FC = () => {
    const [pokemons, setPokemons] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const limit: number = 12;
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        const fetchpokemons = async () => {
            try {
                const allPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon//?limit=${limit}&offset=${offset}`);
                const response = await Promise.all(
                    allPokemons.data.results.map(async (pokemon: any) => {
                        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                        return result.data;
                    })
                );
                setPokemons(response);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch pokemons. Please try again later.");
                setLoading(false);
            }
        };

        fetchpokemons();
    }, []);

    useEffect(() => {
        const handleScroll = async () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {

                setOffset((prevOffset) => {
                    const newOffset = prevOffset + limit;
                    fetchPokemons(newOffset); // Fetch new data using the updated offset
                    return newOffset;
                });
            }
        };

        const fetchPokemons = async (currentOffset: number) => {
            try {
                const allPokemons = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${currentOffset}`
                );

                const response = await Promise.all(
                    allPokemons.data.results.map(async (pokemon: any) => {
                        const result = await axios.get(
                            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                        );
                        return result.data;
                    })
                );

                setPokemons((prevPokemons) => [...new Map([...prevPokemons, ...response].map(pokemon => [pokemon.name, pokemon])).values()]);
            } catch (err) {
                setError("Failed to fetch pokemons. Please try again later.");
            } finally {
                setLoading(false); // Stop loading after fetching
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, limit]);


    if (loading) {
        return (
            <p className="text-lg font-medium text-blue-600 animate-loading text-center mt-4">
                Loading...
            </p>
        );
    }


    if (error) {
        return <p >{error}</p>;
    }

    return (
        <div className="bg-black">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {pokemons.map((post) => (
                    <PokemonCard
                        key={post.name}
                        name={post.name}
                        height={post.height}
                        sprites={post.sprites}
                    />))}
            </ul>
            <div className="bg-black text-white text-center p-4">
                <p className="text-lg font-medium text-blue-600 animate-loading text-center mt-4">
                    Loading...
                </p>
            </div>

        </div>

    );
};

export default ContainerCards;



