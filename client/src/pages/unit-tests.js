import React, {useState} from "react";
import axios from 'axios';

import ClipLoader from "react-spinners/ClipLoader";

const baseUrl = 'http://localhost:8000';

const UnitTests = () => {
    const [connectStatus, setConnectStatus] = useState("");
    const [connectLoading, setConnectLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");
    const [uploadLoading, setUploadLoading] = useState(false);
    const [downloadStatus, setDownloadStatus] = useState("");
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);

    async function serverConnect() {
        setConnectLoading(true);
        const url = `${baseUrl}/test`;
        try {
            axios.get(url).then((response) => {
                if (response == null || response.data == null) {
                    throw Error("Data not received properly");
                } else if (response.data.message === "Test successful") {
                    setConnectStatus(<p>&#10003;</p>);
                    setConnectLoading(false);
                } else {
                    throw Error(response);
                }
            })
        } catch (err) {
            setConnectStatus(<p>&#10005;</p>);
            console.log(err);
            setConnectLoading(false);
        }
    }

    async function fileUploadDelete() {
        setUploadLoading(true);
        setDeleteLoading(true);
        var url = `${baseUrl}/upload-file`;
        const data = new FormData();
        data.append('hub', "Unit Test");
        const headers = {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        };
        try {
            axios.post(url, data, headers).then((response) => {
                if (response == null || response.data == null) {
                    throw Error("Data not received properly");
                } else if (response.data.name === "unit-test-file.jpg") {
                    setUploadStatus(<p>&#10003;</p>);
                    setUploadLoading(false);
                    url = `${baseUrl}/delete-file?name=${response.data.name}&hub=unit-tests&bucket=unit-tests`; // delete created file
                    axios.get(url).then((response) => {
                        if (response.status === 200) {
                            setDeleteStatus(<p>&#10003;</p>);
                            setDeleteLoading(false);
                        } else {
                            setDeleteStatus(<p>&#10005;</p>);
                            setDeleteLoading(false);
                        }
                    });
                } else {
                    throw Error(response);
                }
            });
        } catch (err) {
            console.log(err);
            setUploadStatus(<p>&#10005;</p>);
            setUploadLoading(false);
            setDeleteStatus(<p>&#10005;</p>);
            setDeleteLoading(false);
        }
    }

    async function fileDownload() {
        setDownloadLoading(true);
        const url = `${baseUrl}/download-file?name=unit-test-download-file.jpg&hub=unit-tests&bucket=unit-tests`;
        try {
            let res = await fetch(url);
            let blob = await res.blob();
            let fileUrl = URL.createObjectURL(blob);
            if (fileUrl !== null) {
                setDownloadStatus(<p>&#10003;</p>);
                setDownloadLoading(false);
            } else {
                throw Error("File not downloaded properly");
            }
        } catch (err) {
            setDownloadStatus(<p>&#10005;</p>);
            console.log(err);
            setDownloadLoading(false);
        }
    }

    async function testAll() {
        serverConnect();
        fileUploadDelete();
        fileDownload();
    }

    return (
        <div>
            <button type="button" onClick={() => testAll()}>Test All</button>
            <table>
                <tr>
                    <td>Server Connect</td>
                    <td><button type="button" onClick={() => serverConnect()}>Test</button></td>
                    <td><ClipLoader loading={connectLoading}></ClipLoader></td>
                    <td>{!connectLoading && connectStatus}</td>
                </tr>
                <tr>
                    <td>File Upload</td>
                    <td><button type="button" onClick={() => fileUploadDelete()}>Test</button></td>
                    <td><ClipLoader loading={uploadLoading}></ClipLoader></td>
                    <td>{!uploadLoading && uploadStatus}</td>
                </tr>
                <tr>
                    <td>File Delete</td>
                    <td><button type="button" onClick={() => fileUploadDelete()}>Test</button></td>
                    <td><ClipLoader loading={deleteLoading}></ClipLoader></td>
                    <td>{!deleteLoading && deleteStatus}</td>
                </tr>
                <tr>
                    <td>File Download</td>
                    <td><button type="button" onClick={() => fileDownload()}>Test</button></td>
                    <td><ClipLoader loading={downloadLoading}></ClipLoader></td>
                    <td>{!downloadLoading && downloadStatus}</td>
                </tr>
            </table>
        </div>
    );
}

export default UnitTests;