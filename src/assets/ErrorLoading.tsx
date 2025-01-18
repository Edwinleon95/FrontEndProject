const ErrorLoading = () => {
    return (
        <div className="flex justify-center mt-6">
            <p className="px-6 py-3 bg-gradient-to-r from-red-100 to-red-200 border border-red-400 text-red-700 rounded-lg shadow-md text-center">
                ❌ Pokémon not found! Please check the name and try again.
            </p>
        </div>
    );
}

export default ErrorLoading;