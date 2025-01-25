import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { EvolutionCard } from "./EvolutionCard";
import { Link } from "react-router-dom";

interface EvolutionProps {
    url: string | undefined;
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
    stats: Stat[]; // Array of stats
    types: Type[];
    sprites: {
        front_default: string;
    };
}

export const EvolutionContainer: React.FC<EvolutionProps> = ({ url }) => {
    const [evolutionArray, setEvolutionArray] = useState<Post[]>([]);
    const fetchEvolutions = useCallback(async () => {
        if (!url) return;
        try {
            const allPokemons = await axios.get(url);
            const evolutionChain = await axios.get(allPokemons.data.evolution_chain.url);

            const getEvolutionNames = (chain: any) => {
                let evolutions: { name: string }[] = []; // Corrected type

                const traverse = (node: any) => {
                    evolutions.push({ name: node.species.name });

                    if (node.evolves_to.length > 0) {
                        node.evolves_to.forEach(traverse);
                    }
                };

                traverse(chain);
                return evolutions;
            };

            console.log(getEvolutionNames(evolutionChain.data.chain)); // Fixed access
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
            console.log("done");
        }
    }, []);


    useEffect(() => {
        fetchEvolutions();
    }, [fetchEvolutions]);

    return (
        <div className="p-2 sm:p-4">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {evolutionArray.map((post) => (
                    <Link to={`/detail/${post.name}`} key={post.name}>
                        <EvolutionCard key={post.name} {...post} />
                    </Link>
                ))}
            </ul>
        </div>
    );
}