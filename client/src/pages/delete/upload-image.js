import React, {useState} from "react";
import axios from 'axios';
import '../css/pages.css';

const UploadImage = () => {
    const [file, setFile] = useState();

    function handleChange(event) {
        setFile(event.target.files[0]);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const url = 'http://localhost:8000/upload-image';
        const data = new FormData();
        data.append('file', file);
        const headers = {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        }
        axios.post(url, data, headers).then((response) => {
            console.log(response.data);
        });
    };

    return (
        <div className="right-side">
        <form onSubmit={handleSubmit}>
            <h1>File upload test</h1>
            <input type="file" onChange={handleChange}/>
            <button type="submit">Upload</button>
        </form>
        </div>
    );
};

export default UploadImage;