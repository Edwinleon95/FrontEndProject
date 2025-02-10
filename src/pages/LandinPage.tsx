import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
            <h1 className="text-4xl font-bold md:text-6xl text-center">Welcome to Pokédex Explorer</h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl text-center">
                Discover Pokémon, their stats, and AI-generated descriptions with ease.
            </p>
            <button
                onClick={() => navigate("/home")}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300"
            >
                Go Home
            </button>
        </div>
    );
};
