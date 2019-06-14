"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI= 'mongodb://172.17.0.1:32775';

MongoClient.connect(MONGODB_URI)
  .then((result) => {
    const db = result.db('tweeter');
    const DataHelpers = require("./lib/data-helpers.js")(db);
    const tweetsRoutes = require("./routes/tweets")(DataHelpers);
    app.use("/tweets", tweetsRoutes);
    app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
    })
  })
  .catch(err => console.log(err))