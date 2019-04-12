// Load required packages
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
// Define our user schema
var UserSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Email: {
    type: String,
    unique: true,
    required: true
  },
  UserName: {
    type: String,
    unique: true,
    required: true
  },
  PassWord: {
    type: String,
    required: true
  },
  MyCars: [
    {
      type: String
    }
  ],
  RentedCars: [
    {
      type: String
    }
  ]
});
userSchema.methods.generateHash = function(Password) {
  return bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(Password) {
  return bcrypt.compareSync(Password, this.Password);
};

// Export the Mongoose model
module.exports = mongoose.model("User", UserSchema);
