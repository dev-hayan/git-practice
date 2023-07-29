import "express-async-errors";
import Joi, { objectId } from "joi";
import express from "express";
const app = express();
objectId = require("joi-objectid")(Joi);
import { connect } from "mongoose";
import { get } from "config";
import { createLogger, transports } from "winston";

require("./startup/routes")(app);

const logger = createLogger();
logger.add(
  new transports.File({
    filename: "combined.log",
  }),
  new transports.Console()
);

process.on("uncaughtException", (ex) => {
  console.log("Some thing failed during startup");
  logger.error(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  console.log("we got an unhandled rejection");
  logger.error(ex.message, ex);
  process.exit(1);
});


if (!get("jwtprivatekey")) {
  console.log("FETAL ERROR! jwtprivatekey is not defined");
  process.exit(1);
}

connect("mongodb://localhost/Vidly")
  .then((result) => console.log("Connected"))
  .catch((error) => console.log("Error", error.message));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


//i am changing the content of index file to practice the branches more accuratly