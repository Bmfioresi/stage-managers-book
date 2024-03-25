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
    const [authenticateStatus, setAuthenticateStatus] = useState("");
    const [authenticateLoading, setAuthenticateLoading] = useState(false);

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

    const [formData, setFormData] = useState({
        email: "example@gmail.com",
        password: "Pass1Word",
    });

    async function authenticateUser() {
        setAuthenticateLoading(true);
        const url = `${baseUrl}/authenticate`;

        // Converting form to json format
        try {
            var thisSessionID = "DUMMY";
            await axios.post(url, JSON.stringify(formData)).then((response) => {
                thisSessionID = response.data;
            });
            await axios.post(`${baseUrl}/loadProfile`, JSON.stringify({ "sessionID": thisSessionID })).then((response) => {

                console.log("BACK TO PROFILE PAGE");
                console.log(response);
                console.log(response.data);

                if (response.data.uid == "101" && response.data.name == "DUMMY USER" && response.data.phone_number == "DUMMY PHONE") {
                    setAuthenticateStatus(<p>&#10003;</p>);
                    setAuthenticateLoading(false);
                } else {
                    setAuthenticateStatus(<p>&#10005;</p>);
                    setAuthenticateLoading(false);
                    throw Error("Did not find proper user");
                }
            });
        } catch (err) {
            setAuthenticateStatus(<p>&#10005;</p>);
            console.log(err);
            setAuthenticateLoading(false);
        }
    }

    async function testAll() {
        serverConnect();
        fileUploadDelete();
        fileDownload();
        authenticateUser();
    }

    return (
        <div>
            <button type="button" onClick={() => testAll()}>Test All</button>
            <table>
                <tr>
                    <td>******************************** Test 1: Server Connect</td>
                    <td><button type="button" onClick={() => serverConnect()}>Test</button></td>
                    <td><ClipLoader loading={connectLoading}></ClipLoader></td>
                    <td>{!connectLoading && connectStatus}</td>
                </tr>
                <tr>
                    <td>******************************** Test 2: File Upload</td>
                    <td><button type="button" onClick={() => fileUploadDelete()}>Test</button></td>
                    <td><ClipLoader loading={uploadLoading}></ClipLoader></td>
                    <td>{!uploadLoading && uploadStatus}</td>
                </tr>
                <tr>
                    <td>******************************** Test 3: File Delete</td>
                    <td><button type="button" onClick={() => fileUploadDelete()}>Test</button></td>
                    <td><ClipLoader loading={deleteLoading}></ClipLoader></td>
                    <td>{!deleteLoading && deleteStatus}</td>
                </tr>
                <tr>
                    <td>******************************** Test 4: File Download</td>
                    <td><button type="button" onClick={() => fileDownload()}>Test</button></td>
                    <td><ClipLoader loading={downloadLoading}></ClipLoader></td>
                    <td>{!downloadLoading && downloadStatus}</td>
                </tr>
                <tr>
                    <td>******************************** Test 5: AuthenticateUser</td>
                    <td><button type="button" onClick={() => authenticateUser()}>Test</button></td>
                    <td><ClipLoader loading={authenticateLoading}></ClipLoader></td>
                    <td>{!authenticateLoading && authenticateStatus}</td>
                </tr>
            </table>
        </div>
    );
}

export default UnitTests;