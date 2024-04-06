import React, {useState, useEffect, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import '../css/pages.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { NavLink } from "../components/Navbar/elements";


const baseUrl = 'http://localhost:8000';
const bucket = "scripts";

const Scripts = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [hub, setHub] = useState();
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
        
        // check for proper file extension
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(file.name)[1];
        if (ext !== "pdf") {
            alert(`Invalid file format .${ext}`);
            return;
        }

        const url = `${baseUrl}/upload-file`;
        const data = new FormData();
        data.append('file', file);
        data.append('hub', hub);
        data.append('bucket', bucket);
        const headers = {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        };
        axios.post(url, data, headers).then((response) => {
            try {
                // console.log(response.data);
                if (response.data.status == 500) throw("Something went wrong");
                if (response.data.status == 413) throw("File size is too large");
                alert(`Successfully uploaded ${response.data.name}`);
                getFileLinks();
            } catch (err) {
                //console.log(err);
                alert(err);
            }
        });
    }

    const getFileLinks = useCallback(async () => {
        /*
        async function updateFile(name) { // function for updating files displayed
            // TODO
        }
        */
        async function deleteFile(name) { // function for deleting files displayed
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

        let filenames = await fetch(`${baseUrl}/get-filenames?hub=${hub}&bucket=${bucket}`);
        filenames = await filenames.json();

        var links = [];
        for (let i = 0; i < filenames.length; i++) {
            let res = await fetch(`${baseUrl}/download-file?name=${filenames[i]}&hub=${hub}&bucket=${bucket}`);
            let blob = await res.blob();
            let pdfblob = new Blob([blob], {type: "application/pdf"});
            let url = URL.createObjectURL(pdfblob);
            links.push(
            <tr key={i}>
                <td><button type="button" onClick={() => setPdfUrl(url)}>{filenames[i]}</button></td>
                {/* <td><button type="button" onClick={() => updateFile(filenames[i])}>Update</button></td> */}
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
        <div className='right-side'>
        <div>
            <NavLink to={`/hubs/${hub}`}>Back to hub</NavLink>
            <h1>Script Viewer</h1>
            <form onSubmit={handleSubmit}>
                <h2>Upload Script PDF</h2>
                <input type="file" onChange={handleChange}/>
                <button type="submit">Upload</button>
            </form>
            <h2>Select Script to Display</h2>
            <ClipLoader loading={loading}></ClipLoader>
            <table>
                <tbody>
                    {!loading && fileLinks}
                </tbody>
            </table>
        </div>
        <div style={styles.container}>
            <iframe
                title="pdf-viewer"
                src={pdfUrl}
                width="100%"
                height="600px"
                style={styles.iframe}
            />
        </div>
        </div>
    );
};

const styles = {
    container: {
        width: '80%',
        margin: 'auto',
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh', // Setting minimum height for the container
    },
    iframe: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '100%',
        maxHeight: '600px',
    },
};

export default Scripts;
