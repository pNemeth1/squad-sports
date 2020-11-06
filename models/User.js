const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  image: String,
  googleId: String,
  image: String,
  squadId: String, // cause the Id proved by google changes! So better have this Id set up!
});

mongoose.model('users', userSchema);
