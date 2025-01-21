import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

interface PokemonData {
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
    stats: Stat[];
    types: Type[];
}

const Details = () => {
    const { name } = useParams();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (!name) {
            return; // Avoid making a request if name is missing
        }
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                setError(false);

                const response = await axios.get<PokemonData>(
                    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
                );

                setPokemon(response.data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [name]);

    // Redirect to home if Pokémon is not found
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                navigate("/");
            }, 1500);
        }
    }, [error, navigate]);

    if (loading) return <p>Loading Pokémon details...</p>;
    if (error) return <p>Pokémon not found! Redirecting...</p>;

    return (
        <div>
            <h1>Pokémon Details</h1>
            <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
            <p>Name: {pokemon?.name}</p>
            <p>Height: {pokemon?.height}</p>
            <p>Weight: {pokemon?.weight}</p>
            <h2>Stats:</h2>
            <ul>
                {pokemon?.stats.map((stat) => (
                    <li key={stat.stat.name}>
                        {stat.stat.name}: {stat.base_stat}
                    </li>
                ))}
            </ul>
            <h2>Types:</h2>
            <ul>
                {pokemon?.types.map((type) => (
                    <li key={type.type.name}>{type.type.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Details;
