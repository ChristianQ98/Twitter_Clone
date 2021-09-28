const { User } = require('../models/User.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registers a user and stores them in the DB if the fields pass their validations
module.exports.register = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then( () => {
            res.cookie("usertoken", jwt.sign({ _id: user._id }, process.env.JWT_SECRET),{ httpOnly: true })
                .json({ message: 'Success!', user: user })
        })
        .catch(err => res.status(404).json(err));
};

// Gets all the users from the DB
module.exports.getAll = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json(err));
};

// Retrieves the logged in user
module.exports.getLoggedInUser = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
    User.findById(decodedJWT.payload._id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json(err));
};

// Checks if the user enters the correct email and password
// If entered correctly, the user will then be logged in
module.exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
        if (user === null) {
            res.status(400).json({ msg: "invalid login attempt" });
        } else {
            bcrypt.compare(req.body.password, user.password)
                .then((passwordIsValid) => {
                if (passwordIsValid) {
                res.cookie("usertoken", jwt.sign({ _id: user._id }, process.env.JWT_SECRET),{ httpOnly: true })
                    .json({ msg: "success!", user: user});
                } else {
                res.status(400).json({ msg: "Invalid login attempt" });
                }
            })
            .catch((err) =>
                res.status(400).json({ msg: "Invalid login attempt" })
            );
        }
        })
        .catch((err) => res.json(err));
    }

// Logs a user out
module.exports.logout = (req, res) => {
    // The token is cleared once the user logs out
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

// module.exports.updateUser = (req, res) => {
//     if(req.body)
// }

module.exports.getOneUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json(err));
};