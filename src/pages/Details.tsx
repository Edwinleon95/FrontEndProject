import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../assets/Loading";
import ErrorLoading from "../assets/ErrorLoading";
import { getTypeColor } from "../utils/Helper";
import { ChatGPT } from "../components/ChatGPT";
// import { ChatGPT } from "../services/ChatGPT";  // Adjust import path if needed

interface Stat {
    base_stat: number;
    stat: {
        name: string;
    };
}

interface Type {
    type: {
        name: string;
    };
}

interface PokemonData {
    name: string;
    height: number;
    weight: number;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    stats: Stat[];
    types: Type[];
}

const Details = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [chatHistory, setChatHistory] = useState<string>("");

    // Fetch Pokémon Data
    const fetchPokemon = useCallback(async () => {
        if (!name) return;

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get<PokemonData>(
                `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
            );
            setPokemon(response.data);

            // Create history data from the Pokemon details
            const historyData = `Pokémon${response.data.name}!`;

            // Fetch the Pokémon history from OpenAI (ChatGPT)
            const chatResponse = await ChatGPT(historyData);
            setChatHistory(chatResponse);
        } catch (err) {
            setError("Failed to load Pokémon. Redirecting to home...");
            setTimeout(() => navigate("/"), 2000);
        } finally {
            setLoading(false);
        }
    }, [name, navigate]);

    useEffect(() => {
        fetchPokemon();
    }, [fetchPokemon]);

    if (loading) return <Loading />;
    if (error) return <ErrorLoading />;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 text-white p-6">
            <h1 className="text-4xl font-bold mb-4 capitalize">{pokemon?.name}</h1>

            <img
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt={`${pokemon?.name} official artwork`}
                className="w-40 sm:w-48 md:w-56 object-contain bg-white p-3 rounded-full shadow-lg"
            />

            <div className="text-center mt-6">
                <p className="text-lg font-semibold">Height: {pokemon?.height}</p>
                <p className="text-lg font-semibold">Weight: {pokemon?.weight}</p>
            </div>

            {/* Stats Section */}
            <div className="mt-6 w-full max-w-md bg-white text-black p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-3 text-center">Stats</h2>
                <ul className="grid grid-cols-2 gap-2 text-sm">
                    {pokemon?.stats.map((stat) => (
                        <li key={stat.stat.name} className="bg-gray-200 p-2 rounded-md text-center capitalize">
                            {stat.stat.name}: <span className="font-bold">{stat.base_stat}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Types Section */}
            <div className="mt-4 w-full max-w-md bg-white text-black p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-3 text-center">Types</h2>
                <ul className="flex justify-center gap-4">
                    {pokemon?.types.map((type) => (
                        <li
                            key={type.type.name}
                            className="px-4 py-1 rounded-full text-white font-semibold capitalize"
                            style={{ backgroundColor: getTypeColor(type.type.name) }}
                        >
                            {type.type.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Display ChatGPT's response */}
            <div className="mt-6 w-full max-w-md bg-white text-black p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-3 text-center">Pokémon History</h2>
                <p>{chatHistory}</p>
            </div>

            {/* Go Home Button */}
            <button
                onClick={() => navigate("/")}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300"
            >
                Go Home
            </button>
        </div>
    );
};

export default Details;
