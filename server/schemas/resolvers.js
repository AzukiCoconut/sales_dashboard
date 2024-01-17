const { User, Transaction } = require('../models');
const { signToken } = require('../utils/authMiddleware');
const mongoose = require('mongoose');
const getCountryISO3 = require('country-iso-2-to-3');

const resolvers = {
  Query: {
    // get all users and get a user by id
    users: async () => {
      return await User.find({});
    },
    user: async (_, { _id }) => {
      const params = _id;
      return await User.findById(_id);
    },
    customers: async () => {
      return await User.find({ role: 'user' }).select('-password');
    },
    getGeography: async () => {
      const users = await User.find();

      const mappedLocations = users.reduce((acc, { country }) => {
        const countryISO3 = getCountryISO3(country);
        if (!acc[countryISO3]) {
          acc[countryISO3] = 0;
        }
        acc[countryISO3]++;
        return acc;
      }, {});

      const locationFormatted = Object.entries(mappedLocations).map(
        ([country, count]) => {
          return { id: country, value: count };
        }
      );

      return locationFormatted;
    },
    getAdmins: async () => {
      return await User.find({ role: 'admin' }).select('-password');
    },
    //This resolver will return the navigation items based on the user's role
    navigationData: (_, args, context) => {
      const userRole = context.user.role;
      let navItems;

      switch (userRole) {
        case 'admin':
          navItems = [
            { text: 'Products' },
            { text: 'Customers' },
            { text: 'Transactions' },
            { text: 'Geography' },
            { text: 'Overview' },
            { text: 'Daily' },
            { text: 'Monthly' },
          ];
          break;
        case 'user':
          navItems = [
            { text: 'Products' },
            { text: 'Customers' },
            { text: 'Transactions' },
            { text: 'Geography' },
          ];
          break;
        case 'superadmin':
          navItems = [
            { text: 'Products' },
            { text: 'Customers' },
            { text: 'Transactions' },
            { text: 'Geography' },
            { text: 'Overview' },
            { text: 'Daily' },
            { text: 'Monthly' },
            { text: 'Admin' },
            { text: 'Performance' },
            { text: 'Dashboard' },
          ];
        default:
          navItems = [];
      }
      return navItems;
    },

    getUserPerformance: async (_, { _id }) => {
      const userWithStats = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(_id) } },
        {
          $lookup: {
            from: 'affiliatestats',
            localField: '_id',
            foreignField: 'userId',
            as: 'affiliateStats',
          },
        },
        { $unwind: '$affiliateStats' },
      ]);
      console.log(userWithStats);
      const saleTransactions = await Promise.all(
        userWithStats[0].affiliateStats.affiliateSales.map((id) => {
          return Transaction.findById(id);
        })
      );
      const filteredSaleTransactions = saleTransactions.filter(
        (transaction) => transaction !== null
      );

      const salesPerformance = {
        user: userWithStats[0],
        sales: filteredSaleTransactions,
      };
      return salesPerformance;
    },
    //me: mean to return the user that's logged in from the context (authMiddleware)
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    // create user mutation
    createUser: async (
      _,
      {
        name,
        email,
        password,
        city,
        state,
        country,
        occupation,
        phoneNumber,
        role,
      }
    ) => {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const newUser = await User.create({
        name,
        email,
        password,
        city,
        state,
        country,
        occupation,
        phoneNumber,
        role,
      });
      try {
        await newUser.save();
        const token = signToken(newUser);
        return { token, user: newUser };
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
      }
    },

    // login mutation
    async login(_, { email, password }) {
      console.log('Attempting login for:', { email, password });
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('No user found with this email address');
      }
      // check if password is correct
      const CorrectPassword = await user.isCorrectPassword(password);
      if (!CorrectPassword) {
        throw new Error('Incorrect credentials');
      }
      // sign token and return
      const token = signToken(user);
      return { token, user };
    },
    // update user mutation
    updateUser: async (_, { id, name, email, password }) => {
      const updateFields = {};
      if (name) updateFields.name = name;
      if (email) updateFields.email = email;
      if (password) updateFields.password = password;
      const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
        new: true,
      });
      return updatedUser;
    },
  },
};

module.exports = resolvers;
