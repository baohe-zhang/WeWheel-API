// Load required packages
var mongoose = require('mongoose');
var bcrypt  = require('bcrypt')
const SALT_WORK_FACTOR = 10;
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
    password:{
        type: String,
        requried:true,
       
    },
    MyCars:[{
        type:String,
    }],
    RentedCars:[{
        type: String,
    }]

});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
    
};

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
