const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("933341791381-ahldt55j2o2t7rvqob536ahub8md0e9e.apps.googleusercontent.com");

app.post('/api/v1/auth/google', async (req, res) => {
  const { token }  = req.body;
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "933341791381-ahldt55j2o2t7rvqob536ahub8md0e9e.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();
  
  // Use payload to authenticate user
  // Check if user exists in MongoDB, if not create a new one
});