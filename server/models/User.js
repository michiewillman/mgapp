const { Schema, model } = require("mongoose");
// Import bcrypt for password hashing & validation
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    // User's current medications
    medications: [
      {
        type: String,
        trim: true,
      },
    ],
    // All symptoms available in the user's symptom checklist
    symptoms: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Password hashing for encryption
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    // how many levels deep
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Compare & validate password for user log in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Export the Patient object made from the schema
const User = model("User", userSchema);

module.exports = User;
