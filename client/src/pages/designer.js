import React, {useState, useEffect} from "react";
import axios from 'axios';

const Designer = () => {
    const [file, setFile] = useState();
    const [fileLinks, setFileLinks] = useState();

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (file == null) {
            console.log("make sure to select a file");
            return;
        }

        const url = 'http://localhost:8000/upload-file';
        const data = new FormData();
        data.append('file', file);
        data.append('bucket', 'designer');
        data.append('hub', 'test'); // replace with variable hub name from specific url when that is implemented
        const headers = {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        };
        axios.post(url, data, headers).then((response) => {
            console.log(response.data);
        });
    }

    async function getFileLinks() {
        const bucket = "test" + '-' + 'designer';

        let filenames = await fetch(`http://localhost:8000/get-filenames?bucket=${bucket}`);
        filenames = await filenames.json();

        var links = []
        for (let i = 0; i < filenames.length; i++) {
            let res = await fetch(`http://localhost:8000/download-file?name=${filenames[i]}&bucket=${bucket}`);
            let blob = await res.blob();
            let url = URL.createObjectURL(blob);
            links.push(<li key={i}><a href={url} download={filenames[i]}>{filenames[i]}</a></li>);
        }
        await setFileLinks(links);
    }

    useEffect(() => {
        getFileLinks();
    }, [] );

    return (
        <div>
            <h1>Designer Page</h1>
            <p>Should be able to take uploads of the following types:</p>
            <ul>
                <li>Photos (.jpg, .png)</li>
                <li>Videos (.mov, .mp4)</li>
                <li>PDF (.pdf)</li>
                <li>Vectorworks (.dwg, .dxf, .dwf, and more I think?)</li>
                <li>AutoCAD (.dwg)</li>
            </ul>
            <form onSubmit={handleSubmit}>
                <h2>Upload file</h2>
                <input type="file" onChange={handleChange}/>
                <button type="submit">Upload</button>
            </form>
            <h2>Download file</h2>
            <ul>
                {fileLinks}
            </ul>
        </div>
    )
}

export default Designer;