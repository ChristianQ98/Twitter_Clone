const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [ true, 'Please enter your first name' ],
        minlength: [ 2, 'First name must be at minimum 2 characters long' ]
    },
    lastName: {
        type: String,
        required: [ true, 'Please enter your last name' ],
        minlength: [ 2, 'Last name must be at minimum 2 characters long' ]
    },
    username: {
        type: String,
        required: [ true, 'Please enter a username' ],
        minlength: [ 4, 'Username must be at minimum 4 characters long' ],
        maxlength: [ 15, 'Username cannot exceed 15 characters' ]
    },
    email: {
        type: String,
        required: [ true, 'Please enter your email' ],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    likedTweets: {
        type: Object,
        ref: 'Tweet'
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    }
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords do not match!')
    }
    // The 'next' function will allow the other validations to run after the password has finished being validated
    next();
})

UserSchema.pre('save', function(next) {
    // The "10" inside the bcrypt.hash() function refers to the number of salt rounds that Bcrypt will use when generating a salt
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports.User = mongoose.model('User', UserSchema);