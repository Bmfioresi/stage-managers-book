const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("391303195070-1j9epkem5pktr7ueg1hjhufb9pberau2.apps.googleusercontent.com");

app.post('/api/v1/auth/google', async (req, res) => {
  const { token }  = req.body;
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "391303195070-1j9epkem5pktr7ueg1hjhufb9pberau2.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();
  
  // Use payload to authenticate user
  // Check if user exists in MongoDB, if not create a new one
});