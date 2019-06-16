"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
// Mount static files directory
app.use(express.static("public"));

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI= 'mongodb://172.17.0.1:32770';

MongoClient.connect(MONGODB_URI)
  .then((client) => {
    // Create a db from Mongo client Connection
    const db = client.db('tweeter');
    // Returns a DB helpers module instantiated with the db reference
    const DataHelpers = require("./lib/data-helpers.js")(db);
    // Returns a subrouter for Tweets instatiated with the db helpers
    const tweetsRoutes = require("./routes/tweets")(DataHelpers);
    // Mounts the tweets subrouter to the /tweets path
    app.use("/tweets", tweetsRoutes);
    app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
    })
    //result.close()
  })
  // Catches errors to DB connection
  .catch(err => console.log(err))