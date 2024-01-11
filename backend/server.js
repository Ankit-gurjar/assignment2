const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const ConnectDB = require("./config/dbconnect");
const compression = require("compression");
const { userRoute } = require("./routes/userroute");
const { notfound, errorHandler } = require("./middleware/errormiddleware");

const app = express();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 🚩 Shutting down...");
  process.exit(1);
});

dotenv.config({ path: __dirname + "/config.env" });

const PORT = process.env.PORT || 5002;
ConnectDB();

app.use(express.json());
app.use(compression());

app.get("/", (req, res) => {
  res.status(200).send("API IS WORKING");
});

/*-----------APIS-----------*/

app.use("/api/auth", userRoute);

app.use(notfound);
app.use(errorHandler);

const server = app.listen(PORT, console.log(`SERVER RUNNING ON ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 🚩 Shutting down...");
  server.close(() => {
    process.exit(1); // 1 - for uncaught exception
  });
});
