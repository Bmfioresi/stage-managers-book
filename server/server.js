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

app.post('/upload-file', async (req, res) => {
    const file = req.files.file;
    const name = file.name;
    // const type = file.type;
    const stream = fs.createReadStream(file.path);
    const ret = await gridfsHelpers.uploadFile(name, stream, 'test');
    if (ret == null) res.json({status: 500});
    else res.json(ret);
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
app.get('/display-image/:name', async (req, res) => {
    const name = req.params.name;
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
app.get('/gridfs-get-filenames', async (req, res) => {
    const ret = await gridfsHelpers.getFilenames("images");
    if (ret == null) res.json({status: 500});
    else res.json(ret);
});

app.post('/hubs', async (req, res) => {
    const fields = JSON.parse(Object.keys(req.fields)[0]);
    console.log(fields.uid);
    const hids = await mongoHelpers.getHids(fields.uid)
    const hubInfo = await mongoHelpers.getHubInfo(hids);
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