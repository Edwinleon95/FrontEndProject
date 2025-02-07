interface EvolutionProps {
    name: string;
    sprites: {
        front_default: string;
    };
    selectedName: string | undefined;  // New prop to determine the selected Pokémon
}

export const EvolutionCard: React.FC<EvolutionProps> = ({ name, sprites, selectedName }) => {
    const isSelected = name === selectedName;

    return (
        <div
            className={`relative group w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-105
                ${isSelected ? "border-4 border-yellow-500 ring-2 ring-yellow-300 scale-110" : "border border-gray-300 bg-white"}`}
        >
            {/* Pokemon Image */}
            <img
                src={sprites.front_default}
                alt={name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full"
            />

            {/* Pokemon Name (Hidden by default, appears on hover) */}
            <h2 className="absolute opacity-0 group-hover:opacity-100 text-sm sm:text-base font-pixelify text-center capitalize text-gray-800 transition-opacity duration-300">
                {name}
            </h2>
        </div>
    );
};
