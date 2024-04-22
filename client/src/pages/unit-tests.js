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
    const [createProfileStatus, setCreateProfileStatus] = useState("");
    const [createProfileLoading, setCreateProfileLoading] = useState(false);

    async function loadTestDB() {
        var url = `${baseUrl}/create-test`;
        await axios.post(url, JSON.stringify(formData));
    }

    async function deleteTestDB() {
        var url = `${baseUrl}/destroy-test`;
        await axios.post(url, JSON.stringify(formData));
    }

    // Not loading/deleting test database because that is (1) unnecessary and (2) incorrect for this test case
    async function serverConnect(testAllVal) {
        var url;
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
        }
    }


    // TODO: FIX BUG
    // loadTestDB() and deleteTestDB() should be asynchronous functions, and the code shoulds tall until they execute
    // This has not happened
    // In the interim, I wait one second every time I load the test databases or delete the test databases
    // Any unexpected test case failures may be as a result of this.
    async function fileUploadDelete(testAllVal) {
        var url;
        if(testAllVal === true) await loadTestDB();

        setUploadLoading(true);
        setDeleteLoading(true);
        if(testAllVal === true) await new Promise(resolve => setTimeout(resolve, 2000)); 

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
            if(testAllVal === true) {
                await deleteTestDB();
                await new Promise(resolve => setTimeout(resolve, 2000)); 
            }
        }
    }

    async function fileDownload(testAllVal) {
        var url;
        if(testAllVal === true) await loadTestDB();

        setDownloadLoading(true);
        if(testAllVal === true) await new Promise(resolve => setTimeout(resolve, 1000)); 

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
            if(testAllVal === true) {
                await deleteTestDB();
                await new Promise(resolve => setTimeout(resolve, 1000)); 
            }
        }
    }

    const [formData, setFormData] = useState({
        email: "dummyUser@gmail.com",
        password: "Pass1Word!",
        isTest: true
    });

    async function authenticateRealUser(testAllVal) {
        var url;
        if(testAllVal === true) await loadTestDB();

        setAuthenticateRealLoading(true);
        if(testAllVal === true) await new Promise(resolve => setTimeout(resolve, 1000)); 

        url = `${baseUrl}/authenticate`;

        // Converting form to json format
        try {
            var thisSessionID = "DUMMY";
            await axios.post(url, JSON.stringify(formData)).then((response) => {
                thisSessionID = response.data;
            });

            await axios.post(`${baseUrl}/loadProfile`, JSON.stringify({ "sessionID": thisSessionID, "isTest": true })).then((response) => {

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
        } finally {
            if(testAllVal === true) {
                await deleteTestDB();
                await new Promise(resolve => setTimeout(resolve, 1000)); 
            }
        }
    }

    const [fakeFormData, setfakeFormData] = useState({
        email: "fakeUser@gmail.com",
        password: "Pass1Word!",
        isTest: true
    });

    async function authenticateFakeUser(testAllVal) {
        var url;
        if(testAllVal === true) await loadTestDB();

        setAuthenticateFakeLoading(true);
        if(testAllVal === true) await new Promise(resolve => setTimeout(resolve, 1000)); 

        url = `${baseUrl}/authenticate`;

        // Converting form to json format
        try {
            var thisSessionID = "DUMMY";
            await axios.post(url, JSON.stringify(fakeFormData)).then((response) => {
                thisSessionID = response.data;
            });

            await axios.post(`${baseUrl}/loadProfile`, JSON.stringify({ "sessionID": thisSessionID, "isTest": true })).then((response) => {

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
        } finally {
            if(testAllVal === true) { 
                await deleteTestDB();
                await new Promise(resolve => setTimeout(resolve, 1000));
            } 
        }
    }

    const [editFormData, setEditFormData] = useState({
        email: "editDummyUser@gmail.com",
        password: "Pass1Word!",
        isTest: true
    });

    async function editProfile(testAllVal) {
        var url;
        if(testAllVal === true) await loadTestDB();
        
        setEditProfileLoading(true);
        if(testAllVal === true) await new Promise(resolve => setTimeout(resolve, 1000)); 

        url = `${baseUrl}/updateProfile`;

        // Converting form to json format
        try {
            var thisSessionID = "DUMMY";
            await axios.post(`${baseUrl}/authenticate`, JSON.stringify(editFormData)).then((response) => {
                thisSessionID = response.data;
            });

            // Getting current time
            const date = Date();
            // console.log(date);
            
            const newData = {
                name: "ET NAME", bio: date, phoneNumber: "ET PHONE ", pronouns: "ET PRONOUNS",
                email: "ET EMAIL", roles: "ET EMAIL", sessionID: thisSessionID, isTest: true
            };

            await axios.post(url, JSON.stringify(newData)).then((response) => {
                const editResponse = response;
            });

            await axios.post(`${baseUrl}/loadProfile`, JSON.stringify({ "sessionID": thisSessionID, "isTest": true })).then((response) => {

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
        } finally {
            if(testAllVal === true) {
                await deleteTestDB();
                await new Promise(resolve => setTimeout(resolve, 1000)); 
            }
        }
    }

    const [signUpFormData, setSignUpFormData] = useState({
        fullName: "EXAMPLE NAME",
        email: "createUser@gmail.com",
        password: "Val1d.Passw0rd",
        verifyPassword: "Val1d.Passw0rd",
        isTest: true
      });

    async function createProfile(testAllVal) {
        var url;
        if(testAllVal === true) await loadTestDB();
        
        setCreateProfileLoading(true);
        if(testAllVal === true) await new Promise(resolve => setTimeout(resolve, 1000)); 

        url = `${baseUrl}/register`;

        // Converting form to json format
        try {
            await axios.post(url, JSON.stringify(signUpFormData)).then((response) => {
                if (response.status === 201) { // If the status is 201 (Created)
                    setCreateProfileStatus(<p>&#10003;</p>);
                    setCreateProfileLoading(false);
                } else { 
                    setCreateProfileStatus(<p>&#10005;</p>);
                    setCreateProfileLoading(false);
                    throw Error("Did not successfully create user");
                }
              });

        } catch (err) {
            setCreateProfileStatus(<p>&#10005;</p>);
            console.log(err);
            setCreateProfileLoading(false);
        } finally {
            // TODO: Reinsert "FINALLY" to delete db
            if (testAllVal === true) {
                await deleteTestDB();
                await new Promise(resolve => setTimeout(resolve, 1000)); 
            }
        }
    }

    async function testAll() {

        // Setting all tests to loading
        setConnectLoading(true); setConnectStatus("");
        setUploadLoading(true); setUploadStatus("");
        setDeleteLoading(true); setDeleteStatus("");
        setDownloadLoading(true); setDownloadStatus("");
        setAuthenticateRealLoading(true); setAuthenticateRealStatus("");
        setAuthenticateFakeLoading(true); setAuthenticateFakeStatus("");
        setEditProfileLoading(true); setEditProfileStatus("");
        setCreateProfileLoading(true); setCreateProfileStatus("");

        // Loading Test Data
        await axios.post(`${baseUrl}/create-test`, JSON.stringify(formData));
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        
        // Running Tests
        await serverConnect();
        await fileUploadDelete(false);
        await fileDownload(false);
        await authenticateRealUser(false);
        await authenticateFakeUser(false);
        await editProfile(false);
        await createProfile(false);

        // Destroying Test Data
        await axios.post(`${baseUrl}/destroy-test`, JSON.stringify(formData)); 
        await new Promise(resolve => setTimeout(resolve, 1000)); 
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
                    <td><button type="button" onClick={() => fileUploadDelete(true)}>Test</button></td>
                    <td><ClipLoader loading={uploadLoading}></ClipLoader></td>
                    <td>{!uploadLoading && uploadStatus}</td>
                </tr>
                <tr>
                    <td>Test 2b: File Upload and Delete (Delete)</td>
                    <td><button type="button" onClick={() => fileUploadDelete(true)}>Test</button></td>
                    <td><ClipLoader loading={deleteLoading}></ClipLoader></td>
                    <td>{!deleteLoading && deleteStatus}</td>
                </tr>
                <tr>
                    <td>Test 3: File Download</td>
                    <td><button type="button" onClick={() => fileDownload(true)}>Test</button></td>
                    <td><ClipLoader loading={downloadLoading}></ClipLoader></td>
                    <td>{!downloadLoading && downloadStatus}</td>
                </tr>
                <tr>
                    <td>Test 4: Authenticate Real User</td>
                    <td><button type="button" onClick={() => authenticateRealUser(true)}>Test</button></td>
                    <td><ClipLoader loading={authenticateRealLoading}></ClipLoader></td>
                    <td>{!authenticateRealLoading && authenticateRealStatus}</td>
                </tr>
                <tr>
                    <td>Test 5: Authenticate Fake User</td>
                    <td><button type="button" onClick={() => authenticateFakeUser(true)}>Test</button></td>
                    <td><ClipLoader loading={authenticateFakeLoading}></ClipLoader></td>
                    <td>{!authenticateFakeLoading && authenticateFakeStatus}</td>
                </tr>
                <tr>
                    <td>Test 6: Edit Profile</td>
                    <td><button type="button" onClick={() => editProfile(true)}>Test</button></td>
                    <td><ClipLoader loading={editProfileLoading}></ClipLoader></td>
                    <td>{!editProfileLoading && editProfileStatus}</td>
                </tr>
                <tr>
                    <td>Test 7: Create Profile</td>
                    <td><button type="button" onClick={() => createProfile(true)}>Test</button></td>
                    <td><ClipLoader loading={createProfileLoading}></ClipLoader></td>
                    <td>{!createProfileLoading && createProfileStatus}</td>
                </tr>
            </table>
        </div>
        </div>
    );
}

export default UnitTests;