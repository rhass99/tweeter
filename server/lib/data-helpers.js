"use strict";

module.exports = function makeDataHelpers(db) {
    
    return {
      //Saves a tweet to `db`
      saveTweet: function(newTweet, callback) {
        db.collection('users').insertOne(newTweet, callback)
      },
  
      // Get all tweets in `db`, sorted by newest first
      getTweets: function(callback) {
        db.collection('users').find().toArray()
          .then((result) => {
            callback(null, result)
          })
      }
    }
};