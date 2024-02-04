async function searchFile() {
    const {GoogleAuth} = require('google-auth-library');
    const {google} = require('googleapis');

    const auth = new GoogleAuth({
        keyFilename: '../auth.json',
        scopes: 'https://www.googleapis.com/auth/drive',
    });
    const service = google.drive({version: 'v3', auth});
    const files = [];
    try {
        const res = await service.files.list({
            
        });
        Array.prototype.push.apply(files, res.files);
        res.data.files.forEach(function(file) {
            console.log(file.name, file.id);
        });
        return res.data.files;
    } catch (err) {
        console.log(err);
        throw err;
    }
}