const { Schema, model } = require("mongoose");
// Import date formatting middleware
const formatDate = require("../utils/formatDate");
const User = require("./User"); // Import the User model

// Medication logs for each User with a timestamp of when they took the medication
const medicationLogSchema = new Schema({
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
  medicationName: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
  },
});

const MedicationLog = model("Medication", medicationLogSchema);

module.exports = MedicationLog;
