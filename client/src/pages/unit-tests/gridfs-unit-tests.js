import React, {useState} from "react";
import axios from 'axios';

import ClipLoader from "react-spinners/ClipLoader";

const baseUrl = 'http://localhost:8000';

const [uploadStatus, setUploadStatus] = useState("");
const [downloadStatus, setDownloadStatus] = useState("");
const [deleteStatus, setDeleteStatus] = useState("");
const [dropStatus, setDropStatus] = useState("");

async function fileUpload() {
    const url = `${baseUrl}/upload-file`;
    const data = new FormData();
    data.append('hub', 'Unit Test');
    const headers = {
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`
        }
    };
    try {
        axios.post(url, data, headers).then((response) => {
            if (response == null || response.data == null) {
                throw "Data not received properly";
            } else if (response.data.name == "unit-test-file.jpg") {
                setUploadStatus('success');
            } else {
                throw response;
            }
        });
    } catch (err) {
        setUploadStatus('failure');
        console.log(err);
    }
}

async function gridfsUnitTests() {
    return (
        <div>
            <button type="button" onClick={() => testAll()}>Test All</button>
            <table>
                <tr>
                    <td>File Upload</td>
                    <td><button type="button" onClick={() => fileUpload()}>Test</button></td>
                    <td>{showResult()}</td>
                </tr>
                <tr>
                    <td>File Download</td>
                    <td><button type="button" onClick={() => fileDownload()}>Test</button></td>
                    <td>Result</td>
                </tr>
                <tr>
                    <td>File Delete</td>
                    <td><button type="button" onClick={() => fileDelete()}>Test</button></td>
                    <td>Result</td>
                </tr>
                <tr>
                    <td>Bucket Drop</td>
                    <td><button type="button" onClick={() => bucketDelete()}>Test</button></td>
                    <td>Result</td>
                </tr>
            </table>
        </div>
    );
}
            