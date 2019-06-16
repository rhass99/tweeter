"use strict";

// Exports a database helpers module
// Uses the db reference object passed into it from MongoClient instantiation
module.exports = function makeDataHelpers(db) {
    
    return {
      // Saves a tweet to `db`
      // Makes the new tweet and/or error available for the callback to process
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