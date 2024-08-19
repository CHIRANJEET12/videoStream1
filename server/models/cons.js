const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/video";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.error("Connection error:", err);
  });

const conn = mongoose.connection;

module.exports = conn;
