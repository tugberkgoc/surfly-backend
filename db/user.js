const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;

// User Schema

const UserSchema = Schema({
  Email: {type: String, required: true, trim: true, unique: true},
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Stations: {
    type: [{
      Id: String,
      City: String,
      Date: String,
      Icon: String,
      Description: String,
      Temperature: String,
      MinTemperature: String,
      MaxTemperature: String,
      WindSpeed: String,
      Humidity: String,
      FirstWater: String,
      FirstWaterHeight: String,
      SecondWater: String,
      SecondWaterHeight: String,
      ThirdWater: String,
      ThirdWaterHeight: String,
      FourthWater: String,
      FourthWaterHeight: String
    }], default: []
  }
});

const User = mongoose.model("User", UserSchema);

// funtion for gettig user
User.getUserWithAttributes = function (userId, attributes) {
  return new Promise((fulfill, reject) => {
    // find user with specific attributes
    User.findById(userId)
        .select(attributes)
        .then(user => {
          // check if there is a user
          if (!user) return reject("No user was found");
          // return the user
          fulfill(user);
        })
        .catch(err => {
          reject(err);
        });
  });
};

module.exports = User;
