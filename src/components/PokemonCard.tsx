import React from "react";

interface PokemonCardProps {
    name: string;
    height: number;
    sprites: {
        front_default: string;
    };
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, height, sprites }) => {
    return (
        <li className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-600 mb-4">Height: {height}</p>
            <img
                src={sprites.front_default}
                alt={name}
                className="w-24 h-24 object-contain"
            />
        </li>
    );
};

export default PokemonCard;
