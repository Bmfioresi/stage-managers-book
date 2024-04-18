// Getting Data
// mongoexport --uri mongodb+srv://<username>:<password>@stagemanagersbook.mv9wrc2.mongodb.net/profiles --collection profiles --type json --out profilesdata.json
require('dotenv').config();

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/auto-tests";
const mongoclient = new MongoClient(uri);
mongoclient.connect();


async function createTestDB() {
  const { MongoClient } = require("mongodb");
  
  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/auto-tests";
  
  const client = new MongoClient(uri);
  
  
    try {
      // Create the "auto-test" database for automated testing
      const testDatabase = client.db("auto-test");

      // CREATE AUTHENTICATE TEST INFO
      const authenticateCollection = testDatabase.collection("authenticate-test");
      const authenticateDoc = {"uid":101,"name":"DUMMY USER","bio":"DUMMY BIO","phone_number":"DUMMY PHONE","email_address":"DUMMY BIO","pronouns":"DUMMY PRONOUNS","roles":"DUMMY ROLE","hids":["D01","D02"],"headshotName":"DUMMY HEADSHOTNAME","resumeName":"DUMMY RESUMENAME"}
      const authenticateResult = await authenticateCollection.insertOne(authenticateDoc);

      // CREATE FILE TEST COLLECTION
      const fileCollection = testDatabase.collection("file-test");
      const fileDoc = {"name":"testing"};
      const fileResult = await fileCollection.insertOne(fileDoc);

  } finally {
      // Close the MongoDB client connection
      await client.close();
  }
}

async function destroyTestDB() {
  const { MongoClient } = require("mongodb");
  
  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/auto-tests";
  
  const client = new MongoClient(uri);

  try {
    const testDatabase = client.db("auto-test");
    testDatabase.dropDatabase().then(result => { // THIS SHOULD NOT BREAK ANYTHING BUT IM TOO SCARED TO RUN IT RN
      console.log(result);
      client.close();
    }).catch(err => {
      console.error(err);
    });
  } finally {
    await client.close();
  }
}

createTestDB();
console.log("created");
// destroyTestDB();
console.log("dropped");
