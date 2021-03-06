'use strict';

const mongoose =  require('mongoose');

const dataSchema = new mongoose.Schema({
  name: {type: String, required: true}
});

dataSchema.set('timestamps', true);

dataSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('Data', dataSchema);