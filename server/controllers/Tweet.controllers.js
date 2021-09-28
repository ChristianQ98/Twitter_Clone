const { Tweet } = require('../models/Tweet.models');

module.exports.createTweet = (req, res) => {
    Tweet.create(req.body)
        .then(tweet => res.json(tweet))
        .catch(err => res.status(404).json(err));
};

module.exports.getOneTweet = (req, res) => {
    Tweet.findById(req.params.id)
        .then(tweet => res.json(tweet))
        .catch(err => res.status(404).json(err));
};

module.exports.getAllTweets = (req, res) => {
    Tweet.find().sort({createdAt: -1})
        .then(allTweets => res.json(allTweets))
        .catch(err => res.status(404).json(err));
};

module.exports.updateTweet = (req, res) => {
    Tweet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedTweet => res.json(updatedTweet))
        .catch(err => res.status(404).json(err));
};

module.exports.deleteTweet = (req, res) => {
    Tweet.findByIdAndDelete(req.params.id)
        .then(deletedTweet => res.json(deletedTweet))
        .catch(err => res.status(404).json(err));
};

// // Allows user to like a tweet
// module.exports.likeTweet = (req, res) => {
//     Tweet.findByIdAndUpdate(req.body.tweetId, { $push: { likes: req.body.userId }}, { new : true })
//         .then(result => res.json(result))
//         .catch(err => res.status(404).json(err));
// };

// // Allows user to unlike a tweet
// module.exports.unLikeTweet = (req, res) => {
//     Tweet.findByIdAndUpdate(req.body.tweetId, { $pull: { likes: req.body.userId }}, { new : true })
//         .then(result => res.json(result))
//         .catch(err => res.status(404).json(err));
// };

//
module.exports.likeTweet = (req, res) => {
    const tweet = Tweet.findById(req.params.id);
    if(!tweet.likes.includes(req.body.userId)) {
        Tweet.updateOne({ $push: { likes: req.body.userId } });
    } else {
        Tweet.updateOne({ $pull: { likes: req.body.userId } });
    }
}

//
// module.exports.likeTweet = (req, res) => {
    
// }

// Allows user to comment on a post
module.exports.comment = (req, res) => {
    let comment = req.body.comment;
    comment.postedBy = req.body.userId;
    Post.findByIdAndUpdate(req.body.postId, { $push: { comment: comment }}, { new : true })
        .populate('comments.postedBy', '_id name')
        .populate('postedBy', '_id name')
        .exec()
        .then(comment => res.json(comment))
        .catch(err => res.status(404).json(err));
};