import React, {useState, useEffect, useCallback} from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

const baseUrl = 'http://localhost:8000';

const Resources = () => {
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
        data.append('hub', hub);
        data.append('bucket', 'resources');
        const headers = {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        };
        axios.post(url, data, headers).then((response) => {
            // console.log(response.data);
            alert(`Successfully uploaded ${response.data.name}`);
            getFileLinks();
        });
    }

    const getFileLinks = useCallback(async () => {
        async function deleteFile(name) { // function for deleting files displayed
            const bucket = "resources";
            try {
                let res = await fetch(`http://localhost:8000/delete-file?name=${name}&hub=${hub}&bucket=${bucket}`);
                res = await res.json();
                if (res.status === 200) alert("File " + name + " deleted");
                else throw res;
                getFileLinks();
            } catch (err) {
                console.log(err);
                alert("Something went wrong");
            }
        };

        setLoading(true);
        const bucket = "resources";

        let filenames = await fetch(`${baseUrl}/get-filenames?hub=${hub}&bucket=${bucket}`);
        filenames = await filenames.json();

        var links = [];
        for (let i = 0; i < filenames.length; i++) {
            let res = await fetch(`${baseUrl}/download-file?name=${filenames[i]}&hub=${hub}&bucket=${bucket}`);
            let blob = await res.blob();
            let url = URL.createObjectURL(blob);
            links.push(
            <tr key={i}>
                <td><a href={url} download={filenames[i]}>{filenames[i]}</a></td>
                <td><button type="button" onClick={() => deleteFile(filenames[i])}>Delete</button></td>
            </tr>
            );
        }
        await setFileLinks(links);
        setLoading(false);
    }, [hub] );

    useEffect(() => {
        var hub = params.hub;
        // search for hub in system, if hub does not exist, display 404 error or something TODO
        setHub(hub);

        getFileLinks();
    }, [getFileLinks, params] );

    return (
        <div>
            <h1>Resources Page</h1>
            <p>Should be able to take uploads of the following types:</p>
            <ul>
                <li>Photos (.jpg, .png)</li>
                <li>Videos (.mov, .mp4)</li>
                <li>PDF (.pdf)</li>
            </ul>
            <form onSubmit={handleSubmit}>
                <h2>Upload file</h2>
                <input type="file" onChange={handleChange}/>
                <button type="submit">Upload</button>
            </form>
            <h2>Download file</h2>
            <ClipLoader loading={loading}></ClipLoader>
            <table>
                {!loading && fileLinks}
            </table>
        </div>
    )
}

export default Resources;