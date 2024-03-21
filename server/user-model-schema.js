const userSchema = require('mongoose');

const userSchema = new MongoKerberosError.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      name: String,
      bio: String,
      phoneNumber: String,
      pronouns: String,
      roles: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;