import React, {useState} from "react";
import axios from 'axios';
import '../css/pages.css';

import ClipLoader from "react-spinners/ClipLoader";

const baseUrl = 'http://localhost:8000';

//TRYING TO CHANGE STUFF FOR auto-test DB, CHECK LINES 57, 63, 72, 97

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

    async function serverConnect(testAllVal) {
        var url;
        if(testAllVal === true) {
            url = `${baseUrl}/create-test`;
            await axios.post(url, JSON.stringify(formData));
        }
        setConnectLoading(true);
        url = `${baseUrl}/test`;
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
        } finally {
            if(testAllVal === false) {
                url = `${baseUrl}/destroy-test`;
                await axios.post(url, JSON.stringify(formData)).then((response) => {
                // console.log("destroyed (auto-test)");
                });
            }
        }
    }

    async function fileUploadDelete(testAllVal) {
        var url;
        if(testAllVal === true) {
            url = `${baseUrl}/create-test`;
            await axios.post(url, JSON.stringify(formData));
        }
        setUploadLoading(true);
        setDeleteLoading(true);
        url = `${baseUrl}/upload-file`;
        const data = new FormData();
        data.append('hub', "Unit Test");
        const headers = {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        };
        try {
            // check for file (in case of accidental upload/error) and delete it to avoid errors
            let names = await axios.get(`${baseUrl}/get-filenames?hub=auto-test&bucket=auto-test`);
            //console.log(names);
            for (let i = 0; i < names.data.length; i++) {
                //console.log(names.data[i]);
                if (names.data[i] === "auto-test-file.jpg") {
                    //console.log("deleting file");
                    await axios.get(`${baseUrl}/delete-file?name=auto-test-file.jpg&hub=auto-test&bucket=auto-test`);
                }
            }
            await axios.post(url, data, headers).then((response) => {
                if (response == null || response.data == null) {
                    throw Error("Data not received properly");
                } else if (response.data.name === "auto-test-file.jpg") {
                    setUploadStatus(<p>&#10003;</p>);
                    setUploadLoading(false);
                    url = `${baseUrl}/delete-file?name=${response.data.name}&hub=auto-test&bucket=auto-test`; // delete created file
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
        } finally {
            if(testAllVal === false) {
                url = `${baseUrl}/destroy-test`;
                await axios.post(url, JSON.stringify(formData)).then((response) => {
                // console.log("destroyed (auto-test)");
                });
            }
        }
    }

    async function fileDownload(testAllVal) {
        var url;
        if(testAllVal === true) {
            url = `${baseUrl}/create-test`;
            await axios.post(url, JSON.stringify(formData));
        }
        setDownloadLoading(true);
        url = `${baseUrl}/download-file?name=auto-test-download-file.jpg&hub=auto-test&bucket=auto-test`;
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
        } finally {
            if(testAllVal === false) {
                url = `${baseUrl}/destroy-test`;
                await axios.post(url, JSON.stringify(formData)).then((response) => {
                // console.log("destroyed (auto-test)");
                });
            }
        }
    }

    const [formData, setFormData] = useState({
        email: "example@gmail.com",
        password: "Pass1Word",
    });

    async function authenticateUser(testAllVal) {
        var url;
        if(testAllVal === true) {
            url = `${baseUrl}/create-test`;
            await axios.post(url, JSON.stringify(formData));
        }
        setAuthenticateLoading(true);
        url = `${baseUrl}/authenticate`;

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
        } finally {
            if(testAll === false) {
                url = `${baseUrl}/destroy-test`;
                await axios.post(url, JSON.stringify(formData)); 
            }
        }
    }

    async function testAll() {
        await serverConnect(true);
        await fileUploadDelete(true);
        await fileDownload(true);
        // await authenticateUser();
    }

    return (
        <div className="right-side">
        <div>
            <button type="button" onClick={() => testAll()}>Test All</button>
            <table>
                <tr>
                    <td>Test 1: Server Connect</td>
                    <td><button type="button" onClick={() => serverConnect()}>Test</button></td>
                    <td><ClipLoader loading={connectLoading}></ClipLoader></td>
                    <td>{!connectLoading && connectStatus}</td>
                </tr>
                <tr>
                    <td>Test 2a: File Upload and Delete (Upload)</td>
                    <td><button type="button" onClick={() => fileUploadDelete()}>Test</button></td>
                    <td><ClipLoader loading={uploadLoading}></ClipLoader></td>
                    <td>{!uploadLoading && uploadStatus}</td>
                </tr>
                <tr>
                    <td>Test 2b: File Upload and Delete (Delete)</td>
                    <td><button type="button" onClick={() => fileUploadDelete()}>Test</button></td>
                    <td><ClipLoader loading={deleteLoading}></ClipLoader></td>
                    <td>{!deleteLoading && deleteStatus}</td>
                </tr>
                <tr>
                    <td>Test 3: File Download</td>
                    <td><button type="button" onClick={() => fileDownload()}>Test</button></td>
                    <td><ClipLoader loading={downloadLoading}></ClipLoader></td>
                    <td>{!downloadLoading && downloadStatus}</td>
                </tr>
                <tr>
                    <td>Test 4: AuthenticateUser</td>
                    <td><button type="button" onClick={() => authenticateUser()}>Test</button></td>
                    <td><ClipLoader loading={authenticateLoading}></ClipLoader></td>
                    <td>{!authenticateLoading && authenticateStatus}</td>
                </tr>
            </table>
        </div>
        </div>
    );
}

export default UnitTests;