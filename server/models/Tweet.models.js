const mongoose = require('mongoose');
const { User } = require('./User.models');

const TweetSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: [
            true,
            "Tweet cannot be empty"
        ],
        maxlength: [
            280,
            "Tweet cannot be more than 280 characters long"
        ]
    },
    comments: [{
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: {
            type: Object,
            ref: 'User'
        }
    }],
    likes: {
        // type: Object,
        // ref: 'User'
        type: Array,
        default: []
    },
    retweets: [{
        // type: Object,
        // ref: 'User',
        type: Number,
        default: 0
    }],
    postedBy: {
        // type: mongoose.Schema.Types.ObjectId,
        type: Object,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports.Tweet = mongoose.model('Tweet', TweetSchema);