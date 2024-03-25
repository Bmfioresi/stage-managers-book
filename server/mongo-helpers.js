require('dotenv').config();

module.exports = {
    authenticateUser: async function (uname, pword) {

        const { MongoClient } = require("mongodb");
        const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
        console.log(uri)
        const mongoclient = new MongoClient(uri);

        try {
            const credentialsBase = mongoclient.db('credentials');
            const credentials = credentialsBase.collection('credentials');
            console.log("LOGIN CREDS");
            console.log(uname);
            console.log(pword);
        
            // query
            const query = { username: uname, password: pword };
            const userProfile = await credentials.findOne(query);
        
            // console.log(userProfile.uid);
            console.log(userProfile);
            // console.log(userProfile.uid);
            await mongoclient.close();
            return userProfile;
        
        } catch (err) {
            console.log(err);
            console.log("PROFILE NOT FOUND")
            return {'uid': "-1"};
        } 
    },

    loadProfile: async function (userId) {

        const { MongoClient } = require("mongodb");
        const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
        console.log(uri)
        const mongoclient = new MongoClient(uri);

        try {
            const profilesBase = mongoclient.db('profiles');
            const profiles = profilesBase.collection('profiles');
        
            // query
            const query = { uid: userId};
            console.log("Getting user profile with this query:");
            console.log(query);
            const userProfile = await profiles.findOne(query);
        
            // console.log(userProfile.uid);
            console.log("GOT USER PROFILE!!");
            console.log(userProfile);
            // console.log(userProfile.uid);
            await mongoclient.close();
            console.log("CLOSED MONGOCLIENT");
            if (userProfile == null) {
                console.log("USER PROFILE IS NULL.");
                userProfile = {'uid': "-1", 'name': "NOT FOUND", 'bio': "NOT FOUND", 'email_address': "NOT FOUND", 
                'phone_number': "NOT FOUND", 'pronouns': "NOT FOUND", 'roles': "NOT FOUND"};
            }
            return userProfile;
        
        } catch (err) {
            console.log(err);
            console.log("PROFILE NOT FOUND")
            return {'uid': "-1"};
        } 
    },

    getBio: async function (userId) {

        const { MongoClient } = require("mongodb");
        const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
        console.log(uri)
        const mongoclient = new MongoClient(uri);

        try {
            const profilesBase = mongoclient.db('profiles');
            const profiles = profilesBase.collection('profiles');

            console.log("USER ID");
            console.log(userId.uid);
            const query = { uid: userId.uid};
            const userProfile = await profiles.findOne(query);

            if (userProfile == null) {
                userProfile = {'uid': "-1", 'name': "NOT FOUND", 'bio': "NOT FOUND", 'email_address': "NOT FOUND", 
                'phone_number': "NOT FOUND", 'pronouns': "NOT FOUND", 'roles': "NOT FOUND"};
            }
        
            // console.log(userProfile.uid);
            console.log(userProfile);
            // console.log(userProfile.uid);
            await mongoclient.close();
            return userProfile;
        
        } catch (err) {
            console.log(err);
            console.log("PROFILE NOT FOUND")
            return {'uid': "-1", 'name': "NOT FOUND", 'bio': "NOT FOUND", 'email_address': "NOT FOUND", 
            'phone_number': "NOT FOUND", 'pronouns': "NOT FOUND", 'roles': "NOT FOUND"};
        } 
    },

    createProfile: async function (f) {

        // Connecting to MongoDB
        const { MongoClient } = require("mongodb");
        const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
        const mongoclient = new MongoClient(uri);

        try {

            // Connecting to current Database
            const credentialsBase = mongoclient.db('credentials');
            const credentials = credentialsBase.collection('credentials');

            // Getting next UserID
            var thisUID = -1;
            const countQuery = { username : "UNIQUE_COUNT_DOCUMENT_IDENTIFIER", password : "UNIQUE_COUNT_DOCUMENT_IDENTIFIER"};
            const countResult = await credentials.findOneAndUpdate(
                countQuery,
                { $inc: { count : 1 } }
            );
            console.log("COUNT RESULT");
            console.log(countResult);
            thisUID = countResult.count;

            // Connecting to profiles database
            const profilesBase = mongoclient.db('profiles');
            const profiles = profilesBase.collection('profiles');

            const doc = { uid: thisUID, name: f.name, bio: f.bio, phone_number: f.phoneNumber,
                          email_address: f.email, pronouns: f.pronouns, roles: f.roles};
            const result = await profiles.insertOne(doc);

            // TODO: Error handling if "result" is not created properly
        
            // console.log(userProfile.uid);
            console.log(result);
            await mongoclient.close();
            return {'uid': thisUID};
        
        } catch (err) {
            console.log(err);
            console.log("COULD NOT CREATE PROFILE");
            return {'uid': "-1"};
        } 
    },

    updateProfile: async function (f) {

        // Connecting to MongoDB
        const { MongoClient } = require("mongodb");
        const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
        const mongoclient = new MongoClient(uri);

        try {

            // Connecting to profiles database
            const profilesBase = mongoclient.db('profiles');
            const profiles = profilesBase.collection('profiles');

            // Updating record
            const result = await profiles.updateOne(
                { uid: f.uid },
                {
                    $set: {
                        name: f.name,
                        bio: f.bio,
                        phone_number: f.phoneNumber,
                        email_address: f.email,
                        pronouns: f.pronouns,
                        roles: f.roles
                    }
                }
            );

            // TODO: Error handling if "result" is not created properly
        
            // console.log(userProfile.uid);
            console.log(result);
            await mongoclient.close();
            console.log("UPDATE PROFILE ABOUT TO RETURN");
            return {'uid': f.uid};
        
        } catch (err) {
            console.log(err);
            console.log("COULD NOT CREATE PROFILE");
            return {'uid': "-1"};
        } 
    },

    getHids: async function (userId) {
        const { MongoClient } = require("mongodb");
        const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
        console.log(uri)
        const mongoclient = new MongoClient(uri);

        try {
            await mongoclient.connect();
            const profilesBase = mongoclient.db("profiles");
            const profiles = profilesBase.collection("profiles");
            console.log("UID");
            console.log(userId);

            // query
            const query = { uid: userId };
            const userProfile = await profiles.findOne(query);
        
            console.log(userProfile.uid);
            //console.log(userProfile);
            // console.log(userProfile.uid);
            await mongoclient.close();
            return userProfile.hids;
        
        } catch (err) {
            console.log(err);
            console.log("HIDS NOT FOUND")
            return {'uid': "-1"};
        } finally {
            await mongoclient.close();
        }
    },

    getHubInfo: async function (hids) {
        const { MongoClient } = require("mongodb");
        const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
        console.log(uri)
        const mongoclient = new MongoClient(uri);

        try {
            await mongoclient.connect();
            const db = mongoclient.db("hubs");
            const collection = db.collection("hub_info");
            var hubInfo = [];
            for(let i = 0; i < hids.length; i++) {
                const query = { hid: hids[i] };
                const hub = await collection.findOne(query);
                hubInfo.push(hub);
            }
            await mongoclient.close();
            return hubInfo;
        } catch (err) {
            console.log(err);
            console.log("HUB INFO NOT FOUND")
            return {'uid': "-1"};
        } finally {
            await mongoclient.close();
        }
    },

    getIndividualHubInfo: async function (hid) {
        const { MongoClient } = require("mongodb");
        const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
        console.log(uri)
        const mongoclient = new MongoClient(uri);

        try {
            await mongoclient.connect();
            const db = mongoclient.db("hubs");
            const collection = db.collection("hub_info");
            var hubInfo = [];
            const query = { hid: hid };
            const hub = await collection.findOne(query);
            hubInfo.push(hub);
            await mongoclient.close();
            return hubInfo;
        } catch (err) {
            console.log(err);
            console.log("HUB INFO NOT FOUND")
            return {'uid': "-1"};
        } finally {
            await mongoclient.close();
        }
    },

    retrieveMembers : async function (whitelist) {
        const { MongoClient } = require("mongodb");
        const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
        console.log(uri)
        const mongoclient = new MongoClient(uri);
        console.log(whitelist)

        try {
            await mongoclient.connect();
            const db = mongoclient.db("profiles");
            const collection = db.collection("profiles");
            var members = [];
            for(let i = 0; i < whitelist.length; i++) {
                const query = { uid: whitelist[i] };
                const member = await collection.findOne(query);
                members.push(member);
            }
            await mongoclient.close();
            return members;
        } catch (err) {
            console.log(err);
            console.log("MEMBER ERROR")
            return {'uid': "-1"};
        } finally {
            await mongoclient.close();
        }
    }
}