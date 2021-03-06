//Creating model for Users Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now
  }
});

//Exporting the model
module.exports = User = mongoose.model("users", userSchema);
