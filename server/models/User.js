// Importing required modules from Mongoose and bcrypt
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Creating a new schema for the User model
const UserSchema = new Schema(
  {
    // User's name, required, with minimum and maximum length constraints
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    // User's email, required, with maximum length, uniqueness, and email format validation
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    // User's password, required
    password: {
      type: String,
      required: true,
    },
    // Additional user information
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    occupation: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    // Array to store user transactions
    transactions: {
      type: Array,
    },
    // User role, with enumerated values and default set to 'user'
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user',
    },
  },
  { timestamps: true } // Adding timestamps for createdAt and updatedAt fields
);

// Middleware to hash the user's password before saving to the database
UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Method to compare passwords during authentication
UserSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Creating a Mongoose model for the User schema
const User = model('User', UserSchema);

// Exporting the User model for use in other parts of the application
module.exports = User;
