const mongoose = require('mongoose');

const { Schema, model, Types } = mongoose;

const photoSchema = new Schema({
  title: String,
  ref: String,
});

export const schema = new Schema({
  userId: String,
  title: String,
  foto: [photoSchema],
  owner: {
    type: Types.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
  updatedAr: Date,
});

module.exports = model('Album', schema);
