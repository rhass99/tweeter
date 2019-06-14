"use strict";

module.exports = function makeDataHelpers(db) {
    let collection = db.collection
    return {
      //Saves a tweet to `db`
      saveTweet: function(newTweet, callback) {
        collection.insertOne(newTweet, callback)
      },
  
      // Get all tweets in `db`, sorted by newest first
      getTweets: function(callback) {
        callback(null, db.tweets)
      }
    }
};