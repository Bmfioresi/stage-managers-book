import React, {useState} from "react";
import axios from 'axios';

const Search = () => {
    const [name, setName] = useState([]);

    async function search() {
        const url = 'http://localhost:8000/search';
        const res = await axios.get(url).then((response) => {
            console.log(response.data);
        });
        // setName(await res.json());
    }

    return (
        <div>
            <h1>File search test</h1>
            <button onClick={search}>Search</button>
            {/* <ol className="list-group list-group-numbered">
                {name.map((data) => {
                    return(
                        <li className="list-group-item" key={data.id}>{data.title}</li>
                    )
                })}
            </ol> */}
        </div>
    );
};

export default Search;