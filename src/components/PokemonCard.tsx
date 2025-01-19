import React from "react";

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

interface PokemonCardProps {
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
    stats: Stat[];
    types: Type[];
}

// Function to assign colors based on Pokémon type
const typeColors: { [key: string]: string } = {
    grass: "bg-green-500",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-500",
    psychic: "bg-pink-500",
    ice: "bg-cyan-400",
    dragon: "bg-indigo-600",
    dark: "bg-gray-800",
    fairy: "bg-purple-400",
    normal: "bg-gray-400",
    fighting: "bg-orange-600",
    flying: "bg-blue-300",
    poison: "bg-purple-600",
    ground: "bg-yellow-700",
    rock: "bg-gray-700",
    bug: "bg-lime-500",
    ghost: "bg-indigo-800",
    steel: "bg-gray-500"
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, height, weight, sprites, stats, types }) => {
    return (
        <div className="p-4 sm:p-6 bg-gradient-to-b from-gray-100 to-white rounded-lg shadow-lg border border-gray-300 transition-transform transform hover:scale-105">
            {/* Pokemon Image */}
            <div className="flex justify-center">
                <img 
                    src={sprites.front_default} 
                    alt={name} 
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-md border border-gray-200" 
                />
            </div>

            {/* Pokemon Name */}
            <h2 className="text-lg sm:text-xl font-bold text-center capitalize mt-2 text-gray-800">{name}</h2>
            
            {/* Height & Weight */}
            <p className="text-xs sm:text-sm text-center text-gray-600 mt-1">
                Height: {height} | Weight: {weight}
            </p>

            {/* Stats */}
            <div className="mt-2 sm:mt-3">
                <h3 className="font-medium text-gray-700 text-xs sm:text-sm">Stats:</h3>
                <ul className="text-xs text-gray-600 space-y-1 mt-1">
                    {stats.slice(0, 3).map((stat) => ( // Show first 3 stats
                        <li key={stat.stat.name} className="flex justify-between bg-gray-200 px-2 py-1 rounded-md">
                            <span className="capitalize">{stat.stat.name}</span>
                            <span className="font-bold">{stat.base_stat}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Types */}
            <div className="mt-2 sm:mt-3">
                <h3 className="font-medium text-gray-700 text-xs sm:text-sm">Types:</h3>
                <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-1">
                    {types.map((type) => (
                        <span 
                            key={type.type.name} 
                            className={`px-2 sm:px-3 py-1 text-xs font-semibold text-white rounded-md ${typeColors[type.type.name] || "bg-gray-500"}`}
                        >
                            {type.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;