require("dotenv").config();

const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");

//const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const schema = require("./schema/schema");

const app = express();

const uri = process.env.DBURL;

console.log(uri);
// Replace with your mongodb atlas URI
// const uri =
//   "mongodb+srv://gideon:deMilade1@lyricaldb-gdobf.mongodb.net/test?retryWrites=true&w=majority";
// const instance = new MongoClient(uri, { useNewUrlParser: true });
// instance.connect((err, client) => {
//   if (err) console.log("failed to connect");
//   else {
//     const collection = client.db("test").collection("devices");
//   }
// });
// if (!uri) {
//   throw new Error("You must provide a MongoLab URI");
// }

mongoose.Promise = global.Promise;
mongoose.set("useNewUrlParser", true);
mongoose.connect(uri, () => {
  console.log("DB connected");
});
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
