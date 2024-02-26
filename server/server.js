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

app.listen(8000, () => {
    console.log('Server is running on port 8000.');
});