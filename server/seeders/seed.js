const db = require("../config/connection");
const { Patient } = require("../models");
const patientSeeds = require("./patientSeeds.json");

db.once("open", async () => {
  try {
    await Patient.deleteMany({});
    await Patient.create(patientSeeds);

    process.exit(0);
  } catch (error) {
    throw error;
  }
});
