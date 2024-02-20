const express = require('express');
const cors = require('cors');
const formidable = require('express-formidable');

const helpers = require('./drive-helpers');
const mongoHelpers = require('./mongo-helpers');
const gridfsHelpers = require('./gridfs-helpers');

const app = express();

app.use(cors());
app.use(express.json());
app.use(formidable());

app.get('/test', (req, res) => {
    res.json({message: "Test successful"});
});

app.get('/search', async (req, res) => {
    const files = await helpers.searchFile();
    res.json({files: files});
});

app.get('/download-image', async (req, res) => {
    // does not work, probably going to delete later
    // search file and get blob back
    var id = req.body.id;
    const file = await helpers.downloadFile(id);

    console.log(file.data);
    var buffer = await file.data.arrayBuffer();
    buffer = Buffer.from(buffer);
    console.log(buffer);
    buffer = buffer.toString('base64');
    console.log(buffer);

    var mimeType = file.data.type;
    res.json({tag: `<img src="data:${mimeType};base64,${buffer}" />`});
});

app.get('/gridfs-test', async (req, res) => {
    const test = await gridfsHelpers.uploadFile({name:"test"});
    res.json(test);
});

app.get('/gridfs-download-test', async (req, res) => {
    const test = await gridfsHelpers.downloadFile("test");
    res.json(test);
});

app.get('/hubs', async (req, res) => {
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
        userId.uid == '-1';
    } 

    const profile = await mongoHelpers.getBio(userId);
    console.log(profile)
    res.json(profile);
    // localStorage.setItem("uid", JSON.stringify({uid: profile.uid}))
    /*
    if (profile == null) {
        res.json({ uid: '-1' });
    }
    else {
        res.json({uid: userId.uid});
    }
    */
});

app.post('/upload', async (req, res) => {
    // parse out file info from req TODO
    // search if file name already exists and add 1 etc at the end if repeat TODO
    const fileData = {
        file: null,
        name: null,
        mimeType: null,
    };
    const id = await helpers.uploadFile(fileData);
    res.json({uploadConfirm: id});
});

app.delete('/delete', async (req, res) => {
    // search for file to delete? TODO
    // const id = await helpers.searchFile(null);
    const response = await helpers.deleteFile();
    res.json({message: response});
});

app.listen(8000, () => {
    console.log('Server is running on port 8000.');
});