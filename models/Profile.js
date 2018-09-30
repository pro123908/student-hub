const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  university: {
    type: String
  },
  department: {
    type: String
  },
  year: {
    type: String
  },
  semester: {
    type: String
  },
  phone: {
    type: Number
  },
  courses: [
    {
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
      GPA: {
        type: Number,
        default: 0
      },
      semester: {
        type: String
      },
      attendance: {
        classesHeld: {
          type: Number,
          default: 0
        },
        classesTaken: {
          type: Number,
          default: 0
        },
        classesLeft: {
          type: Number,
          default: 0
        }
      },

      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", profileSchema);
