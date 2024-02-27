require('dotenv').config();


// https://mongodb.github.io/node-mongodb-native/6.3/classes/GridFSBucket.html
module.exports = {
    /*
    name - file name
    stream - file stream to upload to mongodb
    bucketName - name of bucket to store file in
    */
    uploadFile: async function (name, stream, bucketName) {
        const { MongoClient, GridFSBucket } = require("mongodb");
        const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
        const mongoclient = new MongoClient(uri);

        try {
            await mongoclient.connect();
            const db = mongoclient.db('files');
            const bucket = new GridFSBucket(db, {bucketName: bucketName});
            const upstream = bucket.openUploadStream(name);
            const res = stream.pipe(upstream);

            const ret = {
                name: res.filename,
                id: res.id
            }
            return ret;
        } catch (err) {
            console.log(err);
            return err;
        }
    },

    downloadFile: async function (name, bucketName) {
        const { MongoClient, GridFSBucket } = require("mongodb");
        const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
        const mongoclient = new MongoClient(uri);

        try {
            await mongoclient.connect();
            const db = mongoclient.db('files');
            const bucket = new GridFSBucket(db, {bucketName: bucketName});
            const res = bucket.openDownloadStreamByName(name);
            // add error handling here for invalid ip address and such
            return res;
        } catch (err) {
            console.log(err);
            return err;
        }
    },

    getFilenames: async function (bucketName) {
        const { MongoClient, GridFSBucket } = require("mongodb");
        const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
        const mongoclient = new MongoClient(uri);
        
        try {
            await mongoclient.connect();
            const db = mongoclient.db('files');
            const bucket = new GridFSBucket(db, {bucketName: bucketName});
            const res = bucket.find({});
            var filenames = [];

            for await (const file of res) {
                // console.log(file);
                filenames.push(file.filename);
            }
            // console.log(filenames);
            return filenames;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}