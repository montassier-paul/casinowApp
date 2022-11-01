const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  nom: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  casinoId: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true }
);

module.exports = Message = mongoose.model('Message', MessageSchema);