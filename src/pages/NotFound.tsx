import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const [counter, setCounter] = useState(10);
    const navigate = useNavigate();

    // Decrease counter every second and navigate when it reaches 0
    useEffect(() => {
        if (counter === 0) {
            navigate("/home");  // Navigate to home
            return;
        }
        const timer = setInterval(() => setCounter((prev) => prev - 1), 1000);
        return () => clearInterval(timer); // Clean up interval on component unmount
    }, [counter, navigate]);

    // Function to manually navigate to home when the button is clicked
    const goHome = () => {
        navigate("/home");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
            <p className="text-xl mb-6">The page you are looking for does not exist.</p>
            <img
                src="/NotFoundPokeBall.png"
                alt="Pokémon Not Found"
                className="w-48 h-48 mb-6"
            />
            <div className="text-2xl mb-6">
                <p>Redirecting in {counter}...</p>
            </div>
            <button
                onClick={goHome}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Return to Home
            </button>
        </div>
    );
};

export default NotFound;
