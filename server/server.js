const express = require('express');
const cors = require('cors');

const helpers = require('./helpers');
const mongoHelpers = require('./mongo-helpers');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.json({message: "Test successful"});
});

app.get('/search', async (req, res) => {
    const files = await helpers.searchFile();
    res.json({files: files});
});

app.post('/authenticate', async (req, res) => {
    console.log("HERE1");
    console.log(req.body)
    // console.log(req.email);
    // console.log(req);
    const profile = await mongoHelpers.authenticateUser(req.body.email, req.body.password); 
    if (profile == null) {
        res.json({ uid: '-1' });
    }
    else {
        res.json({uid: profile.uid});
    }
})

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
})

app.listen(8000, () => {
    console.log('Server is running on port 8000.');
});