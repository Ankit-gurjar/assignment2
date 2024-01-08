const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
dotenv.config({ path: __dirname + "/config.env" });

const PORT = process.env.PORT || 5002;

const server = app.listen(PORT, console.log(`SERVER RUNNING ON ${PORT}`));
