const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "username cannot be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

//verify input matches a valid user document in DB
UserSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({username: username})
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}


//Ensuring that password is hased before saving it to the DB
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 12, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
