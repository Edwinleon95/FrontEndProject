import axios from "axios";
import { useCallback, useEffect, useState, useRef } from "react";
import { EvolutionCard } from "./EvolutionCard";
import { Link } from "react-router-dom";
import Loading from "../assets/Loading";

interface EvolutionProps {
    url: string | undefined;
    selectedName: string | undefined;
}

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
    stats: Stat[];
    types: Type[];
    sprites: {
        front_default: string;
    };
}

export const EvolutionContainer: React.FC<EvolutionProps> = ({ url, selectedName }) => {
    const [evolutionArray, setEvolutionArray] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const isFirstRender = useRef(true);

    const fetchEvolutions = useCallback(async () => {
        if (!url) return;
        setLoading(true); // Start loading
        try {
            const allPokemons = await axios.get(url);
            const evolutionChain = await axios.get(allPokemons.data.evolution_chain.url);

            const getEvolutionNames = (chain: any) => {
                let evolutions: { name: string }[] = [];

                const traverse = (node: any) => {
                    evolutions.push({ name: node.species.name });
                    if (node.evolves_to.length > 0) {
                        node.evolves_to.forEach(traverse);
                    }
                };

                traverse(chain);
                return evolutions;
            };

            const arrNamesEvolutions = getEvolutionNames(evolutionChain.data.chain);
            const evolutionsData = await Promise.all(
                arrNamesEvolutions.map(async (pokemon: any) => {
                    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                    return result.data;
                })
            );
            setEvolutionArray(evolutionsData);
        } catch (err) {
            console.error("Error fetching Pokémons:", err);
        } finally {
            setLoading(false); // Stop loading
        }
    }, [url]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        fetchEvolutions();
    }, [fetchEvolutions]);

    return (
        <div className="p-2 sm:p-4">
            {loading ? (
                <Loading />
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {evolutionArray.map((post) => (
                        <Link to={`/detail/${post.name}`} key={post.name}>
                            <EvolutionCard key={post.name} {...post} selectedName={selectedName} />
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};
