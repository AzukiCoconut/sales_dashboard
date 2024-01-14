const { User } = require('../models');
const { signToken } = require('../utils/authMiddleware');

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
      console.log(newUser);

      const token = signToken(newUser);
      return { token, user: newUser };
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
