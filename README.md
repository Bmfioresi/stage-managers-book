# The Stage Manager's Book

## How to test web app

### Clone repository

In visual studio code, open a terminal and run the command `git clone https://github.com/Bmfioresi/stage-managers-book.git`.

### Install Node.js and node package manager (npm)
Follow the instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install Node.js and npm.

### Install the dependencies
Inside both the client and server directories, run the command `npm install` to install the respective dependencies outlined in each `package.json`. This will generate a folder called `node_modules`, which is excluded from the git repository because its size is unnecessarily large and annoying to download/upload with git. In case of dependency errors, try the command `npm install --save --legacy-peer-deps`; this makes the installation less restrictive.

### Start the client and server
Open two terminals, navigate to the client directory in one, and the server directory in the other.
#### Client
In the client terminal, run the command `npm start`. This will start the client on `localhost:3000` and open it in your default browser.
#### Server
In the server terminal, run the command `npm run dev`. This will start the server on `localhost:8000` and run it in the background.
You will need to login to MongoDB Atlas and add your computer's IP Address and create a .env file with variables MONGODB_USERNAME and MONGODB_PASSWORD to facilitate the communication between the server and the database.

## Subfolders

### client
Front-end react client.

### server
Back-end node server.
