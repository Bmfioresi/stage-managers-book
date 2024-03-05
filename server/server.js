const express = require('express');
const cors = require('cors');
const formidable = require('express-formidable');
const fs = require('fs');

const mongoHelpers = require('./mongo-helpers');
const gridfsHelpers = require('./gridfs-helpers');

const app = express();

app.use(cors());
app.use(express.json());
app.use(formidable());

app.get('/test', (req, res) => {
    res.json({message: "Test successful"});
});

// uploads attached file to database in the attached bucket
// use the following code block to format attached data
    // const data = new FormData();
    // data.append('file', fileData);
    // data.append('bucket', "bucketName");
    // data.append('hub', "hubName");
    // const headers = {
    //     headers: {
    //         'Content-Type': `multipart/form-data; boundary=${data._boundary}`
    //     }
    // };
app.post('/upload-file', async (req, res) => {
    const file = req.files.file;
    const name = file.name;
    const bucket = req.fields.bucket;
    const hub = req.fields.hub;
    const stream = fs.createReadStream(file.path);
    const ret = await gridfsHelpers.uploadFile(name, stream, hub + '-' + bucket);
    if (ret == null) res.json({status: 500});
    else res.json(ret);
});

// download file stream of file with give nname
// to access file data in the front end,
// use .blob() and URL.createObjectURL(blob)
// this will return a URL to use with <a href={url}>filename</a>
app.get('/download-file', async (req, res) => {
    const name = req.query.name;
    const bucket = req.query.bucket;
    // TODO - check for proper file extension, input sanitization, etc
    // var re = /(?:\.([^.]+))?$/;
    // var ext = re.exec(name)[1];
    const ret = await gridfsHelpers.downloadFile(name, bucket);
    if (ret == null) res.json({status: 500});
    else if (ret.status == 404) res.json(ret);
    else ret.pipe(res);
});

// uploads attached image to database in the images bucket
app.post('/upload-image', async (req, res) => {
    const file = req.files.file;
    const name = file.name;
    const type = file.type;
    if (type !== 'image/jpeg' && type !== 'image/png') {
        res.json({message: `Invalid file format ${type}`});
    } else {
        const stream = fs.createReadStream(file.path);
        const ret = await gridfsHelpers.uploadFile(name, stream, 'images');
        if (ret == null) res.json({status: 500});
        else res.json(ret);
    }
});

// returns file stream of image with given name
// to access image data in the front end, 
//  use .blob() and URL.createObjectURL(blob)
// this will return a URL to use with <img src={url} />
app.get('/display-image', async (req, res) => {
    const name = req.query.name;
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(name)[1];
    if (ext !== 'jpg' && ext !== 'png') {
        res.json({message: `Invalid file format .${ext}`});
    } else {
        const ret = await gridfsHelpers.downloadFile(name, 'images');
        if (ret == {status: 404}) res.json(ret);
        else if (ret == null) res.json({status: 500});
        else ret.pipe(res);
    }
});

// returns array of strings with the filenames in a bucket
// currently just returns images, but can be modified to check other buckets
// these filenames can be piped to /display-image/:name to display on a page
app.get('/get-filenames', async (req, res) => {
    const bucket = req.query.bucket;
    const ret = await gridfsHelpers.getFilenames(bucket);
    if (ret == null) res.json({status: 500});
    else res.json(ret);
});

// returns a list of hub info to load into buttons in hubs.js
app.post('/hubs', async (req, res) => {
    const fields = JSON.parse(Object.keys(req.fields)[0]);
    console.log(fields.uid);
    const hids = await mongoHelpers.getHids(fields.uid)
    const hubInfo = await mongoHelpers.getHubInfo(hids);
    res.json(hubInfo);
});

// returns a single collection of hub info to load into a page hub-individual.js
app.post('/hub-individual', async (req, res) => {
    const fields = JSON.parse(Object.keys(req.fields)[0]);
    console.log(fields.hid);
    const hubInfo = await mongoHelpers.getIndividualHubInfo(fields.hid);
    res.json(hubInfo);
});

app.post('/authenticate', async (req, res) => {
    console.log("HERE1");
    const fields = JSON.parse(Object.keys(req.fields)[0]);

    console.log(fields.email);
    console.log(fields.password);

    //TODO: Sanitize input
    const userId = await mongoHelpers.authenticateUser(fields.email, fields.password); 
    if (userId==null) {
        userId = {'uid': '-1'};
    } 
    res.json(userId);
});

app.post('/createProfile', async (req, res) => {
    console.log("Inside of Create Profile pathway");
    const fields = JSON.parse(Object.keys(req.fields)[0]);

    console.log(fields.email);

    //TODO: Sanitize input
    //TODO: Handle Errors
    const userId = await mongoHelpers.createProfile(fields); 
    if (userId==null) {
        userId = {'uid': '-1'};
    } 
    res.json(userId);
});

app.post('/loadProfile', async (req, res) => {
    console.log("HERE1");
    console.log(req);
    const fields = JSON.parse(Object.keys(req.fields)[0]);
    console.log(fields);

    //TODO: Sanitize input
    // TODO: Handle errors
    const profileData = await mongoHelpers.loadProfile(fields.uid); 
    console.log(profileData);
    console.log("ABOUT TO RETURN");
    res.json(profileData);
});

app.listen(8000, () => {
    console.log('Server is running on port 8000.');
});