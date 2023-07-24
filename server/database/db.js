const mongoose = require("mongoose");

const Connection = () => {
  const MONGODB_URI =
    "mongodb+srv://rahul:rHbb1qxFzSBvpzHQ@cluster0.jyixbd3.mongodb.net/?retryWrites=true&w=majority";

  mongoose.connect(MONGODB_URI);

  mongoose.connection.on("connected", () => {
    console.log("database connected succesfully");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("database disconnected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("err occured", err.message);
  });
};
module.exports = Connection;
