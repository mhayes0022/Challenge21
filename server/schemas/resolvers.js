// import user model
const { argsToArgsConfig } = require('graphql/type/definition');
const { User } = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');

//Question: Do I need to include the find all functionality then for users?

//Find ONE user, create user, login, save book, delete book
//No delete user?

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
            throw AuthenticationError

        }
    },

    // create a user, sign a token, and ? send it back (to client/src/components/SignUpForm.js)
    //Do I need username, email, password below? Or just 'body' like in user-controller.js?
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { user, token };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            //Should be finding ONE user via  email here

            if (!user) {
                throw AuthenticationError;
            }


            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },

        //Below: book? bookId?
        saveBook: async (parent, { content }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: { savedBooks: content },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw AuthenticationError;
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;