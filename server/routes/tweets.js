"use strict";
// Database helper functions
const userHelper    = require("../lib/util/user-helper")
const moment = require('moment')

const express       = require('express');
// Creates a sub router for mouting all tweets related routes
// accessible with /tweets
const tweetsRoutes  = express.Router();

const getTime = (startTime) => {
  let end = moment()
  let duration = moment.duration(end.diff(startTime))
  let seconds = Math.round(duration.asSeconds())
  if ( seconds >= 3600 ) {
    return `${Math.round(duration.asHours())} hours ago`
  } else if (seconds < 3600 && seconds >= 60) {
    return `${Math.round(duration.asMinutes())} minutes ago`
  } else {
    return `${seconds} seconds ago`
  }
}

// Exports a /tweets subrouter to be mounted on the app
module.exports = function(DataHelpers) {

  // Gets all tweets
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        // sends back an internal server error
        res.status(500).json({ error: err.message });
      } else {
        // Sends back tweets as a json object to the caller
        const newTweets = tweets.map((tweet) => {
          tweet.created_at = getTime(tweet._id.getTimestamp())
          return tweet
        })
        res.json(newTweets);
      }
    });
  });

  // posts a new tweet
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    // Gets user info from request
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    // Constructs a tweet object for adding to the database
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      }
    };
    // Uses helper function to add a new tweet to db
    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  // module returns bacl the tweets subrouter
  return tweetsRoutes;
}
