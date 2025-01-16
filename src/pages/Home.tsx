import ContainerCards from "../components/ContainerCards";
import { PokemonProvider } from "../components/PokemonContext";
import SearchBar from "../components/SearchBar";

const Home: React.FC = () => {

    return (
        <div >
            <PokemonProvider>
                <SearchBar />
                <ContainerCards />
            </PokemonProvider>
        </div>

    );
};

export default Home;



