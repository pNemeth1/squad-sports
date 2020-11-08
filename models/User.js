const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  image: String,
  googleId: String,
  image: {
    meta_data:{}
  },
  squadId: String, // cause the Id provided by google changes! So better have this Id set up!
});

mongoose.model('users', userSchema);


const fileSchema = new mongoose.Schema({
    meta_data:{}
});

