const { Schema, model } = require("mongoose");
// Import date formatting middleware
const formatDate = require("../utils/formatDate");
const User = require("./User"); // Import the User model

// Symptom logs for each day and time reported for a specific User
const symptomLogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId here
    ref: "User",
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
    get: (timestamp) => formatDate(timestamp),
  },
  symptomName: {
    type: String,
    required: true,
  },
  severity: {
    type: Number,
    required: true,
  },
});

const Symptom = model("Symptom", symptomLogSchema);

module.exports = Symptom;
