import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Pokeball from "../assets/icons/Pokeball";


const descriptionText = "Discover Pokémon, Uncover Stats, and Enjoy AI-Generated Descriptions with Ease!";

export const LandingPage = () => {
    const navigate = useNavigate();
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        if (!descriptionText) return;

        let index = 0;
        setTypedText(""); // Reset text before starting

        const interval = setInterval(() => {
            setTypedText((prev) => {
                if (index < descriptionText.length) {
                    return prev + descriptionText[index++];
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 80);

        return () => clearInterval(interval); // Cleanup on unmount or dependency change
    }, [descriptionText]); // Ensure it updates when descriptionText changes



    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6 relative overflow-hidden">
            {/* Branding Badge */}
            <a
                href="https://webdevinnovation.com"
                target="_blank"
                rel="noreferrer"
                className="absolute top-6 right-6 flex items-center gap-3 bg-gray-800/90 px-5 py-2 rounded-full shadow-lg border border-yellow-400 
                transition duration-300 hover:bg-yellow-500 hover:text-gray-900 hover:shadow-yellow-500/50"
            >
                <img src="/coding.svg" alt="Coding Icon" className="w-6 h-6 opacity-80 transition duration-300 hover:opacity-100" />
                <span className="text-yellow-300 transition duration-300 hover:text-gray-900">by webdevinnovation.com</span>
            </a>
            {/* Background Pokéballs */}
            <Pokeball className="absolute top-10 left-0 w-32 opacity-10 -rotate-12 hidden md:block text-blue-500" />
            <Pokeball className="absolute bottom-10 right-0 w-40 opacity-10 rotate-12 hidden md:block text-red-500" />
            <Pokeball className="absolute top-1/2 left-1/2 w-16 opacity-20 -translate-x-1/2 -translate-y-1/2 text-green-500" />
            {/* Header */}
            <h1 className="text-4xl font-extrabold md:text-6xl text-center text-yellow-400 drop-shadow-lg">
                Pokédex Explorer
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl text-center leading-relaxed">
                {typedText}
            </p>
            {/* Call-to-Action Button */}
            <button
                onClick={() => navigate("/home")}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 transition duration-300 border-2 border-yellow-400"
            >
                Let’s Explore <Pokeball className="w-6 h-6 text-white" />
            </button>
        </div>
    );
};
