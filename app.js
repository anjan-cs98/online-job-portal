const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const startDB = require("./www/db/db.js");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
/***Let the server cors free */
app.use(cors());
/***Let Express to accept incoming post data ** */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
/***Bootstrap route */
const routePath = path.join(__dirname, "src", "routes");
fs.readdirSync(routePath).forEach((file) => {
  if (file.endsWith(".js")) {
    const route = require(path.join(routePath, file));
    route.setRouter?.(app);
    console.log(`Loaded route: ${file}`);
  }
});
// end route

/*Bootstrap Models*/
const SchemaPath = path.join(__dirname, "src", "models");
fs.readdirSync(SchemaPath).forEach((file) => {
  if (file.endsWith(".js")) require(path.join(SchemaPath, file));
  //console.log(`Loaded route: ${file}`);
});
//end model bootstrap

/*** Landing page  */
app.get("/", (req, res) => {
  res.send("<h2>Welcome to Online Job Portal 😊</h2>");
});
/***Start database connection ** */
startDB(app, process.env.DATABASE_TYPE);
