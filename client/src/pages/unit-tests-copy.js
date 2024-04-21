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
    const [authenticateRealStatus, setAuthenticateRealStatus] = useState("");
    const [authenticateRealLoading, setAuthenticateRealLoading] = useState(false);
    const [authenticateFakeStatus, setAuthenticateFakeStatus] = useState("");
    const [authenticateFakeLoading, setAuthenticateFakeLoading] = useState(false);
    const [editProfileStatus, setEditProfileStatus] = useState("");
    const [editProfileLoading, setEditProfileLoading] = useState(false);

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
            // check for file (in case of accidental upload/error) and delete it to avoid errors
            let names = await axios.get(`${baseUrl}/get-filenames?hub=auto-test&bucket=auto-test`);
            //console.log(names);
            for (let i = 0; i < names.data.length; i++) {
                //console.log(names.data[i]);
                if (names.data[i] === "unit-test-file.jpg") {
                    //console.log("deleting file");
                    await axios.get(`${baseUrl}/delete-file?name=unit-test-file.jpg&hub=auto-test&bucket=auto-test`);
                }
            }
            axios.post(url, data, headers).then((response) => {
                if (response == null || response.data == null) {
                    throw Error("Data not received properly");
                } else if (response.data.name === "unit-test-file.jpg") {
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
        }
    }

    async function fileDownload() {
        setDownloadLoading(true);
        const url = `${baseUrl}/download-file?name=unit-test-download-file.jpg&hub=auto-test&bucket=auto-test`;
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
        email: "dummyUser@gmail.com",
        password: "Pass1Word!",
    });

    async function authenticateRealUser() {
        setAuthenticateRealLoading(true);
        const url = `${baseUrl}/authenticate`;

        // Converting form to json format
        try {
            var thisSessionID = "DUMMY";
            await axios.post(url, JSON.stringify(formData)).then((response) => {
                thisSessionID = response.data;
            });

            await axios.post(`${baseUrl}/loadProfile`, JSON.stringify({ "sessionID": thisSessionID })).then((response) => {

                // Expected behavior
                if (response.data.uid == 12110023 && response.data.name == "Test User" && response.data.phone_number == "dummyPhone"
                    && response.data.bio == "dummyBio" && response.data.roles == "dummyRoles" && response.data.pronouns == "dummyPronouns") {
                    setAuthenticateRealStatus(<p>&#10003;</p>);
                    setAuthenticateRealLoading(false);
                } else { // Unexpected behavior
                    setAuthenticateRealStatus(<p>&#10005;</p>);
                    setAuthenticateRealLoading(false);
                    throw Error("Did not find proper user");
                }
            });
        } catch (err) {
            setAuthenticateRealStatus(<p>&#10005;</p>);
            console.log(err);
            setAuthenticateRealLoading(false);
        }
    }

    const [fakeFormData, setfakeFormData] = useState({
        email: "fakeUser@gmail.com",
        password: "Pass1Word!",
    });

    async function authenticateFakeUser() {
        setAuthenticateFakeLoading(true);
        const url = `${baseUrl}/authenticate`;

        // Converting form to json format
        try {
            var thisSessionID = "DUMMY";
            await axios.post(url, JSON.stringify(fakeFormData)).then((response) => {
                thisSessionID = response.data;
            });

            await axios.post(`${baseUrl}/loadProfile`, JSON.stringify({ "sessionID": thisSessionID })).then((response) => {

                if (thisSessionID.status == 401) {
                    setAuthenticateFakeStatus(<p>&#10003;</p>);
                    setAuthenticateFakeLoading(false);
                } else {
                    setAuthenticateFakeStatus(<p>&#10005;</p>);
                    setAuthenticateFakeLoading(false);
                    throw Error("Did not throw proper error message");
                }
            });
        } catch (err) {
            setAuthenticateFakeStatus(<p>&#10005;</p>);
            console.log(err);
            setAuthenticateFakeLoading(false);
        }
    }

    const [editFormData, setEditFormData] = useState({
        email: "editDummyUser@gmail.com",
        password: "Pass1Word!",
    });

    async function editProfile() {
        setEditProfileLoading(true);
        const url = `${baseUrl}/updateProfile`;

        // Converting form to json format
        try {
            var thisSessionID = "DUMMY";
            await axios.post(`${baseUrl}/authenticate`, JSON.stringify(editFormData)).then((response) => {
                thisSessionID = response.data;
            });

            console.log("THIS SESSION ID");
            console.log(thisSessionID);

            // Getting current time
            const date = Date();
            // console.log(date);
            // const currTimeStr = date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();

            const newData = {
                name: "ET NAME", bio: date, phoneNumber: "ET PHONE ", pronouns: "ET PRONOUNS",
                email: "ET EMAIL", roles: "ET EMAIL", sessionID: thisSessionID
            };
            console.log(newData);

            await axios.post(url, JSON.stringify(newData)).then((response) => {
                const editResponse = response;
                console.log("EDIT RESPONSE");
                console.log(editResponse);
            });

            await axios.post(`${baseUrl}/loadProfile`, JSON.stringify({ "sessionID": thisSessionID })).then((response) => {

                console.log("PROFILE RESPONSE");
                console.log(response)
                if (response.data.bio == date) {
                    setEditProfileStatus(<p>&#10003;</p>);
                    setEditProfileLoading(false);
                } else {
                    setEditProfileStatus(<p>&#10005;</p>);
                    setEditProfileLoading(false);
                    throw Error("Did not throw proper error message");
                }
            });

        } catch (err) {
            setEditProfileStatus(<p>&#10005;</p>);
            console.log(err);
            setEditProfileLoading(false);
        }
    }


    async function testAll() {
        serverConnect();
        fileUploadDelete();
        fileDownload();
        authenticateRealUser();
        authenticateFakeUser();
        editProfile();
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
                    <td>Test 4: Authenticate Real User</td>
                    <td><button type="button" onClick={() => authenticateRealUser()}>Test</button></td>
                    <td><ClipLoader loading={authenticateRealLoading}></ClipLoader></td>
                    <td>{!authenticateRealLoading && authenticateRealStatus}</td>
                </tr>
                <tr>
                    <td>Test 5: Authenticate Fake User</td>
                    <td><button type="button" onClick={() => authenticateFakeUser()}>Test</button></td>
                    <td><ClipLoader loading={authenticateFakeLoading}></ClipLoader></td>
                    <td>{!authenticateFakeLoading && authenticateFakeStatus}</td>
                </tr>
                <tr>
                    <td>Test 6: Edit Profile</td>
                    <td><button type="button" onClick={() => editProfile()}>Test</button></td>
                    <td><ClipLoader loading={editProfileLoading}></ClipLoader></td>
                    <td>{!editProfileLoading && editProfileStatus}</td>
                </tr>
            </table>
        </div>
        </div>
    );
}

export default UnitTests;