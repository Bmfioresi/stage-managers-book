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

app.post('/upload-image', async (req, res) => {
    const file = req.files.file;
    const name = file.name;
    const type = file.type;
    if (type !== 'image/jpeg' && type !== 'image/png') {
        res.json({message: `Invalid file format ${type}`});
    } else {
        const stream = fs.createReadStream(file.path);
        const ret = await gridfsHelpers.uploadFile(name, stream, 'images');
        res.json(ret);
    }
});

app.get('/display-image/:name', async (req, res) => {
    const name = req.params.name;
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(name)[1];
    if (ext !== 'jpg' && ext !== 'png') {
        res.json({message: `Invalid file format .${ext}`});
    } else {
        const ret = await gridfsHelpers.downloadFile(name, 'images');
        ret.pipe(res);
    }
});

app.get('/gridfs-test', async (req, res) => {
    const test = await gridfsHelpers.uploadFile({name:"test"});
    res.json(test);
});

app.get('/gridfs-download-test', async (req, res) => {
    const test = await gridfsHelpers.downloadFile("test");
    res.json(test);
});

app.post('/hubs', async (req, res) => {
    console.log("waka");
    res.json({message: "Hubs"});
});

app.post('/authenticate', async (req, res) => {
    console.log("HERE1");
    const fields = JSON.parse(Object.keys(req.fields)[0]);

    console.log(fields.email);
    console.log(fields.password);
    const userId = await mongoHelpers.authenticateUser(fields.email, fields.password); 
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

    // TODO: Fix NoSQL Injection Concern
    // TODO: Handle errors
    const profileData = await mongoHelpers.loadProfile(fields.uid); 
    console.log(profileData);
    console.log("ABOUT TO RETURN");
    res.json(profileData);
});

app.listen(8000, () => {
    console.log('Server is running on port 8000.');
});