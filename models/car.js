// Load required packages
var mongoose = require("mongoose");

// Define our user schema
var CarSchema = new mongoose.Schema({
  Vid: {
    type: String,
    unique: true
  },
  UserId: String,
  Brand: String,
  Description: {
    type: String
  },
  Picture: {
    type: String,
    default:
      "data:image/png;base64,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"
  },
  Capacity: {
    type: Number,
    default: 5
  },
  Rating: {
    type: Number,
    default: 0
  },
  RentCount: {
    type: Number,
    default: 0
  }
});

// Export the Mongoose model
module.exports = mongoose.model("Car", CarSchema);
