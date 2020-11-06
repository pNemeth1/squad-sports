const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  city: String,
  sports: String,
  street: String,
  title: String,
  desc: String,
  squadUserId: String,
  image: String,
  comments: [{
    commentBody: {
      type: String,
      required: true
    },
    commentDate:{
      type: Date,
      default: Date.now
    },
    commentUser:{
      type: Schema.Types.ObjectId,
      ref:'users'
    }
  }],
  user:{
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  date:{
    type: Date,
    default: Date.now
  }
});

mongoose.model('event', eventSchema);
