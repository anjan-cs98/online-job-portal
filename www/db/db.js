require("dotenv").config();
const mode = process.env.NODE_ENV || "dev";
const mongoose = require("mongoose");
const startServer = require("../rest/server");
const dbConfig = require("../../config/dbConfig.json")[mode];

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Initializes and starts the database connection based on the specified type.
 * @param {Object} app - The Express app instance.
/******  4b0aaa8c-9e55-4338-93ad-9485220c13a9  *******/
const startDB = (app, db_type) => {
  switch (db_type) {
    case "mongo":
      console.log(`Environment : ${mode} Database : ${db_type}`);
      try {
        console.log(dbConfig);
        mongoose.connect(dbConfig.uri, {});
        mongoose.connection.on("error", (err) => {
          console.log("Mongoose default connection error: " + err);
          process.exit(1);
        });
        mongoose.connection.on("open", (err) => {
          if (err) {
            console.log("Mongoose default connection error: " + err);
            process.exit(1);
          } else {
            console.log("Connected to DB");
            startServer(app);
          }
        });
      } catch (error) {
        console.log("Database connection errror : ", error);
      }
      break;
    case "mysql":
      break;
    default:
      console.log("No Database connected ");
      break;
  }
};

module.exports = startDB;

console.log("Db Connection set up");
