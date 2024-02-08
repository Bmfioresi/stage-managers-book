import React, {useState} from "react";
import axios from 'axios';

const Upload = () => {
    const [file, setFile] = useState();

    function handleChange(event) {
        setFile(event.target.files[0]);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const url = 'http://localhost:8000/upload';
        const data = new FormData();
        data.append('file', file);
        data.append('fileName', file.name);
        axios.post(url, data).then((response) => {
            console.log(response.data);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>File upload test</h1>
            <input type="file" onChange={handleChange}/>
            <button type="submit">Upload</button>
        </form>
    );
};

export default Upload;