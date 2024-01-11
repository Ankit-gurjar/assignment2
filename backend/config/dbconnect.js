const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGO_URI.replace("<PASSWORD>", process.env.Mongo_pass)
    );
    console.log(`MONGODB CONNECTED : ${connect.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = ConnectDB;
