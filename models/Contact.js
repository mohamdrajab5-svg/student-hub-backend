const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // So you know when the message was sent
  }
);

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
