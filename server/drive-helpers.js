module.exports = {
    // searches drive for all files
    // id - id of specific file to search for
    searchFile: async function (id = null) {
        const {GoogleAuth} = require('google-auth-library');
        const {google} = require('googleapis');
    
        const auth = new GoogleAuth({
            keyFilename: 'auth.json',
            scopes: 'https://www.googleapis.com/auth/drive',
        });
        const service = google.drive({version: 'v3', auth});
        const files = [];
        try {
            const res = await service.files.list({
                q: 'trashed = false', // ignore files in the trash
            });
            // console.log(res);
            Array.prototype.push.apply(files, res.files);
            res.data.files.forEach(function(file) {
                console.log(file.name, file.id);
            });
            return res.data.files;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },


    // downloads a file as a blob
    downloadFile: async function (id) {
        const {GoogleAuth} = require('google-auth-library');
        const {google} = require('googleapis');

        const auth = new GoogleAuth({
            keyFilename: 'auth.json',
            scopes: 'https://www.googleapis.com/auth/drive',
        });
        const service = google.drive({version: 'v3', auth});
        
        try {
            const file = await service.files.get({
                fileId: id,
                alt: 'media',
            });
            console.log(file);
            return file;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // uploads a file to the drive
    // file object should be formatted like this:
    /*
    {
        data - actual file data
        name - file name
        mimeType - mimeType to set
    }
    */
    uploadFile: async function (file) {
        const {GoogleAuth} = require('google-auth-library');
        const {google} = require('googleapis');

        const auth = new GoogleAuth({
            keyFilename: 'auth.json',
            scopes: 'https://www.googleapis.com/auth/drive',
        });
        const service = google.drive({version: 'v3', auth});
        console.log(file.name);
        const reqBody = {
            name: file.name,
            fields: 'id',
        };
        const media = {
            mimeType: file.mimeType,
            body: file.data,
        };
        try {
            const file = await service.files.create({
                reqBody,
                media: media,
            });
            console.log('File Id:', file.data.id);
            return file.data.id;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // sets the file's status to 'trashed'
    // pass in the id found from using the searchFile function
    deleteFile: async function (id) {
        const {GoogleAuth} = require('google-auth-library');
        const {google} = require('googleapis');

        const auth = new GoogleAuth({
            keyFilename: 'auth.json',
            scopes: 'https://www.googleapis.com/auth/drive',
        });
        const service = google.drive({version:'v3', auth});
        try {
            const res = await service.files.update({
                fileId: id,
                requestBody: {'trashed': true},
            });
            return res;
        } catch (err) {
            console.log(err);
            throw err;
        }


    }
}