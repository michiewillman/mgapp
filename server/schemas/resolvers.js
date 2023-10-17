const { AuthenticationError } = require("apollo-server-express");
const { User, MedicationLog, SymptomLog } = require("../models");
const { signToken } = require("../utils/auth");
const formatDate = require("../utils/formatDate");

const resolvers = {
  Query: {
    // All Users
    users: async () => {
      return User.find();
    },
    // One User
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    // Logged in User
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Log in or create an account.");
    },
    // ---  Logged in User's Medications for a specific day ---
    medicationLogs: async (parent, { datetime }, context) => {
      const startOfDay = new Date(datetime);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(datetime);
      endOfDay.setHours(23, 59, 59, 999);

      const medLogs = await MedicationLog.find({
        userId: context.user._id,
        datetime: { $gte: startOfDay, $lt: endOfDay },
      });

      return medLogs;
    },
    // ---  Logged in User's Symptoms ---
    symptomLogs: async (parent, { datetime }, context) => {
      const startOfDay = new Date(datetime);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(datetime);
      endOfDay.setHours(23, 59, 59, 999);

      const symptomLogs = await SymptomLog.find({
        userId: context.user._id,
        datetime: { $gte: startOfDay, $lt: endOfDay },
      });

      return symptomLogs;
    },
  },

  Mutation: {
    addUser: async (parent, userData) => {
      const user = await User.create({ ...userData });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      // Verify the user entered the right password
      const correctPass = await user.isCorrectPassword(password);

      if (!correctPass) {
        throw new AuthenticationError("Incorrect password!");
      }

      // Sign + send token if the user's password is correct w/ that user's data
      const token = signToken(user);
      return { token, user };
    },

    // Add medication to User's symptoms property
    addUserMedication: async (parent, { medication }, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { medications: medication } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError("Please log in or sign up.");
    },
    // Remove medication from User's symptoms property
    removeUserMedication: async (parent, { medication }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { medications: medication } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError("Please log in or sign up.");
    },

    // Add symptom to User's symptoms property
    addUserSymptom: async (parent, { symptom }, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { symptoms: symptom } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError("Please log in or sign up.");
    },
    // Remove symptom from User's symptoms property
    removeUserSymptom: async (parent, { symptom }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { symptoms: symptom } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError("Please log in or sign up.");
    },

    // Symptom Logs for a specific user
    addSymptomLog: async (parent, { symptomName, severity }, context) => {
      if (context.user) {
        return SymptomLog.create({
          userId: context.user._id,
          symptomName,
          severity,
        });
      }

      throw new AuthenticationError("Please log in or sign up.");
    },

    deleteSymptomLog: async (parent, { logId }) => {
      return SymptomLog.findOneAndDelete({ _id: logId });
    },

    // Medication logs for a specific user
    addMedicationLog: async (parent, { medicationName, dosage }, context) => {
      if (context.user) {
        return MedicationLog.create({
          userId: context.user._id,
          medicationName,
          dosage,
        });
      }

      throw new AuthenticationError("Please log in or sign up.");
    },

    deleteMedicationLog: async (parent, { logId }) => {
      return MedicationLog.findOneAndDelete({ _id: logId });
    },
  },
};

module.exports = resolvers;
