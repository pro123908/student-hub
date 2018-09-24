const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String
  },
  ch: {
    type: Number
  },
  teacher: {
    type: String
  },
  attendance: {
    classesHeld: {
      type: Number
    },
    classesTaken: {
      type: Number
    },
    classesLeft: {
      type: Number
    },
    classesLeftDate: [
      {
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Course = mongoose.model("courses", courseSchema);
