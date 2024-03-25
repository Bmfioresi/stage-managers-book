const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("933341791381-nadvkll3fcr60dv19p4paljj4d2hq603.apps.googleusercontent.com");
const User = require('../user-model-schema').default;

app.post('/api/v3/auth/google', async (req, res) => {
    const { token }  = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "933341791381-nadvkll3fcr60dv19p4paljj4d2hq603.apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();
        
        let user = await User.findOne({ googleId: payload['sub'] });

        if (!user) {
            // If user doesn't exist, create a new user
            user = new User({
                googleId: payload['sub'],
                email: payload['email'],
                name: payload['name'],
                picture: payload['picture'] // Store other fields if needed
            });
            await user.save();
        }

        // Generate token, manage session
        res.status(200).json({ message: 'User authenticated', user });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ message: 'Error authenticating user', error });
    }
});