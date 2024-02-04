function verifyUser() {
const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://letucker:<Password>@stagemanagersbook.mv9wrc2.mongodb.net/";

const client = new MongoClient(uri);

async function run() {
  try {
    const credentialsBase = client.db('credentials');
    const credentials = credentialsBase.collection('credentials');

    // Query for a movie that has the title 'Back to the Future'
    const query = { username: 'hbrousseau' };
    const userProfile = await credentials.findOne(query);

    console.log(userProfile);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
}

run().catch(console.dir);