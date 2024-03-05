import React, {useState, useEffect, useCallback} from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

const baseUrl = 'http://localhost:8000';

const Designer = () => {
    const [hub, setHub] = useState("");
    const [file, setFile] = useState();
    const [fileLinks, setFileLinks] = useState();
    const [loading, setLoading] = useState(true);
    const params = useParams();

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (file == null) {
            alert("Make sure to select a file");
            return;
        }

        const url = `${baseUrl}/upload-file`;
        const data = new FormData();
        data.append('file', file);
        data.append('bucket', 'designer');
        data.append('hub', hub);
        const headers = {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        };
        axios.post(url, data, headers).then((response) => {
            // console.log(response.data);
            alert(`Successfully uploaded ${response.data.name}`);
        });
    }

    const getFileLinks = useCallback(async () => {
        // get bucket from page
        const bucket = `${hub}-designer`;

        let filenames = await fetch(`${baseUrl}/get-filenames?bucket=${bucket}`);
        filenames = await filenames.json();

        var links = [];
        for (let i = 0; i < filenames.length; i++) {
            let res = await fetch(`${baseUrl}/download-file?name=${filenames[i]}&bucket=${bucket}`);
            let blob = await res.blob();
            let url = URL.createObjectURL(blob);
            links.push(<li key={i}><a href={url} download={filenames[i]}>{filenames[i]}</a></li>);
        }
        await setFileLinks(links);
        setLoading(false);
    }, [hub] );


    useEffect(() => {
        // get hub from url
        var hub = params.hub;
        // search for hub in system, if hub does not exist, display 404 error or something
        setHub(hub);

        getFileLinks();
    }, [getFileLinks, params] );

    return (
        <div>
            <h1>Designer Page</h1>
            <p>Should be able to take uploads of the following types:</p>
            <ul>
                <li>Photos (.jpg, .png)</li>
                <li>Videos (.mov, .mp4)</li>
                <li>PDF (.pdf)</li>
                <li>Vectorworks (.dwg, .dxf, .dwf)</li>
                <li>AutoCAD (.dwg)</li>
            </ul>
            <form onSubmit={handleSubmit}>
                <h2>Upload file</h2>
                <input type="file" onChange={handleChange}/>
                <button type="submit">Upload</button>
            </form>
            <h2>Download file</h2>
            <ClipLoader loading={loading}></ClipLoader>
            <ul>
                {fileLinks}
            </ul>
        </div>
    )
}

export default Designer;