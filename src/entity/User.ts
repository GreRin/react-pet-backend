const mongoose = require('mongoose');

const { Schema, model, Types } = mongoose;

const schema = new Schema({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  email: String,
  password: {
    type: String,
    required: true,
  },
  albums: [
    {
      type: Types.ObjectId,
      ref: 'Album',
    },
  ],
});

module.exports = model('User', schema);
