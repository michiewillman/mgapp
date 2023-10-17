const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mgappdb");

module.exports = mongoose.connection;
