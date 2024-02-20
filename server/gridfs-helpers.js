require('dotenv').config();


// https://mongodb.github.io/node-mongodb-native/6.3/classes/GridFSBucket.html
module.exports = {
    uploadFile: async function (file) {
        const fs = require('fs');
        const { MongoClient, GridFSBucket } = require("mongodb");
        const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
        const mongoclient = new MongoClient(uri);

        try {
            await mongoclient.connect();
            const db = mongoclient.db('files');
            const bucket = new GridFSBucket(db, {bucketName: 'testBucket'});
            const upstream = bucket.openUploadStream(file.name);
            const test = fs.createReadStream('./test-images/test.jpg').pipe(upstream);
            console.log(test);
            return test;
        } catch (err) {
            console.log(err);
            return err;
        }
    },

    downloadFile: async function (filename, id=null) {
        const fs = require('fs');
        const { MongoClient, GridFSBucket } = require("mongodb");
        const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
        const mongoclient = new MongoClient(uri);

        try {
            await mongoclient.connect();
            const db = mongoclient.db('files');
            const bucket = new GridFSBucket(db, {bucketName: 'testBucket'});
            // options for accessing file data
            const test = bucket.openDownloadStreamByName(filename);
            test.pipe(fs.createWriteStream('./test-images/test-output.jpg'));
            // const test = bucket.openDownloadStream(ObjectId(id));
            console.log(test);
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}