// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Email: {
        type: String,
        unique: true,
        required: true
        
    },
    UserName:{
        type: String,
        unique: true,
        required: true
    },
    PassWord:{
        type: String,
        required: true
    },
    MyCars:[{
        type:String,
    }],
    RentedCars:[{
        type: String,
    }]

});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
