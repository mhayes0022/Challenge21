// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');

//Question: Do I need to include the find all functionality then for users?

//Find ONE user, create user, login, save book, delete book
//No delete user?

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async (parent, { userId, username }) => {
            if (user) {
                return User.findOne({ _id: userId });
              }
              return User.findOne({ username });
        },
    },

    // create a user, sign a token, and ? send it back (to client/src/components/SignUpForm.js)
    //Do I need username, email, password below? Or just 'body' like in user-controller.js?
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { user, token };
        },

        login: async (parent, { username, email, password }) => {
            const user = await User.findOne({username});
            //Should be finding ONE user via username OR email here
            if (!user) {
                throw AuthenticationError;
            }

            if (!email) {
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
        saveBook: async (parent,{ userId, bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $addToSet: { books: book },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw AuthenticationError;
        },

        removeBook: async (parent, { book }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { books: book } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;