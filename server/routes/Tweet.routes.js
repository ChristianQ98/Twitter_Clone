const TweetController = require('../controllers/Tweet.controllers');

module.exports = function(app) {
    // Creates a Tweet and stores it in the DB
    app.post('/api/tweets', TweetController.createTweet);
    // Retrieves all Tweets from the DB
    app.get('/api/tweets', TweetController.getAllTweets);
    // Retrieves one Tweet from the DB (using the Tweet ID)
    app.get('/api/tweets/:id', TweetController.getOneTweet);
    // Updates a Tweet from the DB (using the Tweet ID)
    app.put('/api/tweets/:id', TweetController.updateTweet);
    // Deletes a Tweet from the DB (using the Tweet ID)
    app.delete('/api/tweets/:id', TweetController.deleteTweet);
    // // Likes a tweet
    app.put('/api/tweets/:id/like', TweetController.likeTweet);
}