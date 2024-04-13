require('dotenv').config();
const bcrypt = require('bcrypt');
const saltrounds = 10;

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@stagemanagersbook.mv9wrc2.mongodb.net/";
const mongoclient = new MongoClient(uri);

async function hashExistingPasswords() {
    try {
        await mongoclient.connect();
        const db = mongoclient.db("credentials");
        const collection = db.collection("credentials");

        const cursor = collection.find({}); // Find all documents in the collection

        while (await cursor.hasNext()) {
            const user = await cursor.next(); // grab next user

            if (user.password && user.password.length < 60) { // simple check to see if the password is hashed
                const hashedPassword = await bcrypt.hash(user.password, saltrounds); // hash the password

                // update the user's password with the hashed password
                await collection.updateOne(
                    { _id: user._id },
                    { $set: { password: hashedPassword }}
                );
                console.log(`Hashed password for ${user.username}`);
            }
        }
    } catch (error) {
        console.error('Error hashing passwords:', error);   
    } finally {
        await mongoclient.close();
    }
}

hashExistingPasswords(); // call the function
