// Getting Data
// mongoexport --uri mongodb+srv://<username>:<password>@stagemanagersbook.mv9wrc2.mongodb.net/profiles --collection profiles --type json --out profilesdata.json
require('dotenv').config();

const fs = require('fs');
const gridfsHelpers = require('./gridfs-helpers');

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/auto-tests";
const mongoclient = new MongoClient(uri);
mongoclient.connect();

module.exports = {
createTestDB : async function () {
  const { MongoClient } = require("mongodb");
  
  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/auto-tests";
  
  const client = new MongoClient(uri);
  
  
    try {
      // Create the "auto-test" database for automated testing
      const testDatabase = client.db("auto-test");

      // CREATE credentials db 
      const credentialsCollection = testDatabase.collection("credentials");
      const credentialsCountDoc = {"count":12110050,"password":"UNIQUE_COUNT_DOCUMENT_IDENTIFIER","username":"UNIQUE_COUNT_DOCUMENT_IDENTIFIER"};
      const credentialsDoc1 = {"uid":12110023,"username":"dummyUser@gmail.com","password":"$2b$10$iZDaS.MiFRdpDQt1ZreZmuywjL9EAsfNKE5j4ECLDjwS8ZxhD0/rS","failedLoginAttempts":{"$numberInt":"0"}};
      const credentialsDoc2 = {"uid":12110024,"username":"editDummyUser@gmail.com","password":"$2b$10$G16oK6VNX2nDp3V.D2a6YeRk4dJ7rPTUng5VWleB2hhL5DFPRqtSe","failedLoginAttempts":{"$numberInt":"0"}};
      const credentialsResult = await credentialsCollection.insertMany([credentialsDoc1, credentialsDoc2, credentialsCountDoc]);
      // console.log("JUST CREATED CREDENTIALS COLLECTION");
      // console.log(credentialsResult)

      // CREATE profiles db
      const profilesCollection = testDatabase.collection("profiles");
      const profilesDoc1 = {"uid":12110024,"name":"ET NAME","bio":"Sat Apr 20 2024 22:42:22 GMT-0500 (Central Daylight Time)","phone_number":"ET PHONE ","email_address":"ET EMAIL","pronouns":"ET PRONOUNS","roles":"ET EMAIL","hids":null};
      const profilesDoc2 = {"uid":12110023,"name":"Test User","bio":"dummyBio","phone_number":"dummyPhone","email_address":"dummyEmail","pronouns":"dummyPronouns","roles":"dummyRoles","hids":null};
      const profilesResult = await profilesCollection.insertMany([profilesDoc1, profilesDoc2]);
      // console.log("JUST CREATED PROFILES COLLECTION");
      // console.log(profilesResult);

      // CREATE FILE TEST COLLECTION
      const fileCollection = testDatabase.collection("auto-test");
      // const fileDoc = {"name":"auto-test-file", };
      // const fileResult = await fileCollection.insertOne(fileDoc);
      const stream = fs.createReadStream("unit-test-files/unit-test-file.jpg");
      const name = "auto-test-file.jpg";
      const hub = "auto-test";
      const bucket = "auto-test";
      const ret = await gridfsHelpers.uploadFile(name, stream, hub, bucket);

  } finally {
      // Close the MongoDB client connection
      await client.close();
  }
},

destroyTestDB : async function () {
  // console.log("destroying");
  const { MongoClient } = require("mongodb");
  
  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/auto-tests";
  
  const client = new MongoClient(uri);

  try {
    const testDatabase = client.db("auto-test");
    testDatabase.dropDatabase().then(result => { 
      // console.log(result);
      client.close();
    }).catch(err => {
      console.error(err);
    });
  } finally {
    await client.close();
  }
},
}

// createTestDB();
// console.log("created");
// // destroyTestDB();
// console.log("dropped");
