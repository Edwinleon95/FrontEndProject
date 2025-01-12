import React, { useEffect, useState } from "react";
import axios from "axios";

interface Post {
    name: string;
    height: number;
    sprites: {
        front_default: string
    };
}

const Home: React.FC = () => {
    const [pokemons, setPokemons] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const limit: number = 12;
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        const fetchpokemons = async () => {
            try {
                const allPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon//?limit=${limit}&offset=${offset}`);
                // setPokemons(response.data.results); // Update state with the pokemons data


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
                // Prevent multiple simultaneous fetches
                if (loading) return;

                setLoading(true); // Start loading before fetching

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

                setPokemons((prevPokemons) => [...prevPokemons, ...response]);
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
            <p className="text-lg font-medium text-blue-600 animate-pulse text-center mt-4">
                Loading...
            </p>
        );
    }


    if (error) {
        return <p >{error}</p>;
    }

    return (
        <div >
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {pokemons.map((post) => (
                    <li
                        key={post.name}
                        className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">{post.name}</h2>
                        <p className="text-gray-600 mb-4">Height: {post.height}</p>
                        <img
                            src={post.sprites.front_default}
                            alt={post.name}
                            className="w-24 h-24 object-contain"
                        />
                    </li>
                ))}
            </ul>

        </div>

    );
};

export default Home;



