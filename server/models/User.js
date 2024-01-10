const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"]
    },
    password: {
      type: String,
      required: true
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    },
    occupation: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    transactions: {
      type: Array
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin"
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

const User = model("User", UserSchema);

module.exports = User;
