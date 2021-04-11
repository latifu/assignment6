const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Paasword is required."],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
