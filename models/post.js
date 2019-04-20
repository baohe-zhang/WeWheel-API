// Load required packages
var mongoose = require("mongoose");
var DateOnly = require('mongoose-dateonly')(mongoose);
// Define our user schema
var PostSchema = new mongoose.Schema({
  CarId: {
    type: String
  },
  UserId: String,
  Location: String,
  StartDate: {
    type: DateOnly
  },
  EndDate: {
    type: DateOnly
  },
  PricePerHour: {
    type: Number
  },
  PricePerDay: {
    type: Number
  },
  PostDate: {
    type: DateOnly,
    default: DateOnly.now
  },
  IsCommented: {
    type: Boolean,
    default: false
  },
  Capacity: {
    type: Number,
    default: 4
  },
});

// Export the Mongoose model
module.exports = mongoose.model("Post", PostSchema);