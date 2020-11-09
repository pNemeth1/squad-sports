const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  city: String,
  sports: String,
  street: String,
  title: String,
  desc: String,
  squadUserId: String,
  image: {
    meta_data:{}
  },
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
    },
    commentUserImage: {
      meta_data: {}
  },
  commentUserId: String,
  commentUserFirstName: String
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
