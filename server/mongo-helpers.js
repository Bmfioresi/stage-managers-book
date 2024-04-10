require('dotenv').config();

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
const mongoclient = new MongoClient(uri);
mongoclient.connect();

module.exports = {

    getUserID: async function (sessionID) {
        try {
            const testBase = mongoclient.db('test');
            const sessions = testBase.collection('sessions');
        
            // query
            const query = { _id: sessionID};
            const response = await sessions.findOne(query);

            if (!response) {
                return {'uid': "-1"};
            }

            const userData = JSON.parse(response.session);
        
            // FOR DEBUGGING
            // console.log("ACCESSED SESSION IDs from DATABASE");
            // console.log(response.session);
            // console.log("Getting userID");
            // console.log(userData);
            // console.log(userData.userId);

            return userData;
        
        } catch (err) {
            console.log(err);
            console.log("PROFILE NOT FOUND");
            return {'uid': "-1"};
        } 
    },


    authenticateUser: async function (uname, pword) {
        try {
            const credentialsBase = mongoclient.db('credentials');
            const credentials = credentialsBase.collection('credentials');

            // FOR DEBUGGING
            // console.log("LOGIN CREDS");
            // console.log(uname);
            // console.log(pword);
        
            // query
            const query = { username: uname, password: pword };
            const userProfile = await credentials.findOne(query);
        
            // FOR DEBUGGING
            // console.log(userProfile.uid);
            // console.log(userProfile);
            // console.log(userProfile.uid);

            return userProfile;
        
        } catch (err) {
            console.log(err);
            console.log("PROFILE NOT FOUND");
            return {'uid': "-1"};
        } 
    },

    loadProfile: async function (userId) {
        try {
            const profilesBase = mongoclient.db('profiles');
            const profiles = profilesBase.collection('profiles');
        
            // query
            const query = { uid: userId};
            var userProfile = await profiles.findOne(query);
        
            // FOR DEBUGGING PURPOSES
            // console.log("Getting user profile with this query:");
            // console.log(query);
            // console.log(userProfile.uid);
            // console.log("GOT USER PROFILE!!");
            // console.log(userProfile);
            // console.log(userProfile.uid);
            // console.log("CLOSED MONGOCLIENT");

            // RETURNING BLANK PROFILE
            if (userProfile == null) {
                console.log("USER PROFILE IS NULL.");
                userProfile = {'uid': "-1", 'name': "NOT FOUND", 'bio': "NOT FOUND", 'email_address': "NOT FOUND", 
                'phone_number': "NOT FOUND", 'pronouns': "NOT FOUND", 'roles': "NOT FOUND"};
            }
            return userProfile;
        
        } catch (err) {
            console.log(err);
            console.log("PROFILE NOT FOUND");
            return {'uid': "-1"};
        } 
    },

    createProfile: async function (f) {
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
            thisUID = countResult.count;

            // FOR DEBUGGING PURPOSES
            console.log("COUNT RESULT");
            console.log(countResult);

            // Connecting to profiles database
            const profilesBase = mongoclient.db('profiles');
            const profiles = profilesBase.collection('profiles');

            const doc = { uid: thisUID, name: f.name, bio: f.bio, phone_number: f.phoneNumber,
                          email_address: f.email, pronouns: f.pronouns, roles: f.roles};
            const result = await profiles.insertOne(doc);

            // TODO: Error handling if "result" is not created properly
        
            // FOR DEBUGGING PURPOSES
            // console.log(userProfile.uid);
            // console.log(result);
            return {'uid': thisUID};
        
        } catch (err) {
            console.log(err);
            console.log("COULD NOT CREATE PROFILE");
            return {'uid': "-1"};
        } 
    },

    // currently, password is stored in plaintext
    createUser: async function (fullName, email, hashedPassword) {
        try {
            const credentialsBase = mongoclient.db('credentials');
            const credentials = credentialsBase.collection('credentials');

            //console.log("Creating a user");
    
            // Check if user already exists
            const existingUser = await credentials.findOne({ username: email});
            if (existingUser) {
                return { success: false, message: 'An account with this email already exists.' };
            }

            //console.log("After checking if user exists");
    
            // Getting next UserID
            var thisUID = -1;
            const countQuery = { username : "UNIQUE_COUNT_DOCUMENT_IDENTIFIER", password : "UNIQUE_COUNT_DOCUMENT_IDENTIFIER"};
            const countResult = await credentials.findOneAndUpdate(
                countQuery,
                { $inc: { count : 1 } }
            );
            thisUID = countResult.count;

            //console.log("After getting next UID");
    
            // Insert authentication details with the generated UID
            const userResult = await credentials.insertOne({ uid: thisUID, username: email, password: hashedPassword });
    
            console.log("AFter inserting user credentials");

            // Check if the user was inserted correctly
            if (!userResult.acknowledged) {
                throw new Error('Failed to create user credentials');
            }
    
            // Now create a profile for the user with the same UID
            const profilesBase = mongoclient.db('profiles');
            const profiles = profilesBase.collection('profiles');
            const profileResult = await profiles.insertOne({ 
                uid: thisUID, 
                name: fullName, 
                bio: "", 
                phone_number: "", 
                email_address: email, 
                pronouns: "", 
                roles: "" 
            });

            //console.log("After inserting user profile");
    
            // Check if the profile was inserted correctly
            if (!profileResult.acknowledged) {
                throw new Error('Failed to create user profile');
            }
    
            return { success: true, message: 'User created successfully' };
        } catch (err) {
            console.error(err);
            return { success: false, message: 'Error creating user' };
        }
    },        

    updateProfile: async function (f, userId) {
        try {
            // Connecting to profiles database
            const profilesBase = mongoclient.db('profiles');
            const profiles = profilesBase.collection('profiles');

            // Updating record
            const result = await profiles.updateOne(
                { uid: userId },
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
        
            // FOR DEBUGGING PURPOSES
            // console.log(userProfile.uid);
            // console.log(result);
            // console.log("UPDATE PROFILE ABOUT TO RETURN");
            return {'uid': f.uid};
        
        } catch (err) {
            console.log(err);
            console.log("COULD NOT CREATE PROFILE");
            return {'uid': "-1"};
        } 
    },

    getHids: async function (userId) {
        try {
            const profilesBase = mongoclient.db("profiles");
            const profiles = profilesBase.collection("profiles");
            //console.log("UID");
            //console.log(userId);

            // query
            const query = { uid: userId };
            const userProfile = await profiles.findOne(query);
        
            //console.log(userProfile.uid);
            //console.log(userProfile);
            // console.log(userProfile.uid);
            return userProfile.hids;
        
        } catch (err) {
            console.log(err);
            console.log("HIDS NOT FOUND");
            return {'uid': "-1"};
        }
    },

    getHubInfo: async function (hids) {
        try {
            const db = mongoclient.db("hubs");
            const collection = db.collection("hub_info");
            var hubInfo = [];
            for(let i = 0; i < hids.length; i++) {
                const query = { hid: hids[i] };
                const hub = await collection.findOne(query);
                hubInfo.push(hub);
            }
            return hubInfo;
        } catch (err) {
            console.log(err);
            console.log("HUB INFO NOT FOUND");
            return {'uid': "-1"};
        }
    },

    getIndividualHubInfo: async function (hid) {
        try {
            const db = mongoclient.db("hubs");
            const collection = db.collection("hub_info");
            var hubInfo = [];
            const query = { hid: hid };
            const hub = await collection.findOne(query);
            hubInfo.push(hub);
            return hubInfo;
        } catch (err) {
            console.log(err);
            console.log("HUB INFO NOT FOUND");
            return {'uid': "-1"};
        }
    },

    retrieveMembers : async function (whitelist) {
        try {
            const db = mongoclient.db("profiles");
            const collection = db.collection("profiles");
            var members = [];
            for(let i = 0; i < whitelist.length; i++) {
                const query = { uid: whitelist[i] };
                const member = await collection.findOne(query);
                members.push(member);
            }
            return members;
        } catch (err) {
            console.log(err);
            console.log("MEMBER ERROR");
            return {'uid': "-1"};
        }
    }
}