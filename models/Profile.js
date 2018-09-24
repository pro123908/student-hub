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
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", profileSchema);
