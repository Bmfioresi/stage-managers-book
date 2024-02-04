const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/drive';

let tokenClient;
let gapiInited = false;
let gisInited = false;


function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
}

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '',
    });
    gisInited = true;
}

function handleSubmit() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        } 
        await placeholder();
    };

    if (gapi.client.getToken() == null) {
        tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
        tokenClient.requestAccessToken({prompt: ''});
    }
}

// async function uploadFile() {
//     let response;
//     try {
        
//     } catch (err) {
//         document.getElementById('content').innerText = err.message;
//         return;
//     }
    
// }

async function searchFile(filename) {
    let response;
    try {
        response = await gapi.service.drive.files.list({

        });
    } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
    }
}

async function uploadFile(filename, type, location) {
    var metadata = {
        'title': filename,
        'mimeType': type,
        'parents': [{"id":location}]
    };

    var request = gapi.client.request({
        'path': '/upload/drive/v2'
    })
}