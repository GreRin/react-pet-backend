const mongoose = require('mongoose');

const { Schema, model, Types } = mongoose;

export const schema = new Schema({
  userId: String,
  title: String,
  foto: [
    {
      type: Types.ObjectId,
      ref: 'Foto',
    },
  ],
  owner: {
    type: Types.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
  updatedAr: Date,
});

module.exports = model('Album', schema);
