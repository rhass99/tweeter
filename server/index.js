"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.
//const db = require("./lib/in-memory-db");

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI= 'mongodb://172.17.0.1:32775';

// MongoClient.connect(MONGODB_URI, (err, client) => {
//   if (err) {
//     console.log(`Failed to connect to mongo on: ${MONGODB_URI}`)
//   }
//   console.log("Connected to mongodb")
  
//   const db = client.db('tweeter');
//   const collection = db.collection('users');
  
//   collection.find().toArray((err, docs) => {
//     const DataHelpers = require("./lib/data-helpers.js")({tweets: docs, collection:collection});
//     const tweetsRoutes = require("./routes/tweets")(DataHelpers);
//     app.use("/tweets", tweetsRoutes);
//     app.listen(PORT, () => {
//       console.log("Example app listening on port " + PORT);
//     });
//   })
  
//   client.close()
// })

MongoClient.connect(MONGODB_URI)
  .then((result) => {
    const db = result.db('tweeter');
    const collection = db.collection('users');
  
    collection.find().toArray((err, docs) => {
      const DataHelpers = require("./lib/data-helpers.js")({tweets: docs, collection:collection});
      const tweetsRoutes = require("./routes/tweets")(DataHelpers);
      app.use("/tweets", tweetsRoutes);
      app.listen(PORT, () => {
        console.log("Example app listening on port " + PORT);
      });
    })
  })
  .catch(err => console.log(err))