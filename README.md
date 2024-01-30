# The Stage Manager's Book

## How to test web app

### Clone repository
In visual studio code (VSC), open a terminal and run the command `git clone https://github.com/Bmfioresi/stage-managers-book.git`.
### Add the authentication variables
To add the authentication variables, create a file called `env.js` in the main directory. In this file, copy the following code:
```
const API_KEY = "<API_KEY>";
const CLIENT_ID = "<CLIENT_ID>";
```
But instead of the placeholders, paste the authentication info attached to the Google Workspace account (reach out to Ben Fioresi for those keys). These keys need to be kept private, as that is a security issue. `env.js` is in the `.gitignore` so it will not be uploaded to the repository.
### Install python
If you don't have python installed, you can download it from [Python.org](https://www.python.org/downloads/).
### Start the server
To start the server, open a VSC terminal, navigate to the directory, and run the command `py -m http.server`. This will start a server on localhost port 8000 to test files.
### Navigate to localhost
Open a web browser and navigate to http://localhost:8000/. This will show a list of the files in the directory, and from there you can navigate to the file you want to test.

## Subfolders
### drive-test
This folder contains tests for the Google Drive API.