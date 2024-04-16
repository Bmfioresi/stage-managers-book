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

    isLoggedIn: async function (uid) {
        try {
            const credentialsBase = mongoclient.db('credentials');
            const credentials = credentialsBase.collection('credentials');
        
            // query
            const query = { uid: uid };
            const userProfile = await credentials.findOne(query);
        
            // no user found with this email
            if (!userProfile) {
                return null;
            }

            // returning user data
            return userProfile;
        
        } catch (err) {
            console.log(err);
            console.log("PROFILE NOT FOUND");
            return {'uid': "-1"};
        }
    },

    // updated to just search for email... trying to use hashed passwords
    authenticateUser: async function (uname) {
        try {
            const credentialsBase = mongoclient.db('credentials');
            const credentials = credentialsBase.collection('credentials');
        
            // query
            const query = { username: uname };
            const userProfile = await credentials.findOne(query);
        
            // no user found with this email
            if (!userProfile) {
                return null;
            }

            // returning user data
            return userProfile;
        
        } catch (err) {
            console.log(err);
            console.log("PROFILE NOT FOUND");
            return {'uid': "-1"};
        } 
    },

    // Function to check lockout status
    checkLockout: async function (username) {
        // console.log("Checking lockout status for " + username);
        const credentialsBase = mongoclient.db('credentials');
        const credentials = credentialsBase.collection('credentials');
        const userProfile = await credentials.findOne({ username: username });

        if (!userProfile) {
            return { exists: false };
        }

        const isLocked = userProfile.lockUntil && new Date(userProfile.lockUntil) > new Date();
        //  console.log("User is locked: " + isLocked);
        return {
            exists: true,
            isLocked: isLocked,
            userProfile: userProfile
        };
    },

    // Function to increment login attempts and possibly lock the account
    incrementLoginAttempts: async function (username) {
        // console.log("Incrementing login attempts for " + username);
        const credentialsBase = mongoclient.db('credentials');
        const credentials = credentialsBase.collection('credentials');
        const userProfile = await credentials.findOne({ username: username });

        if (!userProfile) {
            return { updated: false };
        }

        let updates = { $inc: { failedLoginAttempts: 1 } };
        // console.log("Failed login attempts: " + userProfile.failedLoginAttempts);
        if (userProfile.failedLoginAttempts + 1 >= parseInt(process.env.MAX_ATTEMPTS)) {
            // console.log("Locking user account");
            updates.$set = { lockUntil: new Date(Date.now() + parseInt(process.env.LOCKOUT_TIME)) };
            // console.log(`Setting lockUntil to: ${new Date(Date.now() + parseInt(process.env.LOCKOUT_TIME))}`);
        }

        // console.log("Updating user profile");
        await credentials.updateOne({ username: username }, updates);
        // console.log("Updated user profile");
        return { updated: true };
    },

    // Function to reset login attempts
    resetLoginAttempts: async function (username) {
        const credentialsBase = mongoclient.db('credentials');
        const credentials = credentialsBase.collection('credentials');
        // console.log("Resetting login attempts for " + username)
        await credentials.updateOne({ username: username }, { $set: { failedLoginAttempts: 0 } });
        // console.log("Reset login attempts");
    },

    loadProfile: async function (userId) {
        try {
            const profilesBase = mongoclient.db('profiles');
            const profiles = profilesBase.collection('profiles');
        
            // query
            const query = {uid: Number(userId)};
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
    
            //console.log("AFter inserting user credentials");

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
                        roles: f.roles,
                        hids: f.hids
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

    updateHub: async function (hubInfo) {
        try {
            const hubsBase = mongoclient.db('hubs');
            const hubs = hubsBase.collection('hub_info');

            await hubs.updateOne(
                {hid: hubInfo.hid},
                {
                    $set: {
                        name: hubInfo.name,
                        owner: hubInfo.owner,
                        access_code: hubInfo.access_code,
                        hid: hubInfo.hid,
                        whitelist: hubInfo.whitelist,
                        blacklist: hubInfo.blacklist,
                        description: hubInfo.description,
                        announcements: hubInfo.announcements,
                        join_requests: hubInfo.join_requests
                    }
                }
            );
            return {status: 200};
        } catch (err) {
            console.log(err);
            return {status: 500};
        }
    },

    findHub: async function (accessCode) {
        try {
            const hubsBase = mongoclient.db('hubs');
            const hubs = hubsBase.collection('hub_info');
            console.log(accessCode);
            let hub = await hubs.findOne({access_code: Number(accessCode)});
            console.log(hub);
            if (hub === null) return {status: 404}; // not found
            else return {status: 200, hid: hub.hid};
        } catch (err) {
            console.log(err);
            return {status: 500};
        }
    },

    getHids: async function (userId) {
        try {
            const profilesBase = mongoclient.db("profiles");
            const profiles = profilesBase.collection("profiles");
            //console.log("UID");
            //console.log(userId);

            // query
            const query = { uid: userId }; // DECIDE IF WE STORING UID AS NUMBER OR STRING
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
                const query = { hid: Number(hids[i]) };
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
            const query = { hid: Number(hid) };
            const hub = await collection.findOne(query);
            hubInfo.push(hub);
            return hubInfo;
        } catch (err) {
            console.log(err);
            console.log("HUB INFO NOT FOUND");
            return {'uid': "-1"};
        }
    },

    createHub: async function (hub) {
        try {
            // Connecting to current Database
            const hubBase = mongoclient.db('hubs');
            const hubs = hubBase.collection('hub_info');

            // Getting next HID
            var thisHID = -1;
            const countQuery = { name : "UNIQUE_COUNT_DOCUMENT_IDENTIFIER", password : "UNIQUE_COUNT_DOCUMENT_IDENTIFIER"};
            const countResult = await hubs.findOne(countQuery);
            const updateCount = await hubs.updateOne(countQuery, { $inc: { count : 1 } });
            const updateCode = await hubs.updateOne(countQuery, { $inc: { code : 1 } })
            thisHID = countResult.count;
            var thisCode = countResult.code;
            var thisWhiteList = [];
            var thisBlackList = [];
            var thisAnnouncements = [];
            var thisJoinRequests = [];

            const doc = { name: hub.name, owner: hub.owner, description: hub.description, 
                hid: thisHID, access_code: thisCode, whitelist: thisWhiteList, blacklist: thisBlackList,
                announcements: thisAnnouncements, join_requests: thisJoinRequests
            };
            const result = await hubs.insertOne(doc);
            return doc;
        } catch (err) {
            console.log(err);
            console.log("HUB CREATION ERROR");
            return {'hid': "-1"};
        }
    },

    retrieveMembers : async function (whitelist) {
        try {
            const db = mongoclient.db("profiles");
            const collection = db.collection("profiles");
            var members = [];
            for(let i = 0; i < whitelist.length; i++) {
                const query = { uid: Number(whitelist[i]) };
                const member = await collection.findOne(query);
                members.push(member);
            }
            return members;
        } catch (err) {
            console.log(err);
            console.log("MEMBER ERROR");
            return {'uid': "-1"};
        }
    },

    addAnnouncement : async function (hid, announcement) {
        try {
            const db = mongoclient.db("hubs");
            const collection = db.collection("hub_info");
            const query = { hid: hid };
            await collection.updateOne(
                query,
                {
                    $push: { announcements : announcement}
                }
            );
            hub.announcements.push(announcement);
            return hub;
        } catch (err) {
            console.log(err);
            console.log("ANNOUNCEMENT BROKE");
            return;
        }
    },

    addToProfileHids : async function (uid, hid) {
        try {
            // Connecting to profiles database
            const profilesBase = mongoclient.db('profiles');
            const profiles = profilesBase.collection('profiles');
            console.log(uid);
            // Updating record
            const result = await profiles.updateOne(
                { uid: uid },
                {
                    $push: { hids : hid }
                }
            );
            console.log(result);
            return {'hids': result.hids};
        
        } catch (err) {
            console.log(err);
            console.log("COULD NOT CREATE PROFILE");
            return {'uid': "-1"};
        } 
    }
}