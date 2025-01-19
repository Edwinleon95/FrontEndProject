const Loading = () => {
    return (
        <div className="flex justify-center mt-4 sm:mt-6">
            <p className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 rounded-lg shadow-md text-center animate-pulse text-sm sm:text-base md:text-lg">
                🔄 Loading Pokémon...
            </p>
        </div>
    );
};

export default Loading;