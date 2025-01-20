import { useParams } from "react-router-dom";

function Details() {
    const { name } = useParams();

    return (
        <div>
            <h1>Pokémon Details</h1>
            <p>Name: {name}</p>
        </div>
    );
}

export default Details;
