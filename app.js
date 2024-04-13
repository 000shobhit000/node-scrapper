const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

require('dotenv').config();

app.use(bodyParser.json());
global.__root = __dirname + "/";
require("./db");

app.use(
  logger("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

if (process.env.NODE_ENV) {
  superUserCreator();
  timezonesCreator()
    .then(() => {})
    .catch((err) => console.error(err));
}

if (process.env.NODE_ENV !== "production") {
  const corsOptions = {}; // exposedHeaders: "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type" };
    app.use(cors(corsOptions));
    app.options("*", cors());
}

app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.json({ limit: "5mb" }));

app.enable("trust proxy");

// calling scrapAll function to start the scrapers.
// require("./scrappers/scrapAll")();

// calling cron-tab for schduled daily one page scrapping.
require("./cron-tab");

app.use((error, req, res, next) => {
  if (error) {
    console.error("Unhandled -", req.path, "\n", error);
    return res.status(500).send("Server Error Occurred!");
  }
  return next();
});

module.exports = app;
