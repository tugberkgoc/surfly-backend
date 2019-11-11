const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;

// User Schema

const UserSchema = Schema({
  Email: { type: String, required: true, trim: true, unique: true },
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Stations: { type: [{ Id: Number, Name: String, Country: String}], default: []}
  // surname: { type: String, required: true },
  // faculty:{ type: String, required: true },
  // profilePic: String,
  // interestedAreas: { type: [{ tag: String, count: Number }], default: [] },
  // followers: { type: [String], default: [] },
  // following: { type: [String], default: [] },
  // calendar: { type: [], default: [] }
});

const User = mongoose.model("User", UserSchema);

// funtion for gettig user
User.getUserWithAttributes = function(userId, attributes) {
  return new Promise((fulfill, reject) => {
    // find user with specific attributes
    User.findById(userId)
        .select(attributes)
        .then(user => {
          // check if there is a user
          if(!user) return reject("No user was found");
          // return the user
          fulfill(user);
        })
        .catch(err => {
          reject(err);
        });
  });
};

module.exports = User;
